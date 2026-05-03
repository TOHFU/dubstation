import { ref } from 'vue'

type CopyTrackInfoParams = {
  artistName?: string | null
  songName?: string | null
}

export function useClipboardToast() {
  const showCopiedToast = ref(false)

  async function copyTrackInfo({ artistName, songName }: CopyTrackInfoParams) {
    const currentSongName = songName?.trim()
    const currentArtistName = artistName?.trim()

    if (!currentSongName || !currentArtistName || typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }

    const copyText = `${currentArtistName} / ${currentSongName}`

    try {
      await navigator.clipboard.writeText(copyText)
      showCopiedToast.value = true
    }
    catch {
      // クリップボード書き込みが制限されている場合は何もしない。
    }
  }

  return {
    showCopiedToast,
    copyTrackInfo,
  }
}
