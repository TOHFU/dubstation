// Utilities
import { defineStore } from 'pinia'
import { STATIONS } from '../../shared/stations'

type PlaybackState = 'idle' | 'loading' | 'playing' | 'error'

type StreamMetadataResponse = {
  stationId: string
  songName: string | null
  artistName: string | null
  isAvailable: boolean
}

export const useAppStore = defineStore('app', {
  state: () => ({
    stations: STATIONS,
    selectedStationId: '',
    playbackState: 'idle' as PlaybackState,
    errorMessage: '',
    songName: null as string | null,
    artistName: null as string | null,
    hasOpenedSoundPermissionDialog: false,
  }),
  getters: {
    selectedStation: state => state.stations.find(station => station.id === state.selectedStationId),
    streamProxyUrl(): string {
      if (!this.selectedStationId) {
        return ''
      }

      return `/api/stream?stationId=${encodeURIComponent(this.selectedStationId)}`
    },
  },
  actions: {
    initialize() {
      // 初回表示は無選択で開始する
    },
    selectStation(stationId: string) {
      const isValidStation = this.stations.some(station => station.id === stationId)

      if (!isValidStation) {
        return
      }

      this.selectedStationId = stationId
      this.clearMetadata()
    },
    clearSelectedStation() {
      this.selectedStationId = ''
      this.clearMetadata()
    },
    clearError() {
      this.errorMessage = ''

      if (this.playbackState === 'error') {
        this.playbackState = 'idle'
      }
    },
    clearMetadata() {
      this.songName = null
      this.artistName = null
    },
    markSoundPermissionDialogOpened() {
      this.hasOpenedSoundPermissionDialog = true
    },
    async startPlayback(audio: HTMLAudioElement | null) {
      if (!audio || !this.streamProxyUrl) {
        this.playbackState = 'error'
        this.errorMessage = '再生対象のラジオ局が見つかりません。'
        return
      }

      this.playbackState = 'loading'
      this.errorMessage = ''

      try {
        audio.pause()
        audio.src = this.streamProxyUrl
        audio.crossOrigin = 'anonymous'
        audio.load()
        await audio.play()
        this.playbackState = 'playing'
        await this.fetchMetadata()
      }
      catch (error) {
        this.playbackState = 'error'
        this.errorMessage = error instanceof Error ? error.message : 'ストリーム再生の開始に失敗しました。'
        this.clearMetadata()
      }
    },
    stopPlayback(audio: HTMLAudioElement | null) {
      if (!audio) {
        return
      }

      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      this.playbackState = 'idle'
      this.clearMetadata()
    },
    pausePlayback(audio: HTMLAudioElement | null) {
      if (!audio) {
        return
      }

      audio.pause()

      if (this.playbackState === 'playing') {
        this.playbackState = 'idle'
      }
    },
    async resumePlayback(audio: HTMLAudioElement | null) {
      if (!audio || !this.selectedStationId) {
        return
      }

      if (!audio.src) {
        await this.startPlayback(audio)
        return
      }

      this.playbackState = 'loading'

      try {
        await audio.play()
        this.playbackState = 'playing'
        await this.fetchMetadata()
      }
      catch (error) {
        this.playbackState = 'error'
        this.errorMessage = error instanceof Error ? error.message : 'ストリーム再生の再開に失敗しました。'
        this.clearMetadata()
      }
    },
    async retryPlayback(audio: HTMLAudioElement | null) {
      await this.startPlayback(audio)
    },
    markPlaybackError(message: string) {
      this.playbackState = 'error'
      this.errorMessage = message
      this.clearMetadata()
    },
    async fetchMetadata() {
      if (!this.selectedStationId) {
        this.clearMetadata()
        return
      }

      try {
        const response = await $fetch<StreamMetadataResponse>('/api/metadata', {
          query: {
            stationId: this.selectedStationId,
          },
        })

        // 取得中に局が切り替わっていた場合は破棄
        if (response.stationId !== this.selectedStationId) {
          return
        }

        this.songName = response.songName
        this.artistName = response.artistName
      }
      catch {
        this.clearMetadata()
      }
    },
  },
})
