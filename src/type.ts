/**
 * 就地断言一个变量为指定类型
 * @template Type 断言的类型，默认为`any`
 * @param variable 待断言的变量
 */
export const assert = <Type = any>(variable: any): asserts variable is Type => {}