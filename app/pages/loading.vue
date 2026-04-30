<template>
  <div class="h-screen flex flex-col bg-[#FDFCF5]">
    <AppBar>
      <span class="text-lg font-bold">DUB STATION</span>
    </AppBar>
    <div class="flex-1 flex flex-col items-center justify-center">
      <LoadingSpinner>ラジオ局のストリームを読み込み中...</LoadingSpinner>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppBar from '~/components/Common/AppBar.vue'
import LoadingSpinner from '~/components/Common/LoadingSpinner.vue'
</script>
