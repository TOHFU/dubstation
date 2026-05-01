// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-21',
  devtools: { enabled: true },

  // ssr: false,
  modules: ['@nuxt/fonts', 'vuetify-nuxt-module', '@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/i18n'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;900&family=Quicksand:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap',
        },
      ],
    },
  },
  css: [
    'assets/styles/layers.css',
    'vuetify/styles',
    'assets/styles/tailwind.css',
  ],

  vuetify: {
    moduleOptions: {
      styles: { configFile: 'assets/styles/settings.scss' },

      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: true,
        prefersReducedMotion: true,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dubStationTheme',
        utilities: false,
        themes: {
          dubStationTheme: require('./app/plugins/vuetify.theme').dubStationTheme,
          light: require('./app/plugins/vuetify.theme').dubStationTheme,
          dark: {
            dark: true,
            colors: {
              primary: '#E6E5BF',
              background: '#33312E',
              surface: '#22211F',
              error: '#FF6B6B',
              warning: '#FFD166',
              success: '#06D6A0',
              'on-primary': '#FDFCF5',
              'on-background': '#FDFCF5',
              'on-surface': '#FDFCF5',
              'text-primary': '#FDFCF5',
              'text-secondary': '#E6E5BF',
              'text-disabled': '#999691',
              border: '#66635F',
            },
          },
        },
      },
      display: {
        mobileBreakpoint: 'md',
        thresholds: {
          xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560,
        },
      },
    },
  },

  eslint: {
    config: {
      import: {
        package: 'eslint-plugin-import-lite',
      },
    },
  },

  i18n: {
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
  },
})