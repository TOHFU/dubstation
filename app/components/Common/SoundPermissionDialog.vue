<template>
  <v-dialog v-model="modelValue" max-width="356">
    <v-card
      class="flex flex-col items-center rounded-[48px] border border-[rgb(var(--v-theme-border))] bg-[rgb(var(--v-theme-surface))] p-6 shadow-[0_10px_30px_0_rgba(0,0,0,0.06)]"
    >
      <img
        src="/assets/figma-sound-permission/sound-permission-graphic.svg"
        alt="Sound Permission"
        class="mb-0 block h-40 w-32"
      />

      <h2 class="mb-3 text-center text-2xl font-black leading-8 tracking-[-0.05em] text-[rgb(var(--v-theme-text-primary))]" style="font-family: var(--font-heading)">
        音楽の再生を許可しますか？
      </h2>

      <p class="mb-6 text-center text-base font-medium leading-6 text-[rgb(var(--v-theme-accent))]">
        ブラウザの制限により、音声を再生するにはユーザーの許可が必要です。<br>
        「許可して開始」ボタンを押して、ダブ・ステーションの重低音をお楽しみください。
      </p>

      <div class="flex w-full flex-col gap-4">
        <button
          type="button"
          class="w-full rounded-full bg-[rgb(var(--v-theme-primary))] py-4 font-bold leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-on-primary))] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]"
          @click="$emit('allow')"
        >
          許可して開始
        </button>

        <button
          type="button"
          class="w-full rounded-full border-2 border-[rgb(var(--v-theme-primary))] bg-transparent py-4 font-normal leading-7 tracking-[0.04em] text-[rgb(var(--v-theme-accent))]"
          @click="$emit('later')"
        >
          あとで
        </button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>({ required: true })

defineEmits<{
  allow: []
  later: []
}>()
</script>
