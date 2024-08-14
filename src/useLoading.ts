import { ref, useRef } from 'veact'

export const createLoading = (initState = false, referencer: typeof ref | typeof useRef = ref) => {
  const state = referencer(initState)

  const start = () => {
    state.value = true
  }

  const stop = () => {
    state.value = false
  }

  const handlePromise = <T>(promise: Promise<T>): Promise<T> => {
    start()
    return promise.finally(stop)
  }

  return {
    state,
    start,
    stop,
    promise: handlePromise,
  }
}

export const useLoading = (initState = false) => {
  return createLoading(initState, useRef)
}
