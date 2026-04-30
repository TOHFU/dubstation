<template>
  <v-list class="station-list" lines="two">
    <StationListItem
      v-for="station in stations"
      :key="station.id"
      :station="station"
      :selected="selectedStationId === station.id"
      @select="$emit('select', station)"
    />
  </v-list>
</template>
<script setup lang="ts">
import StationListItem from './StationListItem.vue'

defineProps<{
  stations: Array<{ id: string; name: string; about: string }>
  selectedStationId?: string
}>()
</script>
