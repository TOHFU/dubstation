<template>
  <div class="about-page">
    <AppBar>
      <template #leading>
        <button
          class="about-page__back-button"
          type="button"
          aria-label="Back to player"
          @click="goBack"
        >
          <span class="material-symbols-rounded about-page__back-icon" aria-hidden="true">
            arrow_back
          </span>
        </button>
      </template>
      About
    </AppBar>

    <main class="about-page__main">
      <section class="about-page__branding" aria-label="App Branding">
        <img
          src="/assets/image/lion.png"
          alt="DUB STATION logo"
          class="about-page__branding-logo"
        />
        <h2 class="about-page__branding-title">DUB STATION</h2>
      </section>

      <section class="about-page__card" aria-label="About Description">
        <div class="about-page__card-container">
          <p>
            このアプリはネットラジオをストリーミングし、リアルタイムにエフェクトをかけることができるWebアプリです。ブラウザベースで動きますが、ホーム画面に追加していただくことで、より快適にご利用いただけます。
          </p>
          <p>
            このアプリは個人開発のもと、無料で提供しています。
          </p>

          <div class="about-page__separator" />

          <p class="about-page__muted">サウンド：OtoLogic</p>

          <div class="about-page__footer">
            <a
              href="https://tohfu-tronica.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              class="about-page__link"
            >
              tohfu-tronica.netlify.app
            </a>
            <p class="about-page__copyright">© tohfu-tronica</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="about-page__version-wrap">
      <p class="about-page__version">Version 1.0.4 (Stable)</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppBar from '../components/Common/AppBar.vue'

function goBack() {
  void navigateTo('/')
}
</script>

<style scoped>
.about-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #fdfcf5;
}

.about-page__back-button {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.about-page__back-icon {
  font-size: 24px;
  line-height: 1;
}

.about-page__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
}

.about-page__branding {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 32px;
}

.about-page__branding-logo {
  width: 96px;
  height: auto;
  display: block;
}

.about-page__branding-title {
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.05em;
  color: #1c1917;
  text-transform: uppercase;
}

.about-page__card {
  width: 100%;
  max-width: 358px;
  border-radius: 32px;
  background: #fff;
  box-shadow: 0px 4px 20px 0px rgba(67, 56, 20, 0.06);
  padding: 32px;
  box-sizing: border-box;
}

.about-page__card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.about-page__card-container p {
  margin: 0;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.04em;
  color: #33312e;
  text-align: center;
}

.about-page__separator {
  width: 100%;
  border-top: 1px solid rgba(224, 223, 213, 0.5);
  margin-top: -8px;
  padding-top: 16px;
}

.about-page__card-container .about-page__muted {
  color: #66635f;
}

.about-page__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
}

.about-page__link {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.04em;
  color: #606042;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.about-page__copyright {
  margin: 0;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.04em;
  color: #999691;
}

.about-page__version-wrap {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.about-page__version {
  margin: 0;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.04em;
  color: #999691;
}
</style>
