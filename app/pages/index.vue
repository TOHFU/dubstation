<template>
  <div class="page-root">
    <!-- ローディング -->
    <div v-if="isLoading" class="overlay">
      <LoadingSpinner />
    </div>

    <!-- エラーダイアログ -->
    <ErrorDialog v-model="showError" @retry="onRetry" @home="onHome" />

    <template v-if="!isLoading">
      <!-- ヘッダー -->
      <AppBar>DUB STATION</AppBar>

      <!-- メインコンテンツ -->
      <main class="main">
        <!-- ラジオ表示セクション -->
        <RadioDisplaySection
          :song-name="songName"
          :artist-name="artistName"
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
import { ref, watch } from 'vue'
import AppBar from '../components/Common/AppBar.vue'
import ErrorDialog from '../components/Common/ErrorDialog.vue'
import LoadingSpinner from '../components/Common/LoadingSpinner.vue'
import RadioDisplaySection from '../components/Player/RadioDisplaySection.vue'
import EffectsPanel from '../components/Player/EffectsPanel.vue'
import EffectButton from '../components/Player/EffectButton.vue'

const props = withDefaults(defineProps<{
  loading?: boolean
  error?: boolean
}>(), {
  loading: false,
  error: false,
})

// ローディング / エラー状態
const isLoading = ref(props.loading)
const showError = ref(props.error)

watch(() => props.loading, (value) => {
  isLoading.value = value
})
watch(() => props.error, (value) => {
  showError.value = value
})

// ラジオ情報
const songName = ref('ROOTS REVIVAL')
const artistName = ref('King Tubby & The Aggrovators')
const stationName = ref('DUBBING MY WAY')

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
  // TODO: ラジオ局変更ロジック
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
  showError.value = false
  isLoading.value = true
  // TODO: 再接続ロジック
}

function onHome() {
  showError.value = false
}
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
  display: flex;
  align-items: center;
  justify-content: center;
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
