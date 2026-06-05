<template>
  <section class="flex w-full flex-col gap-6 rounded-[32px] bg-[rgb(var(--v-theme-primary)/0.3)] p-6 shadow-[0_4px_20px_0_rgba(67,56,20,0.08)] max-[520px]:p-5" aria-label="Effects Panel">
    <header class="flex items-center justify-between">
      <h2 class="m-0 text-base font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-text-primary))]">{{ title }}</h2>
      <img
        class="h-[22px] w-[22px]"
        src="/assets/image/effects-panel-icon.svg"
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

    <div class="flex flex-col gap-4">
      <section class="flex flex-col gap-4 rounded-[32px] border border-[rgb(var(--v-theme-border))] bg-[rgb(var(--v-theme-surface))] p-4" aria-label="Equalizer">
        <div class="flex items-center justify-between">
          <h3 class="m-0 w-auto text-left text-base font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-text-primary))]">Equalizer</h3>
          <EffectSwitch
            :model-value="equalizerEnabled"
            @update:model-value="emit('update:equalizerEnabled', $event)"
          />
        </div>

        <div class="flex items-end justify-between gap-[54px] px-[27px] py-2 max-[520px]:gap-6 max-[520px]:px-3">
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

      <div class="flex flex-col gap-4">
        <section class="flex items-center justify-between rounded-[32px] border border-[rgb(var(--v-theme-border))] bg-[rgb(var(--v-theme-surface))] p-4 max-[520px]:gap-4" aria-label="Delay">
          <div class="flex min-w-0 flex-col gap-2">
            <h3 class="m-0 w-16 text-center text-base font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-text-primary))]">Delay</h3>
            <div class="flex items-center gap-4">
              <ControlKnob
                :model-value="delayAmount"
                :min="delayMin"
                :max="delayMax"
                :step="delayStep"
                size="medium"
                @update:model-value="emit('update:delayAmount', $event)"
              />
              <span class="text-base font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-accent))]">{{ delayText }}</span>
            </div>
          </div>
          <EffectSwitch
            :model-value="delayEnabled"
            @update:model-value="emit('update:delayEnabled', $event)"
          />
        </section>

        <section class="flex items-center justify-between rounded-[32px] border border-[rgb(var(--v-theme-border))] bg-[rgb(var(--v-theme-surface))] p-4 max-[520px]:gap-4" aria-label="Reverb">
          <div class="flex min-w-0 flex-col gap-2">
            <h3 class="m-0 w-16 text-center text-base font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-text-primary))]">Reverb</h3>
            <div class="flex items-center gap-4">
              <ControlKnob
                :model-value="reverbAmount"
                :min="reverbMin"
                :max="reverbMax"
                :step="reverbStep"
                size="medium"
                @update:model-value="emit('update:reverbAmount', $event)"
              />
              <span class="text-base font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-accent))]">{{ reverbText }}</span>
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