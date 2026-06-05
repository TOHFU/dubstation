import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { nextTick, ref } from 'vue'

import { usePlaybackMetadataPolling } from './usePlaybackMetadataPolling'
import { runComposable } from './testUtils'

describe('usePlaybackMetadataPolling', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('playing中のみポーリングし、停止時に止まる', async () => {
    const playbackState = ref('idle')
    const fetchMetadata = vi.fn().mockResolvedValue(undefined)

    const { unmount } = runComposable(() =>
      usePlaybackMetadataPolling(playbackState, fetchMetadata, 1000),
    )

    playbackState.value = 'playing'
    await nextTick()
    vi.advanceTimersByTime(2500)

    expect(fetchMetadata).toHaveBeenCalledTimes(2)

    playbackState.value = 'idle'
    await nextTick()
    vi.advanceTimersByTime(2500)

    expect(fetchMetadata).toHaveBeenCalledTimes(2)

    unmount()
  })
})
