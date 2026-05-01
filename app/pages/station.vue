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
          <img :src="backIcon" alt="" width="24" height="24" />
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
          <span class="station-page__section-meta">24 Online</span>
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
import { ref } from 'vue'
import StationList from '../components/Station/StationList.vue'
import backIconSrc from '../assets/icons/dummy-right-icon.svg'

// バック用アイコン(右矢印を左向きに)
const backIcon = backIconSrc

const selectedStationId = ref<string | undefined>(undefined)

const stations = ref([
  {
    id: 'dub-london',
    name: 'Dub London',
    about: 'The urban sound of UK dub and jungle influences.',
  },
  {
    id: 'roots-fm',
    name: 'Roots FM',
    about: 'Authentic island rhythms and heavy low-end.',
  },
  {
    id: 'kingston-vibes',
    name: 'Kingston Vibes',
    about: 'Jamaican classics and new school dub.',
  },
  {
    id: 'dubwise-japan',
    name: 'Dubwise Japan',
    about: 'Japanese roots and dub from the land of the rising sun.',
  },
])

function onSelectStation(stationId: string) {
  selectedStationId.value = stationId
  void navigateTo('/')
}

function goBack() {
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

.station-page__back-button img {
  display: block;
  transform: rotate(180deg);
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
