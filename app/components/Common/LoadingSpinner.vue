<template>
  <div class="loading-state">
    <div class="record-anim">
      <svg class="pulse-bg" width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="80" fill="#FDFCF5" />
        <circle cx="80" cy="80" r="64" fill="#E6E5BF" fill-opacity="0.5" />
      </svg>
      <svg class="vinyl" width="96" height="96" viewBox="0 0 96 96" fill="none">
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
    <div class="loading-message">Tuning in the bass...</div>
    <div class="loading-sub">Syncing frequencies for your ultimate<br />soundscape.</div>
    <v-progress-linear indeterminate color="#606042" class="loading-bar" height="6" rounded />
  </div>
</template>
<script setup lang="ts">
// Figmaデザイン準拠 ローディング画面
</script>
<style scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 196px 16px 0 16px;
  width: 100%;
}
.record-anim {
  position: relative;
  width: 160px;
  height: 160px;
  margin-bottom: 32px;
}

/* .vinyl-labelsはSVG化したため不要 */
.pulse-bg {
  position: absolute;
  top: 0;
  left: 0;
  animation: pulse 2s infinite;
}
/* レコード本体とラベルSVG両方にspinningクラスで回転を適用 */
.vinyl,
.vinyl-labels.spinning {
  position: absolute;
  top: 32px;
  left: 32px;
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
.loading-title {
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #606042;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.loading-message {
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #606042;
  margin-bottom: 4px;
  text-align: center;
  letter-spacing: 0.02em;
}
.loading-sub {
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #757575;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.5;
}
.loading-bar {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}
</style>
