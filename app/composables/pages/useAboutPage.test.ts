import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAboutPage } from './useAboutPage'

describe('useAboutPage', () => {
  beforeEach(() => {
    vi.stubGlobal('navigateTo', vi.fn())
  })

  it('goBack はホームへ遷移する', () => {
    const { goBack } = useAboutPage()

    goBack()

    expect(navigateTo).toHaveBeenCalledWith('/', { replace: false })
  })
})
