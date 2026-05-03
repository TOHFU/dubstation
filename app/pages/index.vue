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
import AppBar from '../components/Common/AppBar.vue'
import ErrorDialog from '../components/Common/ErrorDialog.vue'
import LoadingSpinner from '../components/Common/LoadingSpinner.vue'
import SoundPermissionDialog from '../components/Common/SoundPermissionDialog.vue'
import SecondaryButton from '../components/Common/SecondaryButton.vue'
import RadioDisplaySection from '../components/Player/RadioDisplaySection.vue'
import EffectsPanel from '../components/Player/EffectsPanel.vue'
import EffectButton from '../components/Player/EffectButton.vue'
import { usePlayerPage } from '../composables/pages/usePlayerPage'

const props = withDefaults(defineProps<{
  loading?: boolean
  error?: boolean
}>(), {
  loading: false,
  error: false,
})

const {
  audioElement,
  showCopiedToast,
  showSoundPermissionDialog,
  isLoading,
  showError,
  displaySongName,
  displayArtistName,
  stationName,
  isLiveBroadcasting,
  masterVolume,
  equalizerEnabled,
  equalizerLow,
  equalizerMid,
  equalizerHigh,
  delayEnabled,
  delayAmount,
  reverbEnabled,
  reverbAmount,
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
} = usePlayerPage(props)
</script>
