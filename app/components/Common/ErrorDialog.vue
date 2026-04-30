<template>
  <v-dialog v-model="modelValue" persistent max-width="360">
    <v-card class="error-card" color="#FDFCF5">
      <div class="error-icon-wrapper">
        <img src="/app/assets/icons/icon-error.svg" alt="エラー" class="error-icon" />
      </div>
      <div class="error-title">Oops! Frequency Lost</div>
      <div class="error-message">We couldn't connect to the broadcast stream.<br>Check your internet connection or try refreshing the signal.</div>
      <div class="error-actions">
        <PrimaryButton class="error-btn" @click="$emit('retry')">Try Again</PrimaryButton>
        <SecondaryButton class="error-btn" @click="$emit('home')">Go Home</SecondaryButton>
      </div>
      <div class="error-hint">If the problem persists, please contact support.</div>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import PrimaryButton from './PrimaryButton.vue'
import SecondaryButton from './SecondaryButton.vue'
const modelValue = defineModel<boolean>({ required: true })
</script>

<style scoped>
.error-card {
  border-radius: 32px;
  box-shadow: 0px 8px 32px 0px rgba(67, 56, 20, 0.16);
  padding: 40px 24px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FDFCF5;
}
.error-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}
.error-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto;
  display: block;
}
.error-title {
  font-family: 'Plus Jakarta Sans', 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  color: #1C1917;
  text-align: center;
  margin-bottom: 12px;
  letter-spacing: -0.05em;
}
.error-message {
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #606042;
  text-align: center;
  margin-bottom: 24px;
}
.error-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 20px;
}
.error-btn {
  width: 100%;
}
.error-hint {
  font-family: 'Noto Sans JP', 'Quicksand', sans-serif;
  font-size: 14px;
  color: #A0A0A0;
  text-align: center;
  margin-top: 4px;
}
</style>
