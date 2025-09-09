
/**
 * 异步地等待指定时间，基于Promise和setTimeout实现
 * @param time 时长，单位为毫秒
 * @returns void
 * @alias sleepAsync
 * 如果需要同步的等待方法，请使用`sleep`
 */
export const wait = async (time: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * @alias wait
 */
export const sleepAsync = wait

/**
 * 同步地等待指定时间，基于while和Date.now实现
 * 
 * **请慎用该方法，其可能导致cpu占用过高**
 * @param time 时长，单位为毫秒
 * @returns void
 * @alias waitSync
 * 如果需要异步的等待方法，请使用`wait`
 */
export const sleep = (time: number): void => {
    const start = Date.now()
    while (true) if (Date.now() - start >= time) return
}

/**
 * @alias sleep
 */
export const waitSync = sleep