import { computed } from 'vue'
import { useAppStore } from '../../stores/app'
import { usePageNavigation } from '../usePageNavigation'

export function useStationPage() {
  const appStore = useAppStore()
  const {
    goPlayerAutoplay,
    goHome,
  } = usePageNavigation()

  const stations = computed(() => appStore.stations)
  const selectedStationId = computed(() => appStore.selectedStationId)
  const onlineCountText = computed(() => `${stations.value.length} Online`)

  function onSelectStation(stationId: string) {
    appStore.selectStation(stationId)
    goPlayerAutoplay()
  }

  function goBack() {
    if (appStore.selectedStationId) {
      goPlayerAutoplay()
      return
    }

    goHome()
  }

  return {
    stations,
    selectedStationId,
    onlineCountText,
    onSelectStation,
    goBack,
  }
}
