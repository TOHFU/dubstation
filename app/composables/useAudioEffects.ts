import * as Tone from 'tone'

export type EffectSettings = {
  masterVolume: number
  equalizerEnabled: boolean
  equalizerLow: number
  equalizerMid: number
  equalizerHigh: number
  delayEnabled: boolean
  delayAmount: number
  reverbEnabled: boolean
  reverbAmount: number
}

type AudioGraphNodes = {
  source: MediaElementAudioSourceNode
  inputGain: Tone.Gain
  eq: Tone.EQ3
  delay: Tone.FeedbackDelay
  reverb: Tone.Reverb
  outputGain: Tone.Gain
}

function hasCreateMediaElementSource(
  context: BaseAudioContext,
): context is AudioContext {
  return typeof (context as AudioContext).createMediaElementSource === 'function'
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function mapSliderToDb(value: number): number {
  const normalized = clamp(value, 0, 100)
  // 50を中心に -12dB から +12dB へマッピング。
  return ((normalized - 50) / 50) * 12
}

export function useAudioEffects() {
  let audioElement: HTMLAudioElement | null = null
  let nodes: AudioGraphNodes | null = null

  async function init(target: HTMLAudioElement | null) {
    if (!target) {
      return
    }

    if (audioElement === target && nodes) {
      return
    }

    if (nodes) {
      dispose()
    }

    audioElement = target

    try {
      await Tone.start()
    }
    catch {
      // 初回表示時など、ユーザー操作前は失敗しうるため握りつぶす。
    }

    const rawContext = Tone.getContext().rawContext
    if (!hasCreateMediaElementSource(rawContext)) {
      return
    }

    const source = rawContext.createMediaElementSource(target)
    const inputGain = new Tone.Gain(1)
    const eq = new Tone.EQ3({ low: 0, mid: 0, high: 0 })
    const delay = new Tone.FeedbackDelay({
      delayTime: 0.2,
      feedback: 0.25,
      wet: 0,
    })
    const reverb = new Tone.Reverb({
      decay: 2.5,
      preDelay: 0.02,
      wet: 0,
    })
    const outputGain = new Tone.Gain(0.8)

    source.connect(inputGain.input)
    inputGain.connect(eq)
    eq.connect(delay)
    delay.connect(reverb)
    reverb.connect(outputGain)
    outputGain.toDestination()

    nodes = {
      source,
      inputGain,
      eq,
      delay,
      reverb,
      outputGain,
    }
  }

  function apply(settings: EffectSettings) {
    if (!nodes) {
      return
    }

    const volume = clamp(settings.masterVolume, 0, 100) / 100
    nodes.outputGain.gain.rampTo(volume, 0.05)

    if (settings.equalizerEnabled) {
      nodes.eq.low.rampTo(mapSliderToDb(settings.equalizerLow), 0.05)
      nodes.eq.mid.rampTo(mapSliderToDb(settings.equalizerMid), 0.05)
      nodes.eq.high.rampTo(mapSliderToDb(settings.equalizerHigh), 0.05)
    }
    else {
      nodes.eq.low.rampTo(0, 0.05)
      nodes.eq.mid.rampTo(0, 0.05)
      nodes.eq.high.rampTo(0, 0.05)
    }

    const delaySeconds = clamp(settings.delayAmount, 0, 1000) / 1000
    nodes.delay.delayTime.rampTo(delaySeconds, 0.05)
    nodes.delay.wet.rampTo(settings.delayEnabled ? 0.5 : 0, 0.05)

    const reverbWet = clamp(settings.reverbAmount, 0, 100) / 100
    nodes.reverb.wet.rampTo(settings.reverbEnabled ? reverbWet : 0, 0.05)
  }

  function dispose() {
    if (!nodes) {
      audioElement = null
      return
    }

    nodes.source.disconnect()
    nodes.inputGain.dispose()
    nodes.eq.dispose()
    nodes.delay.dispose()
    nodes.reverb.dispose()
    nodes.outputGain.dispose()

    nodes = null
    audioElement = null
  }

  return {
    init,
    apply,
    dispose,
  }
}
