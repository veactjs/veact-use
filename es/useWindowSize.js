import { onMounted, onBeforeUnmount, useReactive } from 'veact';
import { isBrowser } from './misc/env';
import { off, on } from './misc/event';
export var useWindowSize = function (initialWidth, initialHeight) {
    if (initialWidth === void 0) { initialWidth = Infinity; }
    if (initialHeight === void 0) { initialHeight = Infinity; }
    var state = useReactive({
        width: isBrowser ? window.innerWidth : initialWidth,
        height: isBrowser ? window.innerHeight : initialHeight,
    });
    var handler = function () {
        state.width = window.innerWidth;
        state.height = window.innerHeight;
    };
    onMounted(function () {
        if (isBrowser) {
            on(window, 'resize', handler);
        }
    });
    onBeforeUnmount(function () {
        if (isBrowser) {
            off(window, 'resize', handler);
        }
    });
    return state;
};
