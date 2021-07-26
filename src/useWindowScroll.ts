import { onMounted, onBeforeUnmount, useReactive } from 'veact'
import { isBrowser } from './misc/env'
import { off, on } from './misc/event'

export interface WindowScrollHookState {
  x: number
  y: number
}

export const useWindowScroll = (): WindowScrollHookState => {
  const state = useReactive<WindowScrollHookState>({
    x: isBrowser ? window.pageXOffset : 0,
    y: isBrowser ? window.pageYOffset : 0,
  })

  const handler = () => {
    const { pageXOffset, pageYOffset } = window
    const isChanged = state.x !== pageXOffset || state.y !== pageYOffset
    if (isChanged) {
      state.x = pageXOffset
      state.y = pageYOffset
    }
  }

  onMounted(() => {
    handler()
    on(window, 'scroll', handler, {
      capture: false,
      passive: true,
    })
  })

  onBeforeUnmount(() => {
    off(window, 'scroll', handler)
  })

  return state
}
