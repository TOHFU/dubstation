import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { runComposable } from '../testUtils'

// --- Tone.js モック ---
vi.mock('tone', () => {
  class Gain {
    gain = { rampTo: vi.fn() }
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
      rawContext: { createMediaElementSource: vi.fn(() => ({ connect: vi.fn() })) },
    })),
    Gain,
    EQ3,
    FeedbackDelay,
    Reverb,
  }
})

// --- App Store モック ---
const mockAppStore = {
  selectedStation: ref<{ id: string; name: string } | null>(null),
  playbackState: ref<string>('idle'),
  songName: ref<string | null>(null),
  artistName: ref<string | null>(null),
  hasOpenedSoundPermissionDialog: ref(false),
  initialize: vi.fn(),
  fetchMetadata: vi.fn(),
  startPlayback: vi.fn().mockResolvedValue(undefined),
  pausePlayback: vi.fn(),
  resumePlayback: vi.fn().mockResolvedValue(undefined),
  stopPlayback: vi.fn(),
  retryPlayback: vi.fn().mockResolvedValue(undefined),
  clearError: vi.fn(),
  clearSelectedStation: vi.fn(),
  markPlaybackError: vi.fn(),
  markSoundPermissionDialogOpened: vi.fn(),
}

vi.mock('../../stores/app', () => ({
  useAppStore: () => mockAppStore,
}))

vi.mock('pinia', async (importOriginal) => {
  const actual = await importOriginal<typeof import('pinia')>()
  return {
    ...actual,
    storeToRefs: (store: Record<string, unknown>) => {
      const result: Record<string, unknown> = {}
      for (const key of Object.keys(store)) {
        result[key] = store[key]
      }
      return result
    },
  }
})

// --- Audio モック ---
class MockAudio {
  public play = vi.fn().mockResolvedValue(undefined)
  public pause = vi.fn()
  constructor(public src: string) {}
}

vi.stubGlobal('Audio', MockAudio as unknown as typeof Audio)
vi.stubGlobal('useRoute', vi.fn(() => ({ query: {} })))

import { usePlayerPage } from './usePlayerPage'

describe('usePlayerPage', () => {
  beforeEach(() => {
    mockAppStore.selectedStation.value = null
    mockAppStore.playbackState.value = 'idle'
    mockAppStore.songName.value = null
    mockAppStore.artistName.value = null
    mockAppStore.hasOpenedSoundPermissionDialog.value = false
    vi.clearAllMocks()
    vi.stubGlobal('navigateTo', vi.fn())
    vi.stubGlobal('useRoute', vi.fn(() => ({ query: {} })))
  })

  it('isLoading は playbackState=loading のとき true になる', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    expect(value.isLoading.value).toBe(false)

    mockAppStore.playbackState.value = 'loading'
    expect(value.isLoading.value).toBe(true)
  })

  it('isLiveBroadcasting は playbackState=playing のとき true になる', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    expect(value.isLiveBroadcasting.value).toBe(false)

    mockAppStore.playbackState.value = 'playing'
    expect(value.isLiveBroadcasting.value).toBe(true)
  })

  it('stationName は選択ステーションがないとき SELECT STATION を返す', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    expect(value.stationName.value).toBe('SELECT STATION')
  })

  it('stationName は選択ステーション名を返す', () => {
    mockAppStore.selectedStation.value = { id: 's1', name: 'My Station' }
    const { value } = runComposable(() => usePlayerPage({}))
    expect(value.stationName.value).toBe('My Station')
  })

  it('onChangeStation はステーション選択画面へ遷移する', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    value.onChangeStation()
    expect(navigateTo).toHaveBeenCalledWith('/station')
  })

  it('onGoAbout は About ページへ遷移する', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    value.onGoAbout()
    expect(navigateTo).toHaveBeenCalledWith('/about')
  })

  it('onToggleLiveBroadcasting: playing 中は pausePlayback を呼ぶ', async () => {
    mockAppStore.selectedStation.value = { id: 's1', name: 'S' }
    mockAppStore.playbackState.value = 'playing'
    const { value } = runComposable(() => usePlayerPage({}))

    await value.onToggleLiveBroadcasting()

    expect(mockAppStore.pausePlayback).toHaveBeenCalled()
  })

  it('onToggleLiveBroadcasting: idle 中は resumePlayback を呼ぶ', async () => {
    mockAppStore.selectedStation.value = { id: 's1', name: 'S' }
    mockAppStore.playbackState.value = 'idle'
    const { value } = runComposable(() => usePlayerPage({}))

    await value.onToggleLiveBroadcasting()

    expect(mockAppStore.resumePlayback).toHaveBeenCalled()
  })

  it('onHome は clearError と stopPlayback を呼ぶ', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    value.onHome()
    expect(mockAppStore.clearError).toHaveBeenCalled()
    expect(mockAppStore.stopPlayback).toHaveBeenCalled()
  })

  it('onLoadingBack は停止・クリア後にホームへ遷移する', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    value.onLoadingBack()
    expect(mockAppStore.stopPlayback).toHaveBeenCalled()
    expect(mockAppStore.clearSelectedStation).toHaveBeenCalled()
    expect(mockAppStore.clearError).toHaveBeenCalled()
    expect(navigateTo).toHaveBeenCalledWith('/', { replace: true })
  })

  it('onAudioError はエラー状態をマークする', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    value.onAudioError()
    expect(mockAppStore.markPlaybackError).toHaveBeenCalledWith('ストリームの再生中にエラーが発生しました。')
  })

  it('onLaterSoundPermission はダイアログを閉じる', () => {
    const { value } = runComposable(() => usePlayerPage({}))
    value.showSoundPermissionDialog.value = true
    value.onLaterSoundPermission()
    expect(value.showSoundPermissionDialog.value).toBe(false)
  })
})
