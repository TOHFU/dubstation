<template>
  <v-btn
    class="!rounded-full !bg-[rgb(var(--v-theme-accent))] !px-8 !text-[rgb(var(--v-theme-on-background))] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
    :block="block"
    :disabled="disabled"
    @click="$emit('click')"
    color="accent"
    elevation="1"
    style="border-radius: 9999px;"
  >
    <span class="w-full text-center text-base font-bold leading-6"><slot /></span>
  </v-btn>
</template>
<script setup lang="ts">
defineProps<{ block?: boolean; disabled?: boolean }>()
</script>
