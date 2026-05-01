<template>
  <div class="radio-display-section">
    <div
      class="radio-display-section__status"
      :class="{ 'radio-display-section__status--active': isStationSelected }"
    >
      <img
        v-if="isStationSelected"
        :src="liveBroadcastingIcon"
        alt="live"
        class="radio-display-section__status-icon"
      />
      <span>LIVE BROADCASTING</span>
    </div>
    <div v-if="songName" class="radio-display-section__song">{{ songName }}</div>
    <div v-if="artistName" class="radio-display-section__artist">{{ artistName }}</div>
    <button
      class="radio-display-section__station"
      type="button"
      @click="$emit('change-station')"
    >
      {{ stationName }}
    </button>
    <div class="radio-display-section__knob-row">
      <ControlKnob
        v-model="volume"
        :min="0"
        :max="100"
        :size="'large'"
        label="VOLUME"
      />
      <button class="radio-display-section__change-btn" @click="$emit('change-station')">
        CHANGE STATION
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineEmits } from 'vue'
import ControlKnob from './ControlKnob.vue'
import liveBroadcastingIcon from '../../assets/icons/live-broadcasting-icon.svg'

const props = defineProps<{
  songName?: string
  artistName?: string
  stationName?: string
  modelValue?: number
}>()
const emit = defineEmits(['update:modelValue', 'change-station'])

const volume = ref(props.modelValue ?? 50)
const isStationSelected = computed(() => {
  const name = props.stationName?.trim() ?? ''
  return name !== '' && name !== 'SELECT STATION'
})
watch(() => props.modelValue, v => { if (v !== undefined) volume.value = v })
watch(volume, v => emit('update:modelValue', v))
</script>

<style scoped>
  .radio-display-section {
    background: #C9C9A4;
    border-radius: 32px;
    box-shadow: inset 0px 4px 8px 4px rgba(0,0,0,0.2), 0 0 0 4px rgba(28,25,23,0.1);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    overflow: hidden;
  }
  .radio-display-section::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: url('../../assets/textures/radio-noise-texture.png');
    opacity: 0.10;
    background-size: cover;
    pointer-events: none;
    border-radius: 32px;
  }
.radio-display-section__status {
  background: #F5F5E6;
  border-radius: 9999px;
  color: #A6A67A;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 16px 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.radio-display-section__status--active {
  color: #292524;
}
.radio-display-section__status-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
}
.radio-display-section__song {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 900;
  color: #1C1917;
  letter-spacing: -0.05em;
  margin-bottom: 2px;
  text-align: center;
}
.radio-display-section__artist {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 700;
  color: #606042;
  margin-bottom: 2px;
  text-align: center;
}
.radio-display-section__station {
  background: #F5F5E6;
  border: none;
  border-radius: 9999px;
  color: #292524;
  font-size: 14px;
  font-weight: 700;
  padding: 2px 16px;
  margin-bottom: 8px;
  text-align: center;
  cursor: pointer;
}
.radio-display-section__knob-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
  justify-content: center;
  z-index: 1;
}
.radio-display-section__change-btn {
  background: transparent;
  border: none;
  color: #1C1917;
  font-size: 16px;
  font-family: var(--font-heading);
  font-weight: 900;
  min-width: 131px;
  height: 36px;
  padding: 0 18px;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: none;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
.radio-display-section__change-btn:hover {
  background: #FFD16622;
  color: #1C1917;
}
</style>
