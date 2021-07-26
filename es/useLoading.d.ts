import { ref, useRef } from 'veact';
export declare const createLoading: (initState?: boolean, referencer?: typeof ref | typeof useRef) => {
    state: import("veact").Ref<boolean>;
    start: () => void;
    stop: () => void;
    promise: <T>(promise: Promise<T>) => Promise<T>;
};
export declare const useLoading: (initState?: boolean) => {
    state: import("veact").Ref<boolean>;
    start: () => void;
    stop: () => void;
    promise: <T>(promise: Promise<T>) => Promise<T>;
};
