import type { AnyClass } from "./type"

export namespace ClassUtil {
    /**
     * 检查 `potentialChild` 是否是当前类的直接子类
     * @param parent 当前类（父类）
     * @param potentialChild 潜在的子类构造函数
     * @returns 如果是直接子类，则返回 `true`；否则返回 `false`
     */
    export const isDirectSubclass = (parent: AnyClass, potentialChild: unknown): boolean => {
        if (typeof potentialChild !== 'function' || typeof parent !== 'function') {
            return false
        }
        return Object.getPrototypeOf(potentialChild) === parent
    }

    /**
     * 检查 `potentialDescendant` 是否是当前类的子孙类或当前类本身
     * @param parent 当前类
     * @param potentialDescendant 潜在的子孙类或类本身
     * @returns 如果是子孙类或类本身，则返回 `true`；否则返回 `false`
     */
    export const isSubclass = (parent: AnyClass, potentialDescendant: unknown): boolean => {
        if (typeof potentialDescendant !== 'function' || typeof parent !== 'function') {
            return false
        }
        // 遍历原型链来检查构造函数之间的继承关系
        let current = potentialDescendant
        while (typeof current === 'function') {
            if (current === parent) {
                return true
            }
            current = Object.getPrototypeOf(current)
            // 到达原型链顶端 (Function.prototype) 停止
            if (!current || current === Function.prototype) break
        }
        return false
    }

    /**
     * 检查 `potentialInstance` 是否由当前类直接构造
     * 判断依据: `Object.getPrototypeOf(potentialInstance).constructor === targetClass`
     * @param targetClass 当前类
     * @param potentialInstance 潜在的实例对象
     * @returns 如果是由当前类直接创建的实例，则返回 `true`；否则返回 `false`
     */
    export const isDirectInstance = (targetClass: AnyClass, potentialInstance: unknown): boolean => {
        if (typeof targetClass !== 'function' || potentialInstance === null || typeof potentialInstance !== 'object') {
            return false
        }
        // 实例的原型的 constructor 应该严格等于当前类
        return Object.getPrototypeOf(potentialInstance)?.constructor === targetClass
    }

    /**
     * 检查 `potentialInstance` 是否是当前类或其任何子类的实例
     * 内部使用 `instanceof` 操作符
     * @param targetClass 当前类
     * @param potentialInstance 潜在的实例对象
     * @returns 如果是实例，则返回 `true`；否则返回 `false`
     */
    export const isInstance = (targetClass: AnyClass, potentialInstance: unknown): boolean => {
        // instanceof 操作符正是为此而生的
        return typeof targetClass === 'function' && potentialInstance instanceof targetClass
    }
}