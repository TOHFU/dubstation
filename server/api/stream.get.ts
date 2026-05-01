import { z } from 'zod'
import { STATIONS } from '../../shared/stations'

const querySchema = z.object({
  stationId: z.string().min(1),
  path: z.string().min(1).optional(),
})

function resolveUpstreamUrl(stationBaseUrl: string, path?: string): URL {
  if (!path) {
    return new URL(stationBaseUrl)
  }

  return new URL(path, stationBaseUrl)
}

function isPlaylistResponse(contentType: string, upstreamUrl: URL): boolean {
  const normalizedContentType = contentType.toLowerCase()
  const pathname = upstreamUrl.pathname.toLowerCase()

  return normalizedContentType.includes('application/vnd.apple.mpegurl')
    || normalizedContentType.includes('application/x-mpegurl')
    || pathname.endsWith('.m3u8')
}

function rewritePlaylistContent(playlistText: string, upstreamUrl: URL, stationId: string): string {
  const toProxyUrl = (target: string): string => {
    const resolved = new URL(target, upstreamUrl)
    const params = new URLSearchParams({
      stationId,
      path: resolved.toString(),
    })

    return `/api/stream?${params.toString()}`
  }

  return playlistText
    .split('\n')
    .map((line) => {
      const trimmed = line.trim()

      if (!trimmed) {
        return line
      }

      if (trimmed.startsWith('#')) {
        if (!trimmed.includes('URI="')) {
          return line
        }

        return line.replace(/URI="([^"]+)"/g, (_matched, uri: string) => {
          if (uri.startsWith('data:')) {
            return `URI="${uri}"`
          }

          return `URI="${toProxyUrl(uri)}"`
        })
      }

      if (trimmed.startsWith('data:')) {
        return line
      }

      return toProxyUrl(trimmed)
    })
    .join('\n')
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

  const upstreamUrl = resolveUpstreamUrl(station.streamUrl, parsedQuery.data.path)

  const upstream = await fetch(upstreamUrl, {
    headers: {
      'Icy-MetaData': '1',
      'User-Agent': 'DubStation/1.0',
      Accept: '*/*',
    },
  })

  if (!upstream.ok || !upstream.body) {
    throw createError({
      statusCode: 502,
      statusMessage: `upstream stream error (${upstream.status})`,
    })
  }

  const headers = new Headers()
  const contentType = upstream.headers.get('content-type') ?? 'audio/mpeg'
  const isPlaylist = isPlaylistResponse(contentType, upstreamUrl)

  headers.set('Content-Type', contentType)
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  headers.set('Pragma', 'no-cache')
  headers.set('Access-Control-Allow-Origin', '*')

  const icyName = upstream.headers.get('icy-name')
  if (icyName) {
    headers.set('Icy-Name', icyName)
  }

  if (isPlaylist) {
    const playlistText = await upstream.text()
    const rewrittenPlaylist = rewritePlaylistContent(playlistText, upstreamUrl, station.id)

    return new Response(rewrittenPlaylist, {
      status: upstream.status,
      headers,
    })
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  })
})
