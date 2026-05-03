<template>
  <div class="station-page">
    <StationAppBar title="Select Station" @back="goBack" />

    <!-- Main -->
    <main class="station-page__main">
      <section class="station-page__section" aria-label="Station List Section">
        <!-- セクションヘッダー -->
        <div class="station-page__section-header">
          <h2 class="station-page__section-title">All Stations</h2>
          <span class="station-page__section-meta">{{ onlineCountText }}</span>
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

<style scoped>
.station-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FDFCF5;
}

/* ===== Main ===== */
.station-page__main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 16px;
}

/* ===== Section ===== */
.station-page__section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.station-page__section-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.station-page__section-title {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 0.04em;
  color: #33312E;
  margin: 0;
}

.station-page__section-meta {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.04em;
  color: #66635F;
}
</style>
