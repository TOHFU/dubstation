<template>
  <v-btn
    class="!h-24 !min-w-[100px] !rounded-[32px] !px-3 !normal-case"
    :style="buttonStyle"
    @pointerdown="onPressStart"
    @pointerup="onPressEnd"
    @pointerleave="onPressEnd"
    @pointercancel="onPressEnd"
    @keydown.space.prevent="onPressStart"
    @keyup.space.prevent="onPressEnd"
    @keydown.enter.prevent="onPressStart"
    @keyup.enter.prevent="onPressEnd"
    @click="$emit('play')"
    height="96"
    rounded="xl"
    elevation="0"
  >
    <div class="flex w-full flex-col items-center justify-center">
      <img
        class="mx-auto mb-1 block"
        :src="colorMap[props.color || 'siren'].icon"
        :width="colorMap[props.color || 'siren'].iconSize"
        :height="32"
        :alt="props.color ? props.color + ' icon' : 'siren icon'"
      />
      <span class="w-full text-center text-base font-bold uppercase leading-7 tracking-[0.1em]"><slot /></span>
    </div>
  </v-btn>
</template>

<script setup lang="ts">
// Figmaデザイン準拠 効果音ボタン
import { computed } from 'vue'

const iconSiren = '/assets/image/icon-siren.svg'
const iconBeam1 = '/assets/image/icon-beam1.svg'
const iconBeam2 = '/assets/image/icon-beam2.svg'

const props = defineProps<{ color?: 'siren' | 'beam1' | 'beam2' }>()
const emit = defineEmits<{
  (e: 'play'): void
  (e: 'press-start'): void
  (e: 'press-end'): void
}>()

function onPressStart() {
  emit('press-start')
}

function onPressEnd() {
  emit('press-end')
}

const colorMap = {
  siren: {
    bg: 'rgba(255, 107, 107, 0.2)',
    border: '4px solid rgba(255, 107, 107, 0.4)',
    text: '#FF6B6B',
    icon: iconSiren,
    iconSize: 25,
  },
  beam1: {
    bg: 'rgba(255, 209, 102, 0.2)',
    border: '4px solid rgba(255, 209, 102, 0.4)',
    text: '#FFD166',
    icon: iconBeam1,
    iconSize: 28,
  },
  beam2: {
    bg: 'rgba(6, 214, 160, 0.2)',
    border: '4px solid rgba(6, 214, 160, 0.4)',
    text: '#06D6A0',
    icon: iconBeam2,
    iconSize: 25,
  },
}
const buttonStyle = computed(() => {
  const c = colorMap[props.color || 'siren']
  return {
    background: c.bg,
    border: c.border,
    color: c.text,
    borderRadius: '32px',
    minWidth: '100px',
    height: '96px',
    fontFamily: `'Noto Sans JP', 'Quicksand', sans-serif`,
    fontWeight: 700,
    fontSize: '16px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    boxSizing: 'border-box' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }
})
</script>
