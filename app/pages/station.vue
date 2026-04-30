<template>
  <div class="h-screen flex flex-col bg-[#FDFCF5]">
    <AppBar>
      <span class="text-lg font-bold">ラジオ局選択</span>
    </AppBar>
    <div class="flex-1 flex flex-col items-center justify-center px-4">
      <StationList :stations="stations" @select="onSelect" />
    </div>
  </div>
</template>
<script setup lang="ts">
import AppBar from '~/components/Common/AppBar.vue'
import StationList from '~/components/Station/StationList.vue'

const stations = [
  { id: '1', name: 'Dub London', about: 'The urban sound of UK dub and jungle influences.' },
  { id: '2', name: 'Roots FM', about: 'Classic roots reggae and dub.' },
  { id: '3', name: 'Kingston Vibes', about: 'Jamaican classics and new school.' },
]

function onSelect(station) {
  // 選択時の遷移ロジック
}
</script>
