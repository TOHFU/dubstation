import { describe, expect, it, vi, beforeEach } from 'vitest'

import { useOneShotFx } from './useOneShotFx'
import { runComposable } from './testUtils'

const createdAudio: Array<{ play: ReturnType<typeof vi.fn>, pause: ReturnType<typeof vi.fn>, currentTime: number }> = []
const audioConstructorSpy = vi.fn()

describe('useOneShotFx', () => {
  beforeEach(() => {
    createdAudio.length = 0
    audioConstructorSpy.mockClear()

    class MockAudio {
      public preload = ''
      public loop = false
      public paused = true
      public currentTime = 0
      public play = vi.fn().mockResolvedValue(undefined)
      public pause = vi.fn()

      constructor(public src: string) {
        audioConstructorSpy(src)
        createdAudio.push(this)
      }
    }

    vi.stubGlobal('Audio', MockAudio as unknown as typeof Audio)
  })

  it('開始時に再生し、停止時に巻き戻す', async () => {
    const { value } = runComposable(() => useOneShotFx())

    await value.startOneShotFx('beam1')
    value.stopOneShotFx('beam1')

    expect(audioConstructorSpy).toHaveBeenCalledWith('/assets/soundfx/beam1.mp3')
    const created = createdAudio[0]
    expect(created.play).toHaveBeenCalledTimes(1)
    expect(created.pause).toHaveBeenCalledTimes(1)
    expect(created.currentTime).toBe(0)
  })
})
