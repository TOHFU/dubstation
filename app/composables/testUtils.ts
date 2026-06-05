import { createApp, type Component } from 'vue'

export function runComposable<T>(useComposable: () => T) {
  let value: T | null = null

  const Root: Component = {
    setup() {
      value = useComposable()
      return () => null
    },
  }

  const app = createApp(Root)
  const el = document.createElement('div')
  app.mount(el)

  return {
    value: value as T,
    unmount: () => app.unmount(),
  }
}
