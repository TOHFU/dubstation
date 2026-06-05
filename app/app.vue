<template>
  <v-app @contextmenu.prevent>
    <v-main>
      <nuxt-page :transition="pageTransition" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  const route = useRoute()

  const pageTransition = computed(() => ({
    name: route.path === '/' ? 'page-slide-back' : 'page-slide-forward',
    mode: 'out-in' as const,
  }))
</script>
