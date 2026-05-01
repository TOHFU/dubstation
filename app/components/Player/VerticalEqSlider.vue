<template>
  <div class="vertical-eq-slider">
    <div class="vertical-eq-slider__input">
      <input
        type="range"
        orient="vertical"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="proxyValue"
        class="vertical-eq-slider__range"
        :aria-label="label"
      />
    </div>
    <div class="vertical-eq-slider__label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
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
</script>

<style scoped>
.vertical-eq-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.vertical-eq-slider__input {
  width: 16px;
  height: 96px;
  background: #E6E5BF;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.vertical-eq-slider__range {
  writing-mode: bt-lr; /* vertical */
  -webkit-appearance: slider-vertical;
  width: 8px;
  height: 88px;
  background: transparent;
  position: absolute;
  left: 50%;
  top: 4;
  transform: translateX(-50%);
  accent-color: #E6E5BF;
}
/* ノブの色・形状をHorizontalEqSliderと統一 */
.vertical-eq-slider__range::-webkit-slider-thumb {
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
  left: 50%;
}
.vertical-eq-slider__range:focus::-webkit-slider-thumb {
  outline: 2px solid #06D6A0;
}
.vertical-eq-slider__range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E6E5BF;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.vertical-eq-slider__range:focus::-moz-range-thumb {
  outline: 2px solid #06D6A0;
}
.vertical-eq-slider__range::-ms-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E6E5BF;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.vertical-eq-slider__range:focus::-ms-thumb {
  outline: 2px solid #06D6A0;
}
.vertical-eq-slider__label {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0.04em;
  color: #33312E;
  text-align: center;
}
</style>
