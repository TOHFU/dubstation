import { ref, watch } from 'vue'
import type { EffectSettings } from './useAudioEffects'

type ApplyAudioEffectsFn = (settings: EffectSettings) => void

export function useAudioEffectControls(applyAudioEffects: ApplyAudioEffectsFn) {
  const masterVolume = ref(50)
  const equalizerEnabled = ref(false)
  const equalizerLow = ref(50)
  const equalizerMid = ref(50)
  const equalizerHigh = ref(50)
  const delayEnabled = ref(false)
  const delayAmount = ref(500)
  const reverbEnabled = ref(false)
  const reverbAmount = ref(50)

  watch([
    masterVolume,
    equalizerEnabled,
    equalizerLow,
    equalizerMid,
    equalizerHigh,
    delayEnabled,
    delayAmount,
    reverbEnabled,
    reverbAmount,
  ], () => {
    applyAudioEffects({
      masterVolume: masterVolume.value,
      equalizerEnabled: equalizerEnabled.value,
      equalizerLow: equalizerLow.value,
      equalizerMid: equalizerMid.value,
      equalizerHigh: equalizerHigh.value,
      delayEnabled: delayEnabled.value,
      delayAmount: delayAmount.value,
      reverbEnabled: reverbEnabled.value,
      reverbAmount: reverbAmount.value,
    })
  }, { immediate: true })

  return {
    masterVolume,
    equalizerEnabled,
    equalizerLow,
    equalizerMid,
    equalizerHigh,
    delayEnabled,
    delayAmount,
    reverbEnabled,
    reverbAmount,
  }
}
