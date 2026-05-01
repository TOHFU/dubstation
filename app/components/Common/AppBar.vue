<template>
  <header class="app-bar">
    <div class="app-bar__content">
      <span class="app-bar__title">
        <slot />
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
// 共通AppBar。タイトルやアクションはスロットで差し替え
</script>

<style scoped>
.app-bar {
  border-radius: 0 0 24px 24px;
  box-shadow: 0px 4px 20px 0px rgba(67, 56, 20, 0.08);
  height: 64px;
  background: #E6E5BF;
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: relative;
}
.app-bar__content {
  width: 100%;
  display: flex;
  align-items: center;
}
.app-bar__title {
  font-family: 'Plus Jakarta Sans', 'Noto Sans JP', sans-serif;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.05em;
  color: #1C1917;
  text-transform: uppercase;
  text-align: left;
  vertical-align: middle;
}
</style>
