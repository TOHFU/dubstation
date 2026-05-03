import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import { useAudioEffectControls } from './useAudioEffectControls'
import { runComposable } from './testUtils'

describe('useAudioEffectControls', () => {
  it('初期値を即時適用し、値変更時に再適用する', async () => {
    const apply = vi.fn()

    const { value } = runComposable(() => useAudioEffectControls(apply))

    expect(apply).toHaveBeenCalledTimes(1)
    expect(apply).toHaveBeenLastCalledWith(expect.objectContaining({ masterVolume: 50 }))

    value.masterVolume.value = 80
    await nextTick()

    expect(apply).toHaveBeenCalledTimes(2)
    expect(apply).toHaveBeenLastCalledWith(expect.objectContaining({ masterVolume: 80 }))
  })
})
