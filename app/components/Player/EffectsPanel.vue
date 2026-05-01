<template>
  <section class="effects-panel" aria-label="Effects Panel">
    <header class="effects-panel__header">
      <h2 class="effects-panel__title">{{ title }}</h2>
      <img
        class="effects-panel__icon"
        src="/assets/figma-effects-panel/effects-panel-icon.svg"
        alt=""
        aria-hidden="true"
      />
    </header>

    <HorizontalEqSlider
      :model-value="masterVolume"
      :min="volumeMin"
      :max="volumeMax"
      :step="volumeStep"
      @update:model-value="emit('update:masterVolume', $event)"
    />

    <div class="effects-panel__stack">
      <section class="effects-panel__card effects-panel__card--eq" aria-label="Equalizer">
        <div class="effects-panel__card-header">
          <h3 class="effects-panel__card-title">Equalizer</h3>
          <EffectSwitch
            :model-value="equalizerEnabled"
            @update:model-value="emit('update:equalizerEnabled', $event)"
          />
        </div>

        <div class="effects-panel__eq-body">
          <VerticalEqSlider
            :model-value="equalizerLow"
            :min="eqMin"
            :max="eqMax"
            :step="eqStep"
            label="LOW"
            @update:model-value="emit('update:equalizerLow', $event)"
          />
          <VerticalEqSlider
            :model-value="equalizerMid"
            :min="eqMin"
            :max="eqMax"
            :step="eqStep"
            label="MID"
            @update:model-value="emit('update:equalizerMid', $event)"
          />
          <VerticalEqSlider
            :model-value="equalizerHigh"
            :min="eqMin"
            :max="eqMax"
            :step="eqStep"
            label="HIGH"
            @update:model-value="emit('update:equalizerHigh', $event)"
          />
        </div>
      </section>

      <div class="effects-panel__fx-list">
        <section class="effects-panel__card effects-panel__fx-card" aria-label="Delay">
          <div class="effects-panel__fx-copy">
            <h3 class="effects-panel__card-title">Delay</h3>
            <div class="effects-panel__knob-row">
              <ControlKnob
                :model-value="delayAmount"
                :min="delayMin"
                :max="delayMax"
                :step="delayStep"
                size="medium"
                @update:model-value="emit('update:delayAmount', $event)"
              />
              <span class="effects-panel__value">{{ delayText }}</span>
            </div>
          </div>
          <EffectSwitch
            :model-value="delayEnabled"
            @update:model-value="emit('update:delayEnabled', $event)"
          />
        </section>

        <section class="effects-panel__card effects-panel__fx-card" aria-label="Reverb">
          <div class="effects-panel__fx-copy">
            <h3 class="effects-panel__card-title">Reverb</h3>
            <div class="effects-panel__knob-row">
              <ControlKnob
                :model-value="reverbAmount"
                :min="reverbMin"
                :max="reverbMax"
                :step="reverbStep"
                size="medium"
                @update:model-value="emit('update:reverbAmount', $event)"
              />
              <span class="effects-panel__value">{{ reverbText }}</span>
            </div>
          </div>
          <EffectSwitch
            :model-value="reverbEnabled"
            @update:model-value="emit('update:reverbEnabled', $event)"
          />
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ControlKnob from './ControlKnob.vue'
import EffectSwitch from './EffectSwitch.vue'
import HorizontalEqSlider from './HorizontalEqSlider.vue'
import VerticalEqSlider from './VerticalEqSlider.vue'

const props = withDefaults(defineProps<{
  title?: string
  masterVolume: number
  volumeMin?: number
  volumeMax?: number
  volumeStep?: number
  equalizerEnabled: boolean
  equalizerLow: number
  equalizerMid: number
  equalizerHigh: number
  eqMin?: number
  eqMax?: number
  eqStep?: number
  delayEnabled: boolean
  delayAmount: number
  delayMin?: number
  delayMax?: number
  delayStep?: number
  delayDisplay?: string
  reverbEnabled: boolean
  reverbAmount: number
  reverbMin?: number
  reverbMax?: number
  reverbStep?: number
  reverbDisplay?: string
}>(), {
  title: 'Echo Chamber',
  volumeMin: 0,
  volumeMax: 100,
  volumeStep: 1,
  eqMin: 0,
  eqMax: 100,
  eqStep: 1,
  delayMin: 0,
  delayMax: 1000,
  delayStep: 10,
  reverbMin: 0,
  reverbMax: 100,
  reverbStep: 1,
})

const emit = defineEmits<{
  'update:masterVolume': [value: number]
  'update:equalizerEnabled': [value: boolean]
  'update:equalizerLow': [value: number]
  'update:equalizerMid': [value: number]
  'update:equalizerHigh': [value: number]
  'update:delayEnabled': [value: boolean]
  'update:delayAmount': [value: number]
  'update:reverbEnabled': [value: boolean]
  'update:reverbAmount': [value: number]
}>()

const delayText = computed(() => props.delayDisplay ?? `${props.delayAmount}ms`)
const reverbText = computed(() => props.reverbDisplay ?? `${props.reverbAmount}%`)
</script>

<style scoped>
.effects-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 24px;
  background: #F1EDE9;
  border-radius: 32px;
  box-shadow: 0 4px 20px 0 rgba(67, 56, 20, 0.08);
}

.effects-panel__header,
.effects-panel__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.effects-panel__title,
.effects-panel__card-title {
  margin: 0;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  line-height: 28px;
  color: #1C1917;
}

.effects-panel__title {
  font-weight: 400;
  letter-spacing: 0.04em;
}

.effects-panel__card-title {
  font-weight: 400;
  letter-spacing: 0.04em;
}

.effects-panel__icon {
  width: 22px;
  height: 22px;
}

.effects-panel__stack,
.effects-panel__fx-list,
.effects-panel__fx-copy {
  display: flex;
  flex-direction: column;
}

.effects-panel__stack,
.effects-panel__fx-list {
  gap: 16px;
}

.effects-panel__card {
  background: #FDF9F4;
  border: 1px solid #E0DFD5;
  border-radius: 32px;
}

.effects-panel__card--eq {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.effects-panel__eq-body {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 54px;
  padding: 8px 27px;
}

.effects-panel__fx-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.effects-panel__fx-copy {
  gap: 8px;
  min-width: 0;
}

.effects-panel__knob-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.effects-panel__value {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.04em;
  color: #606042;
}

@media (max-width: 520px) {
  .effects-panel {
    padding: 20px;
  }

  .effects-panel__eq-body {
    gap: 24px;
    padding: 8px 12px;
  }

  .effects-panel__fx-card {
    gap: 16px;
  }
}
</style>