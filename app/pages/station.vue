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
import StationAppBar from '../components/Station/StationAppBar.vue'
import StationList from '../components/Station/StationList.vue'
import { useStationPage } from '../composables/pages/useStationPage'

const {
  stations,
  selectedStationId,
  onlineCountText,
  onSelectStation,
  goBack,
} = useStationPage()
</script>
