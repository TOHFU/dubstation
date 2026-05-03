import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAudioEffects } from './useAudioEffects'

vi.mock('tone', () => {
  const createMediaElementSource = vi.fn(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
  }))

  class Gain {
    gain = { rampTo: vi.fn() }
    input = {}
    connect() { return this }
    toDestination() { return this }
    dispose = vi.fn()
  }

  class EQ3 {
    low = { rampTo: vi.fn() }
    mid = { rampTo: vi.fn() }
    high = { rampTo: vi.fn() }
    connect() { return this }
    dispose = vi.fn()
  }

  class FeedbackDelay {
    delayTime = { rampTo: vi.fn() }
    wet = { rampTo: vi.fn() }
    connect() { return this }
    dispose = vi.fn()
  }

  class Reverb {
    wet = { rampTo: vi.fn() }
    connect() { return this }
    dispose = vi.fn()
  }

  return {
    start: vi.fn().mockResolvedValue(undefined),
    getContext: vi.fn(() => ({
      rawContext: {
        createMediaElementSource,
      },
    })),
    Gain,
    EQ3,
    FeedbackDelay,
    Reverb,
    __mocks: {
      createMediaElementSource,
    },
  }
})

describe('useAudioEffects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('audio要素がある場合に初期化して適用できる', async () => {
    const { init, apply, dispose } = useAudioEffects()
    const audio = document.createElement('audio')

    await init(audio)

    apply({
      masterVolume: 80,
      equalizerEnabled: true,
      equalizerLow: 70,
      equalizerMid: 50,
      equalizerHigh: 60,
      delayEnabled: true,
      delayAmount: 400,
      reverbEnabled: true,
      reverbAmount: 30,
    })

    dispose()

    expect(audio).toBeTruthy()
  })

  it('null初期化と未初期化applyでも例外にならない', async () => {
    const { init, apply } = useAudioEffects()

    await expect(init(null)).resolves.toBeUndefined()
    expect(() =>
      apply({
        masterVolume: 50,
        equalizerEnabled: false,
        equalizerLow: 50,
        equalizerMid: 50,
        equalizerHigh: 50,
        delayEnabled: false,
        delayAmount: 200,
        reverbEnabled: false,
        reverbAmount: 50,
      }),
    ).not.toThrow()
  })
})
