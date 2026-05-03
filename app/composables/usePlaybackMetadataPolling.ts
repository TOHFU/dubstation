import { onBeforeUnmount, watch, type Ref } from 'vue'

type FetchMetadataFn = () => Promise<void>

export function usePlaybackMetadataPolling(
  playbackState: Ref<string>,
  fetchMetadata: FetchMetadataFn,
  intervalMs = 20000,
) {
  let metadataPollingTimer: ReturnType<typeof setInterval> | null = null

  function startMetadataPolling() {
    stopMetadataPolling()

    metadataPollingTimer = setInterval(() => {
      void fetchMetadata()
    }, intervalMs)
  }

  function stopMetadataPolling() {
    if (!metadataPollingTimer) {
      return
    }

    clearInterval(metadataPollingTimer)
    metadataPollingTimer = null
  }

  watch(playbackState, (state) => {
    if (state === 'playing') {
      startMetadataPolling()
      return
    }

    stopMetadataPolling()
  }, { immediate: true })

  onBeforeUnmount(() => {
    stopMetadataPolling()
  })

  return {
    startMetadataPolling,
    stopMetadataPolling,
  }
}
