import { z } from 'zod'
import { STATIONS } from '../../shared/stations'

const querySchema = z.object({
  stationId: z.string().min(1),
})

type ParsedMetadata = {
  songName: string | null
  artistName: string | null
}

function parseStreamTitle(streamTitle: string): ParsedMetadata {
  const normalized = streamTitle.trim()

  if (!normalized) {
    return {
      songName: null,
      artistName: null,
    }
  }

  const separatorIndex = normalized.indexOf(' - ')
  if (separatorIndex === -1) {
    return {
      songName: normalized,
      artistName: null,
    }
  }

  const artistName = normalized.slice(0, separatorIndex).trim()
  const songName = normalized.slice(separatorIndex + 3).trim()

  return {
    songName: songName || null,
    artistName: artistName || null,
  }
}

function extractStreamTitle(icyMetadata: string): string | null {
  const matched = /StreamTitle='([^']*)'/.exec(icyMetadata)

  if (!matched || matched.length < 2) {
    return null
  }

  return matched[1]?.trim() || null
}

class BufferedStreamReader {
  private readonly reader: ReadableStreamDefaultReader<Uint8Array>

  private chunk: Uint8Array | null = null

  private offset = 0

  constructor(reader: ReadableStreamDefaultReader<Uint8Array>) {
    this.reader = reader
  }

  async read(size: number): Promise<Uint8Array | null> {
    if (size <= 0) {
      return new Uint8Array(0)
    }

    const result = new Uint8Array(size)
    let written = 0

    while (written < size) {
      if (!this.chunk || this.offset >= this.chunk.length) {
        const { done, value } = await this.reader.read()
        if (done || !value) {
          return null
        }

        this.chunk = value
        this.offset = 0
      }

      const restInChunk = this.chunk.length - this.offset
      const restNeeded = size - written
      const toCopy = Math.min(restInChunk, restNeeded)

      result.set(this.chunk.subarray(this.offset, this.offset + toCopy), written)
      this.offset += toCopy
      written += toCopy
    }

    return result
  }
}

async function readIcyMetadata(streamUrl: string): Promise<ParsedMetadata> {
  const controller = new AbortController()
  const timeoutHandle = setTimeout(() => {
    controller.abort()
  }, 8000)

  try {
    const upstream = await fetch(streamUrl, {
      headers: {
        'Icy-MetaData': '1',
        'User-Agent': 'DubStation/1.0',
        Accept: '*/*',
      },
      signal: controller.signal,
    })

    if (!upstream.ok || !upstream.body) {
      return {
        songName: null,
        artistName: null,
      }
    }

    const metaintHeader = upstream.headers.get('icy-metaint')
    const metaint = metaintHeader ? Number.parseInt(metaintHeader, 10) : Number.NaN

    if (!Number.isFinite(metaint) || metaint <= 0) {
      return {
        songName: null,
        artistName: null,
      }
    }

    const reader = new BufferedStreamReader(upstream.body.getReader())

    // 1ブロック目にタイトルがない局もあるため、複数回メタデータブロックを読む。
    for (let index = 0; index < 8; index += 1) {
      const audioChunk = await reader.read(metaint)
      if (!audioChunk) {
        break
      }

      const metadataLengthByte = await reader.read(1)
      if (!metadataLengthByte || metadataLengthByte.length !== 1) {
        break
      }

      const metadataLength = metadataLengthByte[0] * 16
      if (metadataLength <= 0) {
        continue
      }

      const metadataBytes = await reader.read(metadataLength)
      if (!metadataBytes) {
        break
      }

      const icyMetadata = new TextDecoder('latin1').decode(metadataBytes).replace(/\u0000+$/g, '')
      const streamTitle = extractStreamTitle(icyMetadata)

      if (!streamTitle) {
        continue
      }

      return parseStreamTitle(streamTitle)
    }

    return {
      songName: null,
      artistName: null,
    }
  }
  catch {
    return {
      songName: null,
      artistName: null,
    }
  }
  finally {
    clearTimeout(timeoutHandle)
  }
}

export default defineEventHandler(async (event) => {
  const parsedQuery = querySchema.safeParse(getQuery(event))

  if (!parsedQuery.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'stationId is required',
    })
  }

  const station = STATIONS.find(({ id }) => id === parsedQuery.data.stationId)
  if (!station) {
    throw createError({
      statusCode: 404,
      statusMessage: 'station not found',
    })
  }

  const metadata = await readIcyMetadata(station.streamUrl)

  return {
    stationId: station.id,
    songName: metadata.songName,
    artistName: metadata.artistName,
    isAvailable: Boolean(metadata.songName || metadata.artistName),
  }
})
