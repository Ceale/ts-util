type Success<T> = {
    data: T
    error: null
}

type Failure<E> = {
    data: null
    error: E
}

type Result<T, E extends unknown = Error> = Success<T> | Failure<E>

interface tryCatch {
    <T>(arg: Promise<T>): Promise<Result<T>>
    <V>(arg: (() => V)): Result<V>
}

export const tryCatch: tryCatch = (parameter: any): any => {
    // 处理 Promise
    if (parameter instanceof Promise) {
        return parameter
            .then(data => ({ data, error: null }))
            .catch(error => ({ data: null, error }))
    }
    
    // 处理函数
    if (typeof parameter === "function") {
        try {
            return { data: parameter(), error: null }
        } catch (error) {
            return { data: null, error }
        }
    }
    
    throw new TypeError("参数类型错误，必须是 Promise 或函数")
}

// const a = tryCatch(() => {})
// if (!a.error) {
//     console.log(a.error)
// } else {
//     console.log(a.data)
// }
