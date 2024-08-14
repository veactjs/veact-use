/**
 * Void function
 */
export type Fn = () => void

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

export type Arrayable<T> = T[] | T

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never

export type Awaitable<T> = Promise<T> | T

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never

export type Promisify<T> = Promise<Awaited<T>>

export type PromisifyFn<T extends AnyFn> = (...args: ArgumentsType<T>) => Promisify<ReturnType<T>>

// https://stackoverflow.com/questions/55541275/typescript-check-for-the-any-type
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
/**
 * will return `true` if `T` is `any`, or `false` otherwise
 */
export type IsAny<T> = IfAny<T, true, false>
