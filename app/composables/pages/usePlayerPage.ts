import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { useAudioEffects } from '../useAudioEffects'
import { useOneShotFx } from '../useOneShotFx'
import { useClipboardToast } from '../useClipboardToast'
import { usePlaybackMetadataPolling } from '../usePlaybackMetadataPolling'
import { useAudioEffectControls } from '../useAudioEffectControls'
import { usePageNavigation } from '../usePageNavigation'

export function usePlayerPage(props: { loading?: boolean; error?: boolean }) {
  const appStore = useAppStore()
  const route = useRoute()
  const audioElement = ref<HTMLAudioElement | null>(null)
  const audioEffects = useAudioEffects()

  const {
    selectedStation,
    playbackState,
    songName,
    artistName,
    hasOpenedSoundPermissionDialog,
  } = storeToRefs(appStore)

  const showSoundPermissionDialog = ref(false)
  const { showCopiedToast, copyTrackInfo } = useClipboardToast()
  const { goStationSelection, goAbout, goHome } = usePageNavigation()

  // ローディング / エラー状態
  const isLoading = computed(() => props.loading || playbackState.value === 'loading')
  const showError = computed({
    get: () => props.error || playbackState.value === 'error',
    set: (value: boolean) => {
      if (!value) {
        appStore.clearError()
      }
    },
  })

  watch(() => props.loading, (value) => {
    if (!value && playbackState.value === 'loading') {
      appStore.playbackState = 'idle'
    }
  })
  watch(() => props.error, (value) => {
    if (value) {
      appStore.markPlaybackError('ストリームに接続できませんでした。')
    }
  })

  // ラジオ情報
  const displaySongName = computed(() => songName.value ?? undefined)
  const displayArtistName = computed(() => artistName.value ?? undefined)
  const stationName = computed(() => selectedStation.value?.name ?? 'SELECT STATION')
  const isLiveBroadcasting = computed(() => playbackState.value === 'playing')

  const effectControls = useAudioEffectControls(audioEffects.apply)

  const { startOneShotFx, stopOneShotFx, stopAllOneShotFx } = useOneShotFx()

  usePlaybackMetadataPolling(playbackState, () => appStore.fetchMetadata())

  function onChangeStation() {
    goStationSelection()
  }

  function onGoAbout() {
    goAbout()
  }

  async function onCopyTrackInfo() {
    await copyTrackInfo({
      artistName: artistName.value,
      songName: songName.value,
    })
  }

  async function onToggleLiveBroadcasting() {
    if (!selectedStation.value || playbackState.value === 'loading') {
      return
    }

    if (playbackState.value === 'playing') {
      appStore.pausePlayback(audioElement.value)
      return
    }

    await appStore.resumePlayback(audioElement.value)
  }

  function onStartSiren() { void startOneShotFx('siren') }
  function onStopSiren() { stopOneShotFx('siren') }
  function onStartBeam1() { void startOneShotFx('beam1') }
  function onStopBeam1() { stopOneShotFx('beam1') }
  function onStartBeam2() { void startOneShotFx('beam2') }
  function onStopBeam2() { stopOneShotFx('beam2') }

  function onRetry() {
    void appStore.retryPlayback(audioElement.value)
  }

  function onHome() {
    stopAllOneShotFx()
    appStore.clearError()
    appStore.stopPlayback(audioElement.value)
  }

  function onAudioError() {
    appStore.markPlaybackError('ストリームの再生中にエラーが発生しました。')
  }

  function onLoadingBack() {
    stopAllOneShotFx()
    appStore.stopPlayback(audioElement.value)
    appStore.clearSelectedStation()
    appStore.clearError()
    goHome(true)
  }

  async function onAllowSoundPermission() {
    showSoundPermissionDialog.value = false
    appStore.markSoundPermissionDialogOpened()

    const previewAudio = new Audio('/assets/soundfx/radio.mp3')

    try {
      await previewAudio.play()
    }
    catch {
      // ユーザー操作中でも再生に失敗する場合がある。
    }
  }

  function onLaterSoundPermission() {
    showSoundPermissionDialog.value = false
  }

  onMounted(async () => {
    appStore.initialize()

    if (!hasOpenedSoundPermissionDialog.value) {
      showSoundPermissionDialog.value = true
      appStore.markSoundPermissionDialogOpened()
    }

    await audioEffects.init(audioElement.value)

    if (route.query.autoplay === '1') {
      if (selectedStation.value) {
        await appStore.startPlayback(audioElement.value)
      }

      goHome(true)
    }
  })

  onBeforeUnmount(() => {
    stopAllOneShotFx()
    appStore.stopPlayback(audioElement.value)
    audioEffects.dispose()
  })

  return {
    audioElement,
    showCopiedToast,
    showSoundPermissionDialog,
    isLoading,
    showError,
    displaySongName,
    displayArtistName,
    stationName,
    isLiveBroadcasting,
    ...effectControls,
    onChangeStation,
    onGoAbout,
    onCopyTrackInfo,
    onToggleLiveBroadcasting,
    onStartSiren,
    onStopSiren,
    onStartBeam1,
    onStopBeam1,
    onStartBeam2,
    onStopBeam2,
    onRetry,
    onHome,
    onAudioError,
    onLoadingBack,
    onAllowSoundPermission,
    onLaterSoundPermission,
  }
}
