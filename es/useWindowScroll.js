import { onMounted, onBeforeUnmount, useReactive } from 'veact';
import { isBrowser } from './misc/env';
import { off, on } from './misc/event';
export var useWindowScroll = function () {
    var state = useReactive({
        x: isBrowser ? window.pageXOffset : 0,
        y: isBrowser ? window.pageYOffset : 0,
    });
    var handler = function () {
        var pageXOffset = window.pageXOffset, pageYOffset = window.pageYOffset;
        var isChanged = state.x !== pageXOffset || state.y !== pageYOffset;
        if (isChanged) {
            state.x = pageXOffset;
            state.y = pageYOffset;
        }
    };
    onMounted(function () {
        handler();
        on(window, 'scroll', handler, {
            capture: false,
            passive: true,
        });
    });
    onBeforeUnmount(function () {
        off(window, 'scroll', handler);
    });
    return state;
};
