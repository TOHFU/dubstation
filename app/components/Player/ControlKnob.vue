<template>
  <div
    class="relative flex select-none flex-col items-center justify-center outline-none"
    tabindex="0"
    role="slider"
    :aria-valuenow="modelValue"
    :aria-valuemin="min"
    :aria-valuemax="max"
    @keydown="onKeydown"
  >
    <div
      class="flex items-center justify-center rounded-full shadow-[0_8px_24px_0_rgba(67,56,20,0.18)]"
      :class="{ 'bg-[rgb(var(--v-theme-primary))]': size === 'medium' }"
    >
      <img
        :src="size === 'large' ? knobLarge : knobMedium"
        class="block border-0 outline-none"
        :class="size === 'large' ? 'h-24 w-24' : 'h-16 w-16'"
        :style="{ transform: `rotate(${angle}deg)` }"
        alt="knob"
        draggable="false"
      />
    </div>
    <input
      type="range"
      class="absolute left-0 top-0 h-full w-full cursor-pointer border-0 opacity-0 outline-none touch-pan-y"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="proxyValue"
      :aria-label="label"
      :class="{ 'is-touching': isTouching }"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    />
    <span v-if="label" class="mt-2 text-sm font-bold text-[rgb(var(--v-theme-accent))]">{{ label }}</span>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import knobLarge from '~/assets/icons/knob-large.svg'
import knobMedium from '~/assets/icons/knob-medium.svg'

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

const isTouching = ref(false)
function onTouchStart() { isTouching.value = true }
function onTouchEnd() { isTouching.value = false }

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
.is-touching {
  touch-action: none;
}
</style>
