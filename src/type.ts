/**
 * 一种介于 `any` 与 `object` 之间的类型
 * - 与 `any` 类似，可以任意访问属性
 * - 与 `object` 类似，排除了原始类型
 */
export type anyobject = Record<any, any>

/**
 * 表示任意的类或构造函数
 */
export type AnyClass = new (...args: any[]) => any

/**
 * 就地断言一个变量为指定类型
 * @template Type 断言的类型，默认为`any`
 * @param variable 待断言的变量
 * @returns 传入的变量，且类型已经被断言为指定类型
 */
export const assert = <Type = any>(variable: any): asserts variable is Type => variable

/**
 * 拓展一个变量的类型
 * @param variable 待拓展的变量
 * @param Type 拓展的类型
 * @returns 传入的变量，且类型被拓展为指定类型
 */
export const expand = <Type>(variable: any): asserts variable is (typeof variable & Type) => variable

/**
 * 强制对象类型中至少包含一个指定的属性。
 * @example
 * ```ts
 * interface User { id: string; name: string; age: number; }
 * // 有效：包含一个或多个属性
 * const update: RequireOne<User> = { name: 'Gemini' };
 * // 错误：不允许空对象
 * const invalid: RequireOne<User> = {}; 
 * ```
 * @template T - 需要处理的基础对象接口。其中不应有可选属性，有可能会导致未预料的情况。
 */
export type RequireOne<T> = {
    [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>
}[keyof T]