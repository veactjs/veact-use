import { useReactive, useComputed, readonly } from 'veact'

/**
 * @example
 *  const loadings = useLoadings('fetchList', 'postForm');
 *  loadings.start('fetchList');
 *  loadings.end('fetchList');
 *  loadings.isLoading('fetchList');
 *  loadings.promise('fetchList', axios.get({ ... }));
 */
export function useLoadings(...names: Array<string>) {
  const loadingMap = useReactive(new Map<string, boolean>(names.map((name) => [name, false])))
  const loadingNames = useComputed(() => {
    return Array.from(loadingMap.keys())
  })

  const isLoading = (name: string): boolean => Boolean(loadingMap.get(name))
  const isFinished = (name: string): boolean => !isLoading(name)
  const isSomeLoading = () => loadingNames.value.some((name) => isLoading(name))
  const isAllFinished = () => loadingNames.value.every((name) => isFinished(name))

  const setLoading = (key: string, value: boolean) => {
    loadingMap.set(key, value)
  }

  const start = (name: string) => setLoading(name, true)
  const stop = (name: string) => setLoading(name, false)
  const add = (name: string): void => {
    if (!loadingMap.has(name)) {
      setLoading(name, false)
    }
  }

  const handlePromise = <T>(name: string, promise: Promise<T>): Promise<T> => {
    start(name)
    promise.finally(() => stop(name))
    return promise
  }

  return {
    $map: readonly(loadingMap),
    promise: handlePromise,
    set: setLoading,
    start,
    stop,
    add,
    isLoading,
    isFinished,
    isSomeLoading,
    isAllFinished,
  }
}
