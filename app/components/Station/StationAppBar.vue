<template>
  <AppBar>
    <template #leading>
      <button
        class="station-app-bar__back-button"
        type="button"
        aria-label="Back to player"
        @click="$emit('back')"
      >
        <span class="material-symbols-rounded station-app-bar__back-icon" aria-hidden="true">
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

<style scoped>
.station-app-bar__back-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 999px;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1c1917;
}

.station-app-bar__back-icon {
  font-size: 24px;
  line-height: 1;
}

.station-app-bar__back-button:focus-visible {
  outline: 2px solid #606042;
  outline-offset: 2px;
}
</style>
