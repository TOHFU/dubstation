import { ref } from 'vue'
import AppBar from '../app/components/Common/AppBar.vue'
import ErrorDialog from '../app/components/Common/ErrorDialog.vue'

export default {
  title: 'Pages/Error State',
  render: () => ({
    components: { AppBar, ErrorDialog },
    setup() {
      const show = ref(true)
      return { show }
    },
    template: `
      <div class='h-screen flex flex-col bg-[#FDFCF5]'>
        <AppBar>
          <span class='text-lg font-bold'>DUB STATION</span>
        </AppBar>
        <ErrorDialog v-model='show'>
          <template #title>エラーが発生しました</template>
          <template #message>ネットワーク接続に問題があります。</template>
        </ErrorDialog>
      </div>
    `
  })
}
