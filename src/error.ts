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
    <T>(arg: Promise<T>): Promise<Result<T>>
    <V>(arg: (() => V)): Result<V>
}

/**
 * 尝试执行一个函数或Promise，返回一个包含执行结果或错误信息的复合对象
 * 
 * 该对象同时支持对象属性访问(.data/.error)和数组索引访问([0]/[1])两种方式
 * 
 * @param parameter 一个函数或者Promise对象
 * @returns 返回参数中，data和[0]是函数的返回值或是Promise的解析结果，error和[1]是错误对象。两者将有一为`null`
 * 
 * @example
 * tryCatch(() => func(...))
 * // => [data, error] & {data, error}
 * // data: func的返回值，error：函数执行过程中发生的错误
 * 
 * @example
 * await tryCatch(asyncFunc(...))
 * // => [data, error] & {data, error}
 * // data: asyncFunc的返回值，error：asyncFunc执行过程中发生的错误
 */
export const tryCatch: tryCatch = (parameter: any): any => {
    
    // 处理 Promise
    if (parameter && 
        typeof parameter.then === 'function' && 
        typeof parameter.catch === 'function' && 
        typeof parameter.finally === 'function'
    ) {
        return (parameter as Promise<any>)
            .then(data => Object.assign([ data, null ], { data, error: null }))
            .catch(error => Object.assign([ null, error ], { data: null, error }))
    }
    
    // 处理函数
    if (typeof parameter === "function") {
        try {
            const data = parameter()
            return Object.assign([ data, null ], { data, error: null })
        } catch (error) {
            return Object.assign([ null, error ], { data: null, error })
        }
    }
    
    throw new TypeError("参数类型错误，应为 Promise 或函数")
}

// import fs from "node:fs/promises"
// (async () => {
//     const a = await tryCatch(fs.stat("a.txt"))
//     console.log(a)
// })()
// console.log(a)
// if (!a.error) {
//     console.log(a.error)
// } else {
//     console.log(a.data)
// }
