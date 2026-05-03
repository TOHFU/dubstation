<template>
  <div class="flex w-full flex-col gap-4">
    <StationListItem
      v-for="station in stations"
      :key="station.id"
      :station="station"
      :selected="selectedStationId === station.id"
      @select="$emit('select', station.id)"
    />
  </div>
</template>
<script setup lang="ts">
import StationListItem from './StationListItem.vue'

defineProps<{
  stations: Array<{ id: string; name: string; about: string }>
  selectedStationId?: string
}>()

defineEmits<{
  select: [stationId: string]
}>()
</script>
