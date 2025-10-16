/**
 * 就地断言一个变量为指定类型
 * @template Type 断言的类型，默认为`any`
 * @param target 待断言的变量
 */
export const assert = <Type = any>(target: any): asserts target is Type => {}