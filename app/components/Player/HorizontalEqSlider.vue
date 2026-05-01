<template>
  <div class="horizontal-eq-slider">
    <div class="horizontal-eq-slider__label-row">
      <span class="horizontal-eq-slider__label">MASTER VOLUME</span>
      <span class="horizontal-eq-slider__percent-label">{{ percentLabel }}</span>
    </div>
    <div class="horizontal-eq-slider__input">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="proxyValue"
        class="horizontal-eq-slider__range"
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
.horizontal-eq-slider {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 310px;
}
.horizontal-eq-slider__label-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.horizontal-eq-slider__percent-label {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0.04em;
  color: #606042;
  text-align: right;
}
.horizontal-eq-slider__label {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0.05em;
  color: #66635F;
  text-align: left;
}
.horizontal-eq-slider__input {
  position: relative;
  width: 310px;
  height: 12px;
  background: #E6E5BF;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.horizontal-eq-slider__range {
  -webkit-appearance: none;
  appearance: none;
  width: 300px;
  height: 8px;
  background: transparent;
  accent-color: #E6E5BF;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
