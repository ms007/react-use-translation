import { act, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true

export const render = (element: ReactNode) => {
  const container = document.createElement('div')
  const root = createRoot(container)
  act(() => {
    root.render(element)
  })
  return {
    container,
    rerender: (next: ReactNode) =>
      act(() => {
        root.render(next)
      }),
    unmount: () => act(() => root.unmount())
  }
}

export { act }
