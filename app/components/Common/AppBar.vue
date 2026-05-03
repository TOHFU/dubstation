<template>
  <header class="app-bar">
    <div class="app-bar__content">
      <div v-if="$slots.leading" class="app-bar__leading">
        <slot name="leading" />
      </div>
      <span class="app-bar__title">
        <slot />
      </span>
      <div v-if="$slots.actions" class="app-bar__actions">
        <slot name="actions" />
      </div>
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
  gap: 12px;
}
.app-bar__leading {
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-bar__title {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.05em;
  color: #1C1917;
  text-transform: uppercase;
  text-align: left;
  vertical-align: middle;
}
.app-bar__actions {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
