<template>
  <div
    class="control-knob"
    :class="[`control-knob--${size}`]"
    tabindex="0"
    role="slider"
    :aria-valuenow="modelValue"
    :aria-valuemin="min"
    :aria-valuemax="max"
    @keydown="onKeydown"
  >
    <div class="control-knob__svg-wrap">
      <img
        :src="size === 'large' ? '/app/assets/icons/knob-large.svg' : '/app/assets/icons/knob-medium.svg'"
        :style="{ transform: `rotate(${angle}deg)` }"
        alt="knob"
        draggable="false"
      />
    </div>
    <input
      type="range"
      class="control-knob__slider"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="proxyValue"
      :aria-label="label"
    />
    <span v-if="label" class="control-knob__label">{{ label }}</span>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  label?: string
  size?: 'large' | 'medium'
}>()
const emit = defineEmits(['update:modelValue'])

const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)
const step = computed(() => props.step ?? 1)
const size = computed(() => props.size ?? 'large')
const label = computed(() => props.label ?? '')

const proxyValue = ref(props.modelValue)
watch(() => props.modelValue, v => { proxyValue.value = v })
watch(proxyValue, v => emit('update:modelValue', v))

// ノブの回転角度（例: 135deg〜405degの範囲で回す）
const angle = computed(() => {
  const minA = 135, maxA = 405
  const percent = (proxyValue.value - min.value) / (max.value - min.value)
  return minA + (maxA - minA) * percent
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    proxyValue.value = Math.max(min.value, proxyValue.value - step.value)
    e.preventDefault()
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    proxyValue.value = Math.min(max.value, proxyValue.value + step.value)
    e.preventDefault()
  }
}
</script>
<style scoped>
.control-knob {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;
  user-select: none;
}
.control-knob__svg-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.control-knob--large .control-knob__svg-wrap img {
  width: 96px;
  height: 96px;
}
.control-knob--medium .control-knob__svg-wrap img {
  width: 64px;
  height: 64px;
}
.control-knob__slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.control-knob__label {
  margin-top: 8px;
  font-size: 14px;
  color: #606042;
}
</style>
