/**
 * 就地断言一个变量为指定类型
 * @template Type 断言的类型，默认为`any`
 * @param variable 待断言的变量
 */
export const assert = <Type = any>(variable: any): asserts variable is Type => {}

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
export const defineEnum = <T extends string>(...keys: T[]): { [K in T]: K } => {
  return keys.reduce((acc, key) => {
    acc[key] = key
    return acc
  }, {} as any)
}