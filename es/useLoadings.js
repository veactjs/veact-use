import { useReactive, useComputed, readonly } from 'veact';
/**
 * @example
 *  const loadings = useLoadings('fetchList', 'postForm');
 *  loadings.start('fetchList');
 *  loadings.end('fetchList');
 *  loadings.isLoading('fetchList');
 *  loadings.promise('fetchList', axios.get({ ... }));
 */
export function useLoadings() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    var loadingMap = useReactive(new Map(names.map(function (name) { return [name, false]; })));
    var loadingNames = useComputed(function () {
        return Array.from(loadingMap.keys());
    });
    var isLoading = function (name) { return Boolean(loadingMap.get(name)); };
    var isFinished = function (name) { return !isLoading(name); };
    var isSomeLoading = function () { return loadingNames.value.some(function (name) { return isLoading(name); }); };
    var isAllFinished = function () { return loadingNames.value.every(function (name) { return isFinished(name); }); };
    var setLoading = function (key, value) {
        loadingMap.set(key, value);
    };
    var start = function (name) { return setLoading(name, true); };
    var stop = function (name) { return setLoading(name, false); };
    var add = function (name) {
        if (!loadingMap.has(name)) {
            setLoading(name, false);
        }
    };
    var handlePromise = function (name, promise) {
        start(name);
        promise.finally(function () { return stop(name); });
        return promise;
    };
    return {
        $map: readonly(loadingMap),
        promise: handlePromise,
        set: setLoading,
        start: start,
        stop: stop,
        add: add,
        isLoading: isLoading,
        isFinished: isFinished,
        isSomeLoading: isSomeLoading,
        isAllFinished: isAllFinished,
    };
}
