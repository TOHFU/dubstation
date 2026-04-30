<template>
  <button type="button" :class="buttonClasses" @click="onClick" :style="style">
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// アプリのテーマ(main.scss)のユーティリティクラスを利用
const props = withDefaults(
  defineProps<{
    label: string
    primary?: boolean
    size?: 'small' | 'medium' | 'large'
    backgroundColor?: string
  }>(),
  { primary: false }
)

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

const buttonClasses = computed(() => [
  'ds-btn',
  props.primary ? 'ds-btn--primary' : 'ds-btn--secondary',
  props.size ? `ds-btn--${props.size}` : 'ds-btn--medium',
])
const style = computed(() => ({
  backgroundColor: props.backgroundColor,
}))

const onClick = () => {
  emit('click', 1)
}
</script>
