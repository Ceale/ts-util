
/**
 * 异步地等待指定时间，基于Promise和setTimeout实现
 * @param time 时长，单位为毫秒
 * @returns void
 * @alias sleepAsync
 */
export const wait = async (time: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * 异步地等待指定时间，基于Promise和setTimeout实现
 * @param time 时长，单位为毫秒
 * @returns void
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
 */
export const sleep = (time: number): void => {
    const start = Date.now()
    while (true) if (Date.now() - start >= time) return
}

/**
 * 同步地等待指定时间，基于while和Date.now实现
 * 
 * **请慎用该方法，其可能导致cpu占用过高**
 * @param time 时长，单位为毫秒
 * @returns void
 * @alias sleep
 */
export const waitSync = sleep