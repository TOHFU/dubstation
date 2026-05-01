<template>
  <v-btn
    class="effect-btn"
    :style="buttonStyle"
    @click="$emit('play')"
    height="96"
    rounded="xl"
    elevation="0"
  >
    <div class="effect-btn__content">
      <img
        class="effect-btn__icon"
        :src="colorMap[props.color || 'siren'].icon"
        :width="colorMap[props.color || 'siren'].iconSize"
        :height="32"
        :alt="props.color ? props.color + ' icon' : 'siren icon'"
      />
      <span class="effect-btn__label"><slot /></span>
    </div>
  </v-btn>
</template>

<script setup lang="ts">
// Figmaデザイン準拠 効果音ボタン
import { computed } from 'vue'
import iconSiren from '../../assets/icons/icon-siren.svg'
import iconBeam1 from '../../assets/icons/icon-beam1.svg'
import iconBeam2 from '../../assets/icons/icon-beam2.svg'
const props = defineProps<{ color?: 'siren' | 'beam1' | 'beam2' }>()
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
    padding: '0 12px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }
})
</script>

<style scoped>
.effect-btn__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.effect-btn__icon {
  display: block;
  margin: 0 auto 4px auto;
}
.effect-btn__label {
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.1em;
  line-height: 28px;
}
</style>

  .effect-btn__icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
  }
