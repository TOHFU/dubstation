<template>
  <header class="relative flex h-16 items-center bg-[rgb(var(--v-theme-primary))] px-6 shadow-[0px_4px_20px_0px_rgba(67,56,20,0.08)] rounded-b-[24px]">
    <div class="flex w-full items-center gap-3">
      <div v-if="$slots.leading" class="flex items-center justify-center">
        <slot name="leading" />
      </div>
      <span class="text-left align-middle text-2xl font-black uppercase tracking-[-0.05em] leading-8 text-[rgb(var(--v-theme-text-primary))]" style="font-family: var(--font-heading)">
        <slot />
      </span>
      <div v-if="$slots.actions" class="ml-auto flex items-center">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// 共通AppBar。タイトルやアクションはスロットで差し替え
</script>
