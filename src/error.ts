import type { AnyClass } from "./type"

type Success<T> = {
    data: T
    error: null
} & [
    data: T,
    error: null
]

type Failure<E> = {
    data: null
    error: E
} & [
    data: null,
    error: E
]

type Result<T, E extends unknown = Error> = Success<T> | Failure<E>

interface tryCatch {
    /** 捕获所有 */
    <T>(func: (() => T)): Result<T>
    <T>(asyncFunc: Promise<T>): Promise<Result<T>>
    /** 捕获指定 */
    <T, E extends AnyClass>(func: (() => T), catchClass: E): Result<T, InstanceType<E>>
    <T, E extends AnyClass>(func: Promise<T>, catchClass: E): Promise<Result<T, InstanceType<E>>>
}

/**
 * 尝试执行一个函数或Promise，返回一个对象，其中包含执行结果或被捕获的错误
 * 
 * 该对象同时支持对象属性访问(.data/.error)和数组索引访问([0]/[1])两种方式
 * 
 * @param func 一个函数或者Promise对象
 * @param catchClass 要捕获的错误类型（含子类），如果不指定，则捕获所有错误；如指定，则为被捕获的错误将继续上抛
 * @returns 返回一个如后方例的对象`{ data, error } & [ data, error ]`
 * 
 * @example
 * tryCatch(() => func(...))
 * // => [data, error] & {data, error}
 * // data: func的返回值，error：函数执行过程中发生的错误
 * 
 * 
 * @example
 * tryCatch(() => func(...), TypeError)
 * // => [data, error] & {data, error}
 * // data: func的返回值，error：函数执行过程中，发生的TypeError或其子类错误
 * 
 * @example
 * await tryCatch(asyncFunc(...))
 * // => [data, error] & {data, error}
 * // data: 异步函数asyncFunc的返回值，error：asyncFunc执行过程中发生的错误
 */
export const tryCatch: tryCatch = (func: Function | Promise<any>, catchClass?: any): any => {
    
    // 处理函数
    if (typeof func === "function") {
        try {
            const data = func()
            return Object.assign([ data, null ], { data, error: null })
        } catch (error) {
            if (!catchClass || error instanceof catchClass) return Object.assign([ null, error ], { data: null, error })
            throw error
        }
    } else {
        // 处理 Promise，兼容第三方Promise实现
        return func
            .then(data => Object.assign([ data, null ], { data, error: null }))
            .catch(error => {
                if (!catchClass || error instanceof catchClass) return Object.assign([ null, error ], { data: null, error })
                throw error
            })

    }
}