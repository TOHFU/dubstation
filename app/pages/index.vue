
<template>
  <div class="h-screen flex flex-col bg-[#FDFCF5]">
    <AppBar>
      <span class="text-lg font-bold">DUB STATION</span>
    </AppBar>
    <div class="flex-1 flex flex-col items-center justify-center px-4">
      <div class="mb-6 w-full flex flex-col items-center">
        <div class="text-h5 font-bold mb-1">Station Name</div>
        <div class="text-body-1 mb-1">Artist Name</div>
        <div class="text-body-2 text-grey-darken-1 mb-4">Track Title</div>
        <PrimaryButton class="mb-4 w-full max-w-xs" @click="onSelectStation">ラジオ局を選択</PrimaryButton>
      </div>
      <div class="w-full max-w-xs mb-8">
        <ControlKnob label="ボリューム" v-model="volume" :min="0" :max="100" />
        <ControlKnob label="イコライザー" v-model="eq" :min="-12" :max="12" />
        <ControlKnob label="ディレイ" v-model="delay" :min="0" :max="1000" :step="10" />
        <ControlKnob label="リバーブ" v-model="reverb" :min="0" :max="100" />
      </div>
      <div class="flex gap-4 mb-8">
        <EffectButton @play="onPlaySiren">サイレン</EffectButton>
        <EffectButton @play="onPlayBeam1">ビーム1</EffectButton>
        <EffectButton @play="onPlayBeam2">ビーム2</EffectButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AppBar from '~/components/Common/AppBar.vue'
import PrimaryButton from '~/components/Common/PrimaryButton.vue'
import ControlKnob from '~/components/Player/ControlKnob.vue'
import EffectButton from '~/components/Player/EffectButton.vue'

const volume = ref(50)
const eq = ref(0)
const delay = ref(200)
const reverb = ref(20)

function onSelectStation() {
  // 画面遷移ロジックをここに
}
function onPlaySiren() {
  // サイレン効果音再生ロジック
}
function onPlayBeam1() {
  // ビーム1効果音再生ロジック
}
function onPlayBeam2() {
  // ビーム2効果音再生ロジック
}
</script>
