<template>
  <div class="h-screen flex flex-col bg-[#FDFCF5]">
    <AppBar>
      <span class="text-lg font-bold">DUB STATION</span>
    </AppBar>
    <ErrorDialog v-model="show" @retry="$emit('retry')" @home="$emit('home')">
      <template #title>エラーが発生しました</template>
      <template #message>ネットワーク接続に問題があります。</template>
    </ErrorDialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '~/components/Common/AppBar.vue'
import ErrorDialog from '~/components/Common/ErrorDialog.vue'
const show = ref(true)
</script>
