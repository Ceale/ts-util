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