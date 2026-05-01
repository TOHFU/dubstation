<template>
  <div class="station-page">
    <!-- Header / TopAppBar -->
    <header class="station-page__top-bar">
      <div class="station-page__top-bar-inner">
        <button
          class="station-page__back-button"
          type="button"
          aria-label="Back to player"
          @click="goBack"
        >
          <span class="material-symbols-rounded station-page__back-icon" aria-hidden="true">
            arrow_back
          </span>
        </button>
        <h1 class="station-page__title">Select Station</h1>
        <!-- 右側スペーサー(バランス用) -->
        <span class="station-page__top-bar-spacer" aria-hidden="true" />
      </div>
    </header>

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

/* ===== Header / TopAppBar ===== */
.station-page__top-bar {
  background: #E6E5BF;
  box-shadow: 0px 4px 20px 0px rgba(67, 56, 20, 0.08);
}

.station-page__top-bar-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
}

.station-page__back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.station-page__back-icon {
  font-size: 24px;
  line-height: 1;
}

.station-page__title {
  flex: 1;
  text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.025em;
  color: #1C1917;
  margin: 0;
}

.station-page__top-bar-spacer {
  width: 40px;
  flex-shrink: 0;
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
