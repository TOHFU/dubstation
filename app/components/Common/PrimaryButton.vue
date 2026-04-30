<template>
  <v-btn
    class="primary-btn"
    :block="block"
    :disabled="disabled"
    @click="$emit('click')"
    color="#606042"
    height="56"
    rounded="xl"
    elevation="1"
    style="border-radius: 9999px;"
  >
    <span class="primary-btn__label"><slot /></span>
  </v-btn>
</template>
<script setup lang="ts">
defineProps<{ block?: boolean; disabled?: boolean }>()
</script>
<style scoped>
.primary-btn {
  background: #606042;
  color: #fff;
  border-radius: 9999px;
  height: 56px;
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0em;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.05);
  padding: 0 32px;
}
.primary-btn__label {
  width: 100%;
  text-align: center;
}
</style>
