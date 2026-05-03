<template>
  <div class="flex w-full flex-col items-start gap-2">
    <div class="flex w-full items-center justify-between">
      <span class="text-left text-base font-bold leading-7 tracking-[0.05em] text-[rgb(var(--v-theme-text-secondary))]">MASTER VOLUME</span>
      <span class="text-right text-base font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-accent))]">{{ percentLabel }}</span>
    </div>
    <div class="relative flex h-3 w-full items-center justify-center rounded-full bg-[rgb(var(--v-theme-primary))]">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="proxyValue"
        class="horizontal-eq-slider__range absolute left-1/2 top-1/2 h-2 w-[calc(100%-10px)] -translate-x-1/2 -translate-y-1/2 appearance-none bg-transparent accent-[rgb(var(--v-theme-primary))]"
        :aria-label="label"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
const props = defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  label?: string
}>()
const emit = defineEmits(['update:modelValue'])
const min = props.min ?? 0
const max = props.max ?? 100
const step = props.step ?? 1
const label = props.label ?? ''
const proxyValue = ref(props.modelValue)
watch(() => props.modelValue, v => { proxyValue.value = v })
watch(proxyValue, v => emit('update:modelValue', v))

// %ラベル計算
const percentLabel = computed(() => {
  const percent = ((proxyValue.value - min) / (max - min)) * 100
  return `${Math.round(percent)}%`
})
</script>

<style scoped>
.horizontal-eq-slider__range {
  -webkit-appearance: none;
}
/* ノブの色をprimaryに、中央配置 */
.horizontal-eq-slider__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E6E5BF;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
/* フォーカス時の枠線 */
.horizontal-eq-slider__range:focus::-webkit-slider-thumb {
  outline: 2px solid #06D6A0;
}
/* Firefox用 */
.horizontal-eq-slider__range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E6E5BF;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.horizontal-eq-slider__range:focus::-moz-range-thumb {
  outline: 2px solid #06D6A0;
}
/* IE/Edge用 */
.horizontal-eq-slider__range::-ms-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E6E5BF;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.horizontal-eq-slider__range:focus::-ms-thumb {
  outline: 2px solid #06D6A0;
}
.horizontal-eq-slider__range::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: #E6E5BF;
}
.horizontal-eq-slider__range::-ms-fill-lower {
  background: #E6E5BF;
}
.horizontal-eq-slider__range::-ms-fill-upper {
  background: #E6E5BF;
}
</style>
