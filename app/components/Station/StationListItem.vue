<template>
  <div
    class="station-list-item"
    :class="{ 'station-list-item--selected': selected }"
    @click="$emit('select')"
  >
    <div class="station-list-item__thumbnail">
      <img src="/assets/image/lion.png" alt="station thumbnail" />
    </div>
    <div class="station-list-item__content">
      <div class="station-list-item__title">{{ station.name }}</div>
      <div class="station-list-item__about">{{ station.about }}</div>
    </div>
    <button class="station-list-item__right-icon" type="button" aria-label="Select station">
      <span class="material-symbols-rounded station-list-item__play-icon" aria-hidden="true">
        play_circle
      </span>
    </button>
  </div>
</template>
<style scoped>
.station-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 32px;
  padding: 24px;
  cursor: pointer;
  transition: box-shadow 0.2s, border 0.2s;
  border: 2px solid transparent;
  min-height: 116px;
  box-sizing: border-box;
}
.station-list-item--selected {
  border: 2px solid #606042;
  box-shadow: 0px 4px 20px 0px rgba(67, 56, 20, 0.12), 0px 0px 0px 4px rgba(230, 229, 191, 0.3);
}
.station-list-item__thumbnail {
  flex: 0 0 50px;
  width: 50px;
  height: 64px;
  border-radius: 32px;
  overflow: hidden;
  background: #E0DFD5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.station-list-item__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.station-list-item__content {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 16px;
}
.station-list-item__title {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #33312E;
}
.station-list-item__about {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.04em;
  color: #66635F;
}
.station-list-item__right-icon {
  flex: 0 0 32px;
  width: 32px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.station-list-item__play-icon {
  font-size: 32px;
  line-height: 1;
  color: #606042;
}
</style>
<script setup lang="ts">
defineProps<{
  station: { id: string; name: string; about: string }
  selected?: boolean
}>()

defineEmits<{
  select: []
}>()
</script>
