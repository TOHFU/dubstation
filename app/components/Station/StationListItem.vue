<template>
  <div
    class="box-border flex min-h-[116px] cursor-pointer items-center justify-between rounded-[32px] border-2 border-transparent bg-white p-6 transition-[box-shadow,border]"
    :class="{ 'border-[rgb(var(--v-theme-accent))] shadow-[0px_4px_20px_0px_rgba(67,56,20,0.12),0px_0px_0px_4px_rgba(230,229,191,0.3)]': selected }"
    @click="$emit('select')"
  >
    <div class="flex h-16 w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-[32px] bg-[rgb(var(--v-theme-border))]">
      <img class="block h-full w-full object-cover" src="/assets/image/lion.png" alt="station thumbnail" />
    </div>
    <div class="ml-4 mr-2 flex min-w-0 flex-1 flex-col gap-1">
      <div class="text-base font-normal leading-6 text-[rgb(var(--v-theme-text-primary))]">{{ station.name }}</div>
      <div class="text-xs font-normal leading-4 tracking-[0.04em] text-[rgb(var(--v-theme-text-secondary))]">{{ station.about }}</div>
    </div>
    <button class="flex h-10 w-8 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0" type="button" aria-label="Select station">
      <span class="material-symbols-rounded text-[32px] leading-none text-[rgb(var(--v-theme-accent))]" aria-hidden="true">
        play_circle
      </span>
    </button>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  station: { id: string; name: string; about: string }
  selected?: boolean
}>()

defineEmits<{
  select: []
}>()
</script>
