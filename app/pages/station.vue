<template>
  <div class="flex min-h-screen flex-col bg-[rgb(var(--v-theme-background))]">
    <StationAppBar title="Select Station" @back="goBack" />

    <!-- Main -->
    <main class="flex flex-col gap-6 px-4 py-6">
      <section class="flex flex-col gap-4" aria-label="Station List Section">
        <!-- セクションヘッダー -->
        <div class="flex items-center justify-between">
          <h2 class="m-0 text-[22px] font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-text-primary))]">All Stations</h2>
          <span class="text-xs font-normal leading-4 tracking-[0.04em] text-[rgb(var(--v-theme-text-secondary))]">{{ onlineCountText }}</span>
        </div>

        <!-- ステーションリスト -->
        <StationList
          :stations="stations"
          :selected-station-id="selectedStationId"
          @select="onSelectStation"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StationAppBar from '../components/Station/StationAppBar.vue'
import StationList from '../components/Station/StationList.vue'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()

const stations = computed(() => appStore.stations)
const selectedStationId = computed(() => appStore.selectedStationId)
const onlineCountText = computed(() => `${stations.value.length} Online`)

function onSelectStation(stationId: string) {
  appStore.selectStation(stationId)
  void navigateTo('/?autoplay=1')
}

function goBack() {
  if (appStore.selectedStationId) {
    void navigateTo('/?autoplay=1')
    return
  }

  void navigateTo('/')
}
</script>
