import { onMounted, onBeforeUnmount, useReactive } from 'veact'
import { isBrowser } from './misc/env'
import { off, on } from './misc/event'

export interface WindowScrollHookState {
  x: number
  y: number
}

export const useWindowScroll = (): WindowScrollHookState => {
  const state = useReactive<WindowScrollHookState>({
    x: isBrowser ? window.scrollX : 0,
    y: isBrowser ? window.scrollY : 0,
  })

  const handler = () => {
    const { scrollX, scrollY } = window
    const isChanged = state.x !== scrollX || state.y !== scrollY
    if (isChanged) {
      state.x = scrollX
      state.y = scrollY
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
