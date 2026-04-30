<template>
  <div style="padding: 2rem; background: var(--v-theme-background); min-height: 100vh">
    <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 2rem">DubStation Theme Colors</h1>
    <div style="display: flex; flex-wrap: wrap; gap: 2rem">
      <div v-for="(color, name) in colors" :key="name" style="width: 180px">
        <div
          :style="`background: ${color}; height: 48px; border-radius: 8px; border: 1px solid #e0dfd5;`"
        />
        <div style="margin-top: 0.5rem; font-size: 1rem; color: var(--v-theme-on-background)">
          <strong>{{ name }}</strong>
          <div style="font-size: 0.9rem; color: #666">{{ color }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dubStationTheme } from '../app/plugins/vuetify.theme'
const colors = dubStationTheme.colors
</script>
