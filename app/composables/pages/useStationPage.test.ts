import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockStore = {
  stations: [
    { id: 'station-a', name: 'A' },
    { id: 'station-b', name: 'B' },
  ],
  selectedStationId: '',
  selectStation: vi.fn((stationId: string) => {
    mockStore.selectedStationId = stationId
  }),
}

vi.mock('../../stores/app', () => ({
  useAppStore: () => mockStore,
}))

import { useStationPage } from './useStationPage'

describe('useStationPage', () => {
  beforeEach(() => {
    mockStore.selectedStationId = ''
    mockStore.selectStation.mockClear()
    vi.stubGlobal('navigateTo', vi.fn())
  })

  it('ステーション選択時に選択状態を更新して再生画面へ遷移する', () => {
    const { onSelectStation } = useStationPage()

    onSelectStation('station-b')

    expect(mockStore.selectStation).toHaveBeenCalledWith('station-b')
    expect(mockStore.selectedStationId).toBe('station-b')
    expect(navigateTo).toHaveBeenCalledWith('/?autoplay=1')
  })

  it('戻る操作は選択状態に応じて遷移先を切り替える', () => {
    const { goBack } = useStationPage()

    goBack()
    expect(navigateTo).toHaveBeenLastCalledWith('/', { replace: false })

    mockStore.selectedStationId = 'station-a'
    goBack()
    expect(navigateTo).toHaveBeenLastCalledWith('/?autoplay=1')
  })
})
