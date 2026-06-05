export function usePageNavigation() {
  function goHome(replace = false) {
    void navigateTo('/', { replace })
  }

  function goStationSelection() {
    void navigateTo('/station')
  }

  function goAbout() {
    void navigateTo('/about')
  }

  function goPlayerAutoplay() {
    void navigateTo('/?autoplay=1')
  }

  return {
    goHome,
    goStationSelection,
    goAbout,
    goPlayerAutoplay,
  }
}
