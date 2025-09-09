/**
 * 将传入的函数变为防抖版本
 * 
 * 在间隔低于`delay`连续触发函数时，只会执行最后一次调用，并在最后一次调用后延时`delay`执行
 * @param func 原始函数
 * @param delay 防抖时长，毫秒
 * @returns 带防抖的函数
 */
export const debounce = <F extends (...args: any[]) => void>(
    func: F,
    delay: number
): ((...args: Parameters<F>) => void) => {
    let timer: ReturnType<typeof setTimeout> | null = null

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        // 每次调用时都清除之前的计时器
        if (timer) {
            clearTimeout(timer)
        }

        // 重新设置一个新的计时器
        timer = setTimeout(() => {
            // 在延迟时间结束后，调用原始函数
            func.apply(this, args)
        }, delay)
    }
}
/**
 * 将传入的函数变为节流版本
 * 
 * 函数将在首次调用后执行，首次调用后的`delay`内，如重复调用，
 * 
 * 则函数将以最后一次调用的参数，在首次调用后延迟`delay`后执行
 * @param func 原始函数
 * @param delay 节流时长，毫秒
 * @returns 带节流的函数
 */
export const throttle = <F extends (...args: any[]) => void>(
    func: F,
    delay: number
): ((...args: Parameters<F>) => void) => {
    let timer = false
    let lastArgs: null | Parameters<F> = null

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        // 每次调用时都清除之前的计时器
        if (timer) {
            lastArgs = args
            return
        }
        func.apply(this, args)
        timer = true

        // 重新设置一个新的计时器
        setTimeout(() => {
            // 在延迟时间结束后，调用原始函数
            if (lastArgs) {
                func.apply(this, lastArgs)
                lastArgs = null
            }
            timer = false
        }, delay)
    }
}