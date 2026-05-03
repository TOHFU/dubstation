<template>
  <v-dialog v-model="modelValue" persistent max-width="356">
    <v-card class="sound-permission-dialog" color="#FFFFFF">
      <img
        src="/assets/figma-sound-permission/sound-permission-graphic.svg"
        alt="Sound Permission"
        class="sound-permission-dialog__graphic"
      />

      <h2 class="sound-permission-dialog__title">
        音楽の再生を許可しますか？
      </h2>

      <p class="sound-permission-dialog__description">
        ブラウザの制限により、音声を再生するにはユーザーの許可が必要です。<br>
        「許可して開始」ボタンを押して、ダブ・ステーションの重低音をお楽しみください。
      </p>

      <div class="sound-permission-dialog__actions">
        <button
          type="button"
          class="sound-permission-dialog__button sound-permission-dialog__button--primary"
          @click="$emit('allow')"
        >
          許可して開始
        </button>

        <button
          type="button"
          class="sound-permission-dialog__button sound-permission-dialog__button--secondary"
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

<style scoped>
.sound-permission-dialog {
  border-radius: 48px;
  border: 1px solid #f1ede9;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.06);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sound-permission-dialog__graphic {
  width: 128px;
  height: 160px;
  display: block;
  margin-bottom: 0;
}

.sound-permission-dialog__title {
  margin: 0 0 16px;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 35px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #33312e;
}

.sound-permission-dialog__description {
  margin: 0 0 32px;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.04em;
  text-align: center;
  color: #66635f;
}

.sound-permission-dialog__actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sound-permission-dialog__button {
  width: 100%;
  border-radius: 9999px;
  padding: 16px 0;
  font-family: 'Noto Sans JP', sans-serif;
}

.sound-permission-dialog__button--primary {
  border: none;
  background: #e6e5bf;
  color: #1c1d06;
  font-weight: 700;
  box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

</style>
