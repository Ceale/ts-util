import type { anyobject } from "./type"

type EnumKeyValue<T extends readonly string[]> = {
    [K in T[number] as Uppercase<K>]: K
}

interface EnumMethod<T extends readonly string[]> {
    values(): T
    includes(value: unknown): value is T[number]
}

/**
 * 提取枚举对象中的枚举值
 */
export type EnumOf<T extends Record<string, any>> = Extract<T[keyof T], string>

/**
 * 创建一个枚举对象
 * @param 若干个枚举值，字符串
 * @returns 枚举对象，包含枚举值和枚举方法，枚举键为枚举值的大写
 * 
 * @example
 * const Example = Enum("value_a", "value_b")
 * // {
 * //    VALUE_A: "value_a",
 * //    VALUE_B: "value_b"
 * //    values(): ["value_a", "value_b"],
 * //    includes(value: string): boolean
 * // }
 * 
 */
export const Enum = <T extends readonly string[]>(...values: T) => {
    const obj: anyobject = {}
    values.forEach(value => obj[value.toUpperCase()] = value)
    obj.values = () => values
    obj.includes = (value: string) => values.includes(value)
    return obj as EnumKeyValue<T> & EnumMethod<T>
}