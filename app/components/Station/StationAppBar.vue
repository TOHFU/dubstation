<template>
  <AppBar>
    <template #leading>
      <button
        class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-[rgb(var(--v-theme-text-primary))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--v-theme-accent))]"
        type="button"
        aria-label="Back to player"
        @click="$emit('back')"
      >
        <span class="material-symbols-rounded text-2xl leading-none" aria-hidden="true">
          arrow_back
        </span>
      </button>
    </template>
    {{ title }}
  </AppBar>
</template>

<script setup lang="ts">
import AppBar from '../Common/AppBar.vue'

withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Select Station',
})

defineEmits<{
  back: []
}>()
</script>
