<template>
  <div class="radio-display-section relative mx-auto flex w-full max-w-[400px] flex-col items-center gap-3 overflow-hidden rounded-[32px] bg-[#C9C9A4] p-6 shadow-[inset_0px_4px_8px_4px_rgba(0,0,0,0.2),0_0_0_4px_rgba(28,25,23,0.1)]">
    <button
      class="mb-2 flex cursor-pointer items-center gap-2 rounded-full border-none bg-[rgb(var(--v-theme-surface))] px-4 py-1 pl-2 text-xs font-bold text-[rgb(var(--v-theme-text-disabled))]"
      :class="{ 'text-[rgb(var(--v-theme-text-primary))]': props.isPlaying }"
      type="button"
      @click="$emit('toggle-live')"
    >
      <img
        v-if="props.isPlaying"
        :src="liveBroadcastingIcon"
        alt="live"
        class="inline-block h-[18px] w-[18px]"
      />
      <span v-else class="inline-block h-[18px] w-[18px] rounded-full bg-[rgb(var(--v-theme-text-disabled))]" aria-hidden="true" />
      <span>LIVE BROADCASTING</span>
    </button>
    <div v-if="songName" class="mb-[2px] text-center text-2xl font-black tracking-[-0.05em] text-[rgb(var(--v-theme-text-primary))]" style="font-family: var(--font-heading)">{{ songName }}</div>
    <div v-if="artistName" class="mb-[2px] text-center text-base font-bold text-[rgb(var(--v-theme-accent))]">{{ artistName }}</div>
    <button
      class="mb-2 cursor-pointer rounded-full border-none bg-[rgb(var(--v-theme-surface))] px-4 py-[2px] text-center text-sm font-bold text-[rgb(var(--v-theme-text-primary))]"
      type="button"
      @click="$emit('change-station')"
    >
      {{ stationName }}
    </button>
    <div class="z-[1] mt-4 flex flex-col items-center justify-center gap-6">
      <ControlKnob
        v-model="volume"
        :min="0"
        :max="100"
        :size="'large'"
        label="VOLUME"
      />
      <SecondaryButton @click="$emit('change-station')">
        CHANGE STATION
      </SecondaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import SecondaryButton from '../Common/SecondaryButton.vue'
import ControlKnob from './ControlKnob.vue'
import liveBroadcastingIcon from '../../assets/icons/live-broadcasting-icon.svg'

const props = defineProps<{
  songName?: string
  artistName?: string
  stationName?: string
  modelValue?: number
  isPlaying?: boolean
}>()
const emit = defineEmits(['update:modelValue', 'change-station', 'toggle-live'])

const volume = ref(props.modelValue ?? 50)
watch(() => props.modelValue, v => { if (v !== undefined) volume.value = v })
watch(volume, v => emit('update:modelValue', v))
</script>

<style scoped>
.radio-display-section::before {
    content: '';
    position: absolute;
    inset: 4px;
    z-index: 0;
    background-image: url('/assets/figma-radio-display/subtle-noise-texture.png');
    opacity: 0.10;
    background-repeat: repeat;
    background-size: auto;
    pointer-events: none;
    border-radius: 28px;
}
</style>
