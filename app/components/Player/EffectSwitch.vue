<template>
  <button
    class="inline-flex cursor-pointer items-center p-0 outline-none"
    :aria-pressed="modelValue"
    @click="toggle"
    type="button"
  >
    <span
      class="relative flex h-6 w-11 items-center rounded-xl bg-[rgb(var(--v-theme-border))] transition-colors duration-200"
      :class="{ '!bg-[rgb(var(--v-theme-success))]': modelValue }"
    >
      <span
        class="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition-all duration-200"
        :class="{ '!left-[22px]': modelValue }"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])
const toggle = () => emit('update:modelValue', !props.modelValue)
</script>
