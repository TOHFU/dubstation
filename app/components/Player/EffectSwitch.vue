<template>
  <button
    class="effect-switch"
    :aria-pressed="modelValue"
    @click="toggle"
    type="button"
  >
    <span
      class="effect-switch__track"
      :class="{ 'effect-switch__track--on': modelValue }"
    >
      <span
        class="effect-switch__knob"
        :class="{ 'effect-switch__knob--on': modelValue }"
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

<style scoped>
.effect-switch {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  outline: none;
}
.effect-switch__track {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: #E0E0E0;
  display: flex;
  align-items: center;
  position: relative;
  transition: background 0.2s cubic-bezier(.4,0,.2,1);
}
.effect-switch__track--on {
  background: #06D6A0;
}
.effect-switch__knob {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  position: absolute;
  left: 2px;
  top: 2px;
  transition: left 0.2s cubic-bezier(.4,0,.2,1);
}
.effect-switch__knob--on {
  left: 22px;
}
</style>
