<template>
  <div class="flex w-full flex-col items-center justify-start px-4">
    <div class="record-anim relative mb-8 h-40 w-40">
      <svg class="pulse-bg absolute left-0 top-0" width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="80" fill="#FDFCF5" />
        <circle cx="80" cy="80" r="64" fill="#E6E5BF" fill-opacity="0.5" />
      </svg>
      <svg class="vinyl absolute left-8 top-8" width="96" height="96" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="48" r="48" fill="#2C2C2C" />
        <circle cx="48" cy="48" r="36" fill="#1C1917" />
        <circle cx="48" cy="48" r="20" fill="#E6E5BF" stroke="#2C2C2C" stroke-width="4" />
      </svg>
      <svg
        class="vinyl-labels spinning"
        width="48"
        height="32"
        viewBox="0 0 48 32"
        fill="none"
        style="position: absolute; top: 64px; left: 56.5px"
      >
        <text
          x="25"
          y="15"
          text-anchor="middle"
          font-family="'Quicksand','Noto Sans JP',sans-serif"
          font-size="6"
          font-weight="700"
          fill="#2C2C2C"
          letter-spacing="0.08em"
        >
          DUB
          <tspan x="24" dy="8">STATION</tspan>
        </text>
      </svg>
    </div>
    <!-- <div class="loading-title">DUB STATION</div> -->
    <div class="mb-1 text-center text-lg font-bold tracking-[0.02em] text-[rgb(var(--v-theme-accent))]">Tuning in the bass...</div>
    <div class="mb-6 text-center text-sm font-normal leading-[1.5] text-[rgb(var(--v-theme-text-secondary))]">Syncing frequencies for your ultimate<br />soundscape.</div>
    <v-progress-linear indeterminate color="accent" class="mx-auto w-full max-w-80" />
  </div>
</template>
<script setup lang="ts">
// Figmaデザイン準拠 ローディング画面
</script>
<style scoped>
/* .vinyl-labelsはSVG化したため不要 */
.pulse-bg { animation: pulse 2s infinite; }
/* レコード本体とラベルSVG両方にspinningクラスで回転を適用 */
.vinyl,
.vinyl-labels.spinning {
  animation: spin 2s linear infinite;
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
