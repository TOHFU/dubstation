<template>
  <div class="page-root">
    <!-- ローディング -->
    <div v-if="isLoading" class="overlay">
      <div class="overlay__content">
        <LoadingSpinner />
      </div>
      <div class="overlay__actions">
        <SecondaryButton @click="onLoadingBack">BACK</SecondaryButton>
      </div>
    </div>

    <!-- エラーダイアログ -->
    <ErrorDialog v-model="showError" @retry="onRetry" @home="onHome" />

    <audio
      ref="audioElement"
      class="sr-only"
      preload="none"
      @error="onAudioError"
    />

    <template v-if="!isLoading">
      <!-- ヘッダー -->
      <AppBar>DUB STATION</AppBar>

      <!-- メインコンテンツ -->
      <main class="main">
        <!-- ラジオ表示セクション -->
        <RadioDisplaySection
          :song-name="displaySongName"
          :artist-name="displayArtistName"
          :station-name="stationName"
          v-model="masterVolume"
          @change-station="onChangeStation"
        />

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

        <!-- 効果音ボタン -->
        <div class="effect-buttons-section">
          <p class="effect-buttons-section__label">One Shot FX</p>
          <div class="effect-buttons">
            <EffectButton color="siren" @play="onPlaySiren">SIREN</EffectButton>
            <EffectButton color="beam1" @play="onPlayBeam1">BEAM 1</EffectButton>
            <EffectButton color="beam2" @play="onPlayBeam2">BEAM 2</EffectButton>
          </div>
        </div>
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
} = storeToRefs(appStore)

const METADATA_POLLING_INTERVAL_MS = 20000
let metadataPollingTimer: ReturnType<typeof setInterval> | null = null

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

// エフェクト状態
const masterVolume = ref(50)
const equalizerEnabled = ref(false)
const equalizerLow = ref(50)
const equalizerMid = ref(50)
const equalizerHigh = ref(50)
const delayEnabled = ref(false)
const delayAmount = ref(0)
const reverbEnabled = ref(false)
const reverbAmount = ref(0)

function onChangeStation() {
  void navigateTo('/station')
}

function onPlaySiren() {
  // TODO: サイレン効果音再生ロジック
}

function onPlayBeam1() {
  // TODO: ビーム1効果音再生ロジック
}

function onPlayBeam2() {
  // TODO: ビーム2効果音再生ロジック
}

function onRetry() {
  void appStore.retryPlayback(audioElement.value)
}

function onHome() {
  appStore.clearError()
  appStore.stopPlayback(audioElement.value)
}

function onAudioError() {
  appStore.markPlaybackError('ストリームの再生中にエラーが発生しました。')
}

function onLoadingBack() {
  appStore.stopPlayback(audioElement.value)
  appStore.clearSelectedStation()
  appStore.clearError()
  void navigateTo('/', { replace: true })
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

  await audioEffects.init(audioElement.value)

  if (route.query.autoplay === '1') {
    if (selectedStation.value) {
      await appStore.startPlayback(audioElement.value)
    }

    await navigateTo('/', { replace: true })
  }
})

onBeforeUnmount(() => {
  stopMetadataPolling()
  appStore.stopPlayback(audioElement.value)
  audioEffects.dispose()
})
</script>

<style scoped>
.page-root {
  min-height: 100dvh;
  background: #fdfcf5;
  display: flex;
  flex-direction: column;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #fdfcf5;
  display: grid;
  grid-template-rows: 1fr auto;
}

.overlay__content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay__actions {
  display: flex;
  justify-content: center;
  padding: 0 16px 32px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px 16px 40px;
  width: 100%;
  box-sizing: border-box;
}

.effect-buttons {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 358px;
  justify-content: center;
  margin-top: 16px;
}

.effect-buttons-section__label {
  font-weight: 700;
}
</style>
