<template>
  <v-btn
    class="secondary-btn"
    :block="block"
    :disabled="disabled"
    @click="$emit('click')"
    color="#fff"
    height="56"
    rounded="xl"
    elevation="0"
    style="border-radius: 9999px; border: 2px solid #606042;"
  >
    <span class="secondary-btn__label"><slot /></span>
  </v-btn>
</template>
<script setup lang="ts">
defineProps<{ block?: boolean; disabled?: boolean }>()
</script>
<style scoped>
.secondary-btn {
  background: #fff;
  color: #606042;
  border-radius: 9999px;
  border: 2px solid #E6E5BF;
  height: 56px;
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0em;
  padding: 0 32px;
}
.secondary-btn__label {
  width: 100%;
  text-align: center;
}
</style>
