<template>
  <v-dialog v-model="modelValue" max-width="360">
    <v-card
      class="flex flex-col items-center rounded-[32px] bg-[rgb(var(--v-theme-soft))] px-6 pb-8 pt-10 shadow-[0px_8px_32px_0px_rgba(67,56,20,0.16)]"
      color="soft"
    >
      <div class="mb-4 flex items-center justify-center">
        <img :src="iconError" alt="エラー" class="mx-auto block h-16 w-16" />
      </div>
      <div class="mb-3 text-center text-2xl font-black leading-8 tracking-[-0.05em] text-[rgb(var(--v-theme-text-primary))]" style="font-family: var(--font-heading)">電波が途切れました</div>
      <div class="mb-6 text-center text-base font-medium leading-6 text-[rgb(var(--v-theme-accent))]">配信ストリームに接続できませんでした。<br>インターネット接続を確認するか、再読み込みしてお試しください。</div>
      <div class="mb-5 flex w-full flex-col gap-4">
        <button
          type="button"
          class="w-full rounded-full bg-[rgb(var(--v-theme-primary))] py-4 font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-on-primary))] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]"
          @click="$emit('retry')"
        >
          再試行
        </button>
        <button
          type="button"
          class="w-full rounded-full border-2 border-[rgb(var(--v-theme-primary))] bg-transparent py-4 font-normal leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-accent))]"
          @click="$emit('home')"
        >
          ホームへ戻る
        </button>
      </div>
      <div class="mt-1 text-center text-sm text-[rgb(var(--v-theme-text-disabled))]">問題が解決しない場合は、サポートまでお問い合わせください。</div>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import iconError from '~/assets/icons/icon-error.svg'

const modelValue = defineModel<boolean>({ required: true })

defineEmits<{
  retry: []
  home: []
}>()
</script>
