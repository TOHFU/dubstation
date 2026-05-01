<template>
  <div class="station-list">
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
<style scoped>
.station-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
</style>
