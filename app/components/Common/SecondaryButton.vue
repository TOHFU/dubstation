<template>
  <v-btn
    class="!rounded-full !border-2 !border-[rgb(var(--v-theme-primary))] !bg-[rgb(var(--v-theme-surface))] !px-8 !text-[rgb(var(--v-theme-accent))]"
    :block="block"
    :disabled="disabled"
    @click="$emit('click')"
    color="surface"
    elevation="0"
    style="border-radius: 9999px; border: 2px solid #606042;"
  >
    <span class="w-full text-center text-base font-bold leading-6"><slot /></span>
  </v-btn>
</template>
<script setup lang="ts">
defineProps<{ block?: boolean; disabled?: boolean }>()
</script>
