/**
 * @example
 *  const loadings = useLoadings('fetchList', 'postForm');
 *  loadings.start('fetchList');
 *  loadings.end('fetchList');
 *  loadings.isLoading('fetchList');
 *  loadings.promise('fetchList', axios.get({ ... }));
 */
export declare function useLoadings(...names: Array<string>): {
    $map: ReadonlyMap<string, boolean>;
    promise: <T>(name: string, promise: Promise<T>) => Promise<T>;
    set: (key: string, value: boolean) => void;
    start: (name: string) => void;
    stop: (name: string) => void;
    add: (name: string) => void;
    isLoading: (name: string) => boolean;
    isFinished: (name: string) => boolean;
    isSomeLoading: () => boolean;
    isAllFinished: () => boolean;
};
