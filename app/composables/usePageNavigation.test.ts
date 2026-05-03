import { describe, expect, it, vi, beforeEach } from 'vitest'

import { usePageNavigation } from './usePageNavigation'

describe('usePageNavigation', () => {
  beforeEach(() => {
    vi.stubGlobal('navigateTo', vi.fn())
  })

  it('ページ遷移関数が正しいパスを呼ぶ', () => {
    const { goHome, goStationSelection, goAbout, goPlayerAutoplay } = usePageNavigation()

    goHome()
    goHome(true)
    goStationSelection()
    goAbout()
    goPlayerAutoplay()

    expect(navigateTo).toHaveBeenNthCalledWith(1, '/', { replace: false })
    expect(navigateTo).toHaveBeenNthCalledWith(2, '/', { replace: true })
    expect(navigateTo).toHaveBeenNthCalledWith(3, '/station')
    expect(navigateTo).toHaveBeenNthCalledWith(4, '/about')
    expect(navigateTo).toHaveBeenNthCalledWith(5, '/?autoplay=1')
  })
})
