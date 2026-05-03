import { onBeforeUnmount } from 'vue'

export type OneShotFxKey = 'siren' | 'beam1' | 'beam2'

const ONE_SHOT_FX_SOURCES: Record<OneShotFxKey, string> = {
  siren: '/assets/soundfx/siren.mp3',
  beam1: '/assets/soundfx/beam1.mp3',
  beam2: '/assets/soundfx/beam2.mp3',
}

export function useOneShotFx() {
  const oneShotFxMap = new Map<OneShotFxKey, HTMLAudioElement>()

  function getOneShotFxAudio(key: OneShotFxKey): HTMLAudioElement {
    const existing = oneShotFxMap.get(key)
    if (existing) {
      return existing
    }

    const audio = new Audio(ONE_SHOT_FX_SOURCES[key])
    audio.preload = 'auto'
    audio.loop = true
    oneShotFxMap.set(key, audio)

    return audio
  }

  async function startOneShotFx(key: OneShotFxKey) {
    const audio = getOneShotFxAudio(key)
    if (!audio.paused) {
      return
    }

    audio.currentTime = 0

    try {
      await audio.play()
    }
    catch {
      // ユーザー操作直後以外ではブラウザに再生をブロックされる場合がある。
    }
  }

  function stopOneShotFx(key: OneShotFxKey) {
    const audio = oneShotFxMap.get(key)
    if (!audio) {
      return
    }

    audio.pause()
    audio.currentTime = 0
  }

  function stopAllOneShotFx() {
    stopOneShotFx('siren')
    stopOneShotFx('beam1')
    stopOneShotFx('beam2')
  }

  onBeforeUnmount(() => {
    stopAllOneShotFx()
    oneShotFxMap.clear()
  })

  return {
    startOneShotFx,
    stopOneShotFx,
    stopAllOneShotFx,
  }
}
