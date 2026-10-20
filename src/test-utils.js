import { act } from 'react'
import { createRoot } from 'react-dom/client'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

export const render = element => {
  const container = document.createElement('div')
  const root = createRoot(container)
  act(() => {
    root.render(element)
  })
  return {
    container,
    rerender: next =>
      act(() => {
        root.render(next)
      }),
    unmount: () => act(() => root.unmount())
  }
}

export { act }
