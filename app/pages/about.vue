<template>
  <div class="flex min-h-dvh flex-col bg-[rgb(var(--v-theme-background))]">
    <AppBar>
      <template #leading>
        <button
          class="inline-flex h-10 w-10 cursor-pointer items-center justify-center border-none bg-transparent p-0"
          type="button"
          aria-label="Back to player"
          @click="goBack"
        >
          <span class="material-symbols-rounded text-2xl leading-none" aria-hidden="true">
            arrow_back
          </span>
        </button>
      </template>
      About
    </AppBar>

    <main class="flex flex-1 flex-col items-center px-4 py-8">
      <section class="flex flex-col items-center gap-4 pb-8" aria-label="App Branding">
        <img
          src="/assets/image/lion.png"
          alt="DUB STATION logo"
          class="block w-24 h-auto"
        />
        <h2 class="m-0 font-heading text-4xl font-bold uppercase leading-[44px] tracking-[-0.05em] text-[rgb(var(--v-theme-text-primary))]">DUB STATION</h2>
      </section>

      <section class="w-full max-w-[358px] box-border rounded-[32px] bg-white p-8 shadow-[0px_4px_20px_0px_rgba(67,56,20,0.06)]" aria-label="About Description">
        <div class="flex flex-col items-center gap-6">
          <p class="m-0 text-center text-base font-normal leading-[26px] tracking-[0.04em] text-[rgb(var(--v-theme-text-primary))]">
            このアプリはネットラジオをストリーミングし、リアルタイムにエフェクトをかけることができるWebアプリです。ブラウザベースで動きますが、ホーム画面に追加していただくことで、より快適にご利用いただけます。
          </p>
          <p class="m-0 text-center text-base font-normal leading-[26px] tracking-[0.04em] text-[rgb(var(--v-theme-text-primary))]">
            このアプリは個人開発のもと、無料で提供しています。
          </p>

          <div class="mt-[-8px] w-full border-t border-[rgba(224,223,213,0.5)] pt-4" />

          <p class="m-0 text-center text-base font-normal leading-[26px] tracking-[0.04em] text-[rgb(var(--v-theme-text-secondary))]">サウンド：OtoLogic</p>

          <div class="flex flex-col items-center gap-2 pt-2">
            <a
              href="https://tohfu-tronica.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              class="text-base font-bold leading-[26px] tracking-[0.04em] text-[rgb(var(--v-theme-accent))] underline [text-underline-offset:3px]"
            >
              tohfu-tronica.netlify.app
            </a>
            <p class="m-0 text-xs font-medium leading-4 tracking-[0.04em] text-[rgb(var(--v-theme-text-disabled))]">© tohfu-tronica</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="flex justify-center py-6">
      <p class="m-0 text-xs font-normal leading-4 tracking-[0.04em] text-[rgb(var(--v-theme-text-disabled))]">Version 1.0.4 (Stable)</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppBar from '../components/Common/AppBar.vue'

function goBack() {
  void navigateTo('/')
}
</script>
