<template>
  <div class="h-screen flex flex-col bg-[#FDFCF5]">
    <AppBar>
      <span class="text-lg font-bold">DUB STATION</span>
    </AppBar>
    <div class="flex-1 flex flex-col items-center justify-center">
      <v-icon size="56" color="primary" class="mb-4">mdi-radio-off</v-icon>
      <div class="text-h6 mb-4 text-center">ラジオ局が見つかりません</div>
      <PrimaryButton @click="$emit('refresh')">リフレッシュ</PrimaryButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppBar from '~/components/Common/AppBar.vue'
import PrimaryButton from '~/components/Common/PrimaryButton.vue'
</script>
