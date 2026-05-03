import { describe, expect, it, vi, beforeEach } from 'vitest'

import { useClipboardToast } from './useClipboardToast'

describe('useClipboardToast', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('曲情報をコピーしてトーストを表示する', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    const { showCopiedToast, copyTrackInfo } = useClipboardToast()
    await copyTrackInfo({ artistName: 'Artist', songName: 'Song' })

    expect(writeText).toHaveBeenCalledWith('Artist / Song')
    expect(showCopiedToast.value).toBe(true)
  })

  it('曲情報が不足している場合はコピーしない', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    const { showCopiedToast, copyTrackInfo } = useClipboardToast()
    await copyTrackInfo({ artistName: 'Artist', songName: '' })

    expect(writeText).not.toHaveBeenCalled()
    expect(showCopiedToast.value).toBe(false)
  })
})
