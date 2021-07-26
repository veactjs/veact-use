import { ref, useRef } from 'veact';
export var createLoading = function (initState, referencer) {
    if (initState === void 0) { initState = false; }
    if (referencer === void 0) { referencer = ref; }
    var state = referencer(initState);
    var start = function () {
        state.value = true;
    };
    var stop = function () {
        state.value = false;
    };
    var handlePromise = function (promise) {
        start();
        return promise.finally(stop);
    };
    return {
        state: state,
        start: start,
        stop: stop,
        promise: handlePromise,
    };
};
export var useLoading = function (initState) {
    if (initState === void 0) { initState = false; }
    return createLoading(initState, useRef);
};
