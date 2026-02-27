/**
 * 提取枚举对象中的枚举值
 */
export type EnumOf<T extends Record<string, any>> = Extract<T[keyof T], string | number>

/**
 * 创建一个枚举对象
 * @param 一个枚举定义对象，键为枚举名，值为字符串或数字
 * @returns 枚举对象，包含原始键值对和枚举方法
 * @example
 * const Example = Enum({ ValueA: "value_a", ValueB: "value_b" })
 * // {
 * //    ValueA: "value_a",
 * //    ValueB: "value_b",
 * //    values(): ["value_a", "value_b"],
 * //    includes(value: any): boolean
 * // }
 * */
export const Enum = <const T extends Record<string, string | number>>(definition: T) => {
    const values = Object.values(definition)
    const methods = {
        values: () => values as T[keyof T][],
        includes: (value: any): value is T[keyof T] => values.includes(value)
    }
    Object.defineProperties(methods, {
        values: { enumerable: false },
        includes: { enumerable: false }
    })
    return Object.freeze(Object.assign(definition, methods))
}