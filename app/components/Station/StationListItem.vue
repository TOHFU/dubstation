<template>
  <div
    class="station-list-item"
    :class="{ 'station-list-item--selected': selected }"
    @click="$emit('select')"
  >
    <div class="station-list-item__thumbnail">
      <img src="/app/assets/icons/dummy-thumbnail.svg" alt="station thumbnail" />
    </div>
    <div class="station-list-item__content">
      <div class="station-list-item__title">{{ station.name }}</div>
      <div class="station-list-item__about">{{ station.about }}</div>
    </div>
    <div class="station-list-item__right-icon">
      <img src="/app/assets/icons/dummy-right-icon.svg" alt="right icon" />
    </div>
  </div>
</template>
<style scoped>
.station-list-item {
  display: flex;
  align-items: center;
  background: #FDFCF5;
  border-radius: 32px;
  box-shadow: 0px 2px 8px 0px rgba(67, 56, 20, 0.08);
  padding: 20px 24px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s, border 0.2s;
  border: 2px solid transparent;
}
.station-list-item--selected {
  border: 2px solid #606042;
  box-shadow: 0px 4px 16px 0px rgba(67, 56, 20, 0.16);
}
.station-list-item__thumbnail {
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  margin-right: 20px;
  border-radius: 16px;
  overflow: hidden;
  background: #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.station-list-item__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.station-list-item__content {
  flex: 1 1 auto;
  min-width: 0;
}
.station-list-item__title {
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1C1917;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.station-list-item__about {
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #606042;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.station-list-item__right-icon {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.station-list-item__right-icon img {
  width: 100%;
  height: 100%;
}
</style>
<script setup lang="ts">
defineProps<{
  station: { id: string; name: string; about: string },
  selected?: boolean
}>()
</script>
