import type { CSSProperties } from "vue"
import type { AtRules } from "csstype"

export namespace css {
    
    type RuleValue = string & { RuleValue: never }
    type RuleBlockValue = string & { RuleBlockValue: never }
    type AtValue = string & { AtValue: never }

    /**
     * 从一个样式对象，创建一个 CSS 规则字符串
     * @param rule 一个样式规则对象，使用 Vue 的 `CSSProperties` 类型，同时允许自定义属性
     * @returns 返回类型为`RuleValue`的字符串，可以传入`css.selector()`和`css.at()`
     * 
     * @example
     * css.rule({
     *     backgroundColor: "red",
     *     fontSize: "16px",
     *     "--my-custom-var": "blue"
     * })
     */
    export const rule = (rule: CSSProperties & { [key: string]: any }): RuleValue => {
        return Object.entries(rule)
            .map(([key, value]) => `${key.toKebabCase()}: ${value};`)
            .join("\n") as RuleValue
    }

    /**
     * 根据选择器和 CSS 规则，创建一个 CSS 规则块字符串
     * @param selector CSS 选择器字符串
     * @param rule CSS 规则，类型为`RuleValue`的字符串
     * @returns 返回类型为`RuleBlockValue`的字符串，可以传入`css.at()`和`css.join()`
     * 
     * @example
     * css.selector(
     *     "#my-element",
     *     css.rule({
     *         color: "blue"
     *     })
     * ) // -> "#my-element { color: blue; }"
     */
    export const selector = (selector: string, rule: RuleValue): RuleBlockValue => {
        return selector + "{" + rule + "}" as RuleBlockValue
    }

    /**
     * 根据 @ 规则和可选的 CSS 规则或规则块，创建一个  @ 规则块字符串
     * @param identifier @ 规则，如 "@media (min-width: 768px)"
     * @param rule 可选，类型为`RuleValue`的字符串，或类型为`SelectorValue`的字符串
     * @returns 返回类型为`AtValue`的字符串，可以传入`css.join()`
     * 
     * @example
     * css.at(
     *     "@font-face",
     *     css.rule({
     *         scr: "..."
     *     })
     * ) // -> "@font-face { scr: "..."; }"
     * 
     * @example
     * css.at(
     *     "@media (min-width: 768px)",
     *     css.selector(
     *         "#my-element",
     *         css.rule(...)
     *     )
     * ) // -> "@media (min-width: 768px) { #my-element { ... } }"
     */
    export const at = (identifier: AtRules | (string & {}), rule?: RuleValue | RuleBlockValue): AtValue => {
        return identifier + (rule ? ("{" + rule + "}") : "") as AtValue
    }

    /**
     * 拼接 CSS 规则块和 @ 规则块，返回一个字符串
     * @param rules CSS 规则块和 @ 规则块，类型为`RuleBlockValue`或`AtValue`的字符串
     * @returns 返回标准的字符串
     */
    export const join = (...rules: (RuleBlockValue | AtValue)[]): string => {
        return rules.join("\n")
    }
}