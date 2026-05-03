import { usePageNavigation } from '../usePageNavigation'

export function useAboutPage() {
  const { goHome } = usePageNavigation()

  function goBack() {
    goHome()
  }

  return { goBack }
}
