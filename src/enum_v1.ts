/** 
 * 定义一个枚举类型。
 * 返回一个枚举对象，其中每个键名与值相同。
 * @param keys 若干个枚举的键名
 * 
 * @example
 * const type = defineEnum("A", "B", "C") 
 * type === (typeof type) === {
 *     A: "A",
 *     B: "B",
 *     C: "C"
 * }
 */
export const defineEnum = <T extends string>(...keys: T[]): {
    [K in T]: K
} => keys.reduce((acc, key) => {
    acc[key] = key
    return acc
}, {} as any)

/**
 * 枚举工具函数，为枚举对象提供工具方法
 * @param keys 由 defineEnum 创建的枚举对象
 * @returns 返回一个包含`keys`、`includes`方法的对象
 * 
 * @example
 * const 对吗 = defineEnum("对", "不对")
 * 
 * // 获取所有枚举键
 * Enum(对吗).keys() // ["对", "不对"]
 * 
 * // 检查值是否为有效枚举值
 * Enum(对吗).includes("对") // true
 * Enum(对吗).includes("错") // false
 */
export const Enum = (keys: Record<string, string>) => ({
    keys: (): (keyof typeof keys)[] => Object.keys(keys),
    includes: (key: any) => Object.keys(keys).includes(key)
})

/**
 * 提取枚举的所有键组成联合类型
 * @template E 由 defineEnum 创建的枚举对象
 * @returns 枚举键的联合类型
 * 
 * @example
 * const 对吗 = defineEnum("对", "不对")
 * Enum<typeof 对吗> // "对" | "不对"
 */
export type EnumKeys<E> = E[keyof E]