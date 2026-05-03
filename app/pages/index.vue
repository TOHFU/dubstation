<template>
  <div class="flex min-h-dvh flex-col bg-[rgb(var(--v-theme-background))]">
    <!-- ローディング -->
    <div v-if="isLoading" class="fixed inset-0 z-[100] grid bg-[rgb(var(--v-theme-background))] [grid-template-rows:1fr_auto]">
      <div class="flex items-center justify-center">
        <LoadingSpinner />
      </div>
      <div class="flex justify-center px-4 pb-8">
        <SecondaryButton @click="onLoadingBack">BACK</SecondaryButton>
      </div>
    </div>

    <!-- エラーダイアログ -->
    <ErrorDialog v-model="showError" @retry="onRetry" @home="onHome" />

    <SoundPermissionDialog
      v-model="showSoundPermissionDialog"
      @allow="onAllowSoundPermission"
      @later="onLaterSoundPermission"
    />

    <v-snackbar
      v-model="showCopiedToast"
      :timeout="2000"
      color="surface"
      location="bottom center"
      rounded="xl"
      style="bottom: 32px"
    >
      <span class="block w-full text-center">曲名/アーティスト名がコピーされました</span>
    </v-snackbar>

    <audio
      ref="audioElement"
      class="sr-only"
      preload="none"
      @error="onAudioError"
    />

    <template v-if="!isLoading">
      <!-- ヘッダー -->
      <AppBar>
        DUB STATION
        <template #actions>
          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border-none bg-transparent text-[rgb(var(--v-theme-text-primary))] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--v-theme-accent))]"
            type="button"
            aria-label="About"
            @click="onGoAbout"
          >
            <span class="material-symbols-rounded" aria-hidden="true">help</span>
          </button>
        </template>
      </AppBar>

      <!-- メインコンテンツ -->
      <main class="box-border flex w-full flex-1 flex-col items-center gap-6 px-4 pb-10 pt-6">
        <!-- ラジオ表示セクション -->
        <RadioDisplaySection
          :song-name="displaySongName"
          :artist-name="displayArtistName"
          :station-name="stationName"
          :is-playing="isLiveBroadcasting"
          v-model="masterVolume"
          @change-station="onChangeStation"
          @toggle-live="onToggleLiveBroadcasting"
          @copy-track-info="onCopyTrackInfo"
        />

        <!-- 効果音ボタン -->
        <div>
          <p class="font-bold">One Shot FX</p>
          <div class="mt-4 flex w-full max-w-[358px] justify-center gap-4">
            <EffectButton
              color="siren"
              @press-start="onStartSiren"
              @press-end="onStopSiren"
            >
              SIREN
            </EffectButton>
            <EffectButton
              color="beam1"
              @press-start="onStartBeam1"
              @press-end="onStopBeam1"
            >
              BEAM 1
            </EffectButton>
            <EffectButton
              color="beam2"
              @press-start="onStartBeam2"
              @press-end="onStopBeam2"
            >
              BEAM 2
            </EffectButton>
          </div>
        </div>

        <!-- エフェクトパネル -->
        <EffectsPanel
          v-model:master-volume="masterVolume"
          v-model:equalizer-enabled="equalizerEnabled"
          v-model:equalizer-low="equalizerLow"
          v-model:equalizer-mid="equalizerMid"
          v-model:equalizer-high="equalizerHigh"
          v-model:delay-enabled="delayEnabled"
          v-model:delay-amount="delayAmount"
          v-model:reverb-enabled="reverbEnabled"
          v-model:reverb-amount="reverbAmount"
        />
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import AppBar from '../components/Common/AppBar.vue'
import ErrorDialog from '../components/Common/ErrorDialog.vue'
import LoadingSpinner from '../components/Common/LoadingSpinner.vue'
import SoundPermissionDialog from '../components/Common/SoundPermissionDialog.vue'
import SecondaryButton from '../components/Common/SecondaryButton.vue'
import RadioDisplaySection from '../components/Player/RadioDisplaySection.vue'
import EffectsPanel from '../components/Player/EffectsPanel.vue'
import EffectButton from '../components/Player/EffectButton.vue'
import { useAppStore } from '../stores/app'
import { useAudioEffects } from '../composables/useAudioEffects'

const props = withDefaults(defineProps<{
  loading?: boolean
  error?: boolean
}>(), {
  loading: false,
  error: false,
})

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

const METADATA_POLLING_INTERVAL_MS = 20000
let metadataPollingTimer: ReturnType<typeof setInterval> | null = null
const showSoundPermissionDialog = ref(false)
const showCopiedToast = ref(false)

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

// エフェクト状態
const masterVolume = ref(50)
const equalizerEnabled = ref(false)
const equalizerLow = ref(50)
const equalizerMid = ref(50)
const equalizerHigh = ref(50)
const delayEnabled = ref(false)
const delayAmount = ref(500)
const reverbEnabled = ref(false)
const reverbAmount = ref(50)

type OneShotFxKey = 'siren' | 'beam1' | 'beam2'

const ONE_SHOT_FX_SOURCES: Record<OneShotFxKey, string> = {
  siren: '/assets/soundfx/siren.mp3',
  beam1: '/assets/soundfx/beam1.mp3',
  beam2: '/assets/soundfx/beam2.mp3',
}

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

function onChangeStation() {
  void navigateTo('/station')
}

function onGoAbout() {
  void navigateTo('/about')
}

async function onCopyTrackInfo() {
  const currentSongName = songName.value?.trim()
  const currentArtistName = artistName.value?.trim()

  if (!currentSongName || !currentArtistName || !navigator?.clipboard) {
    return
  }

  const copyText = `${currentArtistName} / ${currentSongName}`

  try {
    await navigator.clipboard.writeText(copyText)
    showCopiedToast.value = true
  }
  catch {
    // クリップボード書き込みが制限されている場合は何もしない。
  }
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

function onStartSiren() {
  void startOneShotFx('siren')
}

function onStopSiren() {
  stopOneShotFx('siren')
}

function onStartBeam1() {
  void startOneShotFx('beam1')
}

function onStopBeam1() {
  stopOneShotFx('beam1')
}

function onStartBeam2() {
  void startOneShotFx('beam2')
}

function onStopBeam2() {
  stopOneShotFx('beam2')
}

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
  void navigateTo('/', { replace: true })
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

function startMetadataPolling() {
  stopMetadataPolling()

  metadataPollingTimer = setInterval(() => {
    void appStore.fetchMetadata()
  }, METADATA_POLLING_INTERVAL_MS)
}

function stopMetadataPolling() {
  if (!metadataPollingTimer) {
    return
  }

  clearInterval(metadataPollingTimer)
  metadataPollingTimer = null
}

watch(playbackState, (state) => {
  if (state === 'playing') {
    startMetadataPolling()
    return
  }

  stopMetadataPolling()
}, { immediate: true })

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
  audioEffects.apply({
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

    await navigateTo('/', { replace: true })
  }
})

onBeforeUnmount(() => {
  stopAllOneShotFx()
  stopMetadataPolling()
  appStore.stopPlayback(audioElement.value)
  audioEffects.dispose()
})
</script>
