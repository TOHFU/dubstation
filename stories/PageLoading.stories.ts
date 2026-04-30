import AppBar from '../app/components/Common/AppBar.vue'
import LoadingSpinner from '../app/components/Common/LoadingSpinner.vue'

export default {
  title: 'Pages/Loading State',
  render: () => ({
    components: { AppBar, LoadingSpinner },
    template: `
      <div class='h-screen flex flex-col bg-[#FDFCF5]'>
        <AppBar>
          <span class='text-lg font-bold'>DUB STATION</span>
        </AppBar>
        <div class='flex-1 flex flex-col items-center justify-center'>
          <LoadingSpinner>ラジオ局のストリームを読み込み中...</LoadingSpinner>
        </div>
      </div>
    `
  })
}
