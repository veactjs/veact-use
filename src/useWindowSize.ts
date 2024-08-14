import { onMounted, onBeforeUnmount, useReactive } from 'veact'
import { isBrowser } from './misc/env'
import { off, on } from './misc/event'

export const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const state = useReactive<{ width: number; height: number }>({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
  })

  const handler = () => {
    state.width = window.innerWidth
    state.height = window.innerHeight
  }

  onMounted((): (() => void) | void => {
    if (isBrowser) {
      on(window, 'resize', handler)
    }
  })

  onBeforeUnmount(() => {
    if (isBrowser) {
      off(window, 'resize', handler)
    }
  })

  return state
}
