// 定义一个通用的类/构造函数类型
type AnyClass = new (...args: any[]) => any

declare global {
    interface Function {
        /**
         * 检查 `potentialChild` 是否是当前类的直接子类
         * @param potentialChild 潜在的子类构造函数
         * @returns 如果是直接子类，则返回 `true`；否则返回 `false`
         */
        isDirectSubclass(this: AnyClass, potentialChild: unknown): boolean

        /**
         * 检查 `potentialDescendant` 是否是当前类的子孙类或当前类本身
         * @param potentialDescendant 潜在的子孙类或类本身
         * @returns 如果是子孙类或类本身，则返回 `true`；否则返回 `false`
         */
        isSubclass(this: AnyClass, potentialDescendant: unknown): boolean

        /**
         * 检查 `potentialInstance` 是否由当前类直接构造
         * 判断依据: `Object.getPrototypeOf(potentialInstance).constructor === this`
         * @param potentialInstance 潜在的实例对象
         * @returns 如果是由当前类直接创建的实例，则返回 `true`；否则返回 `false`
         */
        isDirectInstance(this: AnyClass, potentialInstance: unknown): boolean

        /**
         * 检查 `potentialInstance` 是否是当前类或其任何子类的实例
         * 内部使用 `instanceof` 操作符
         * @param potentialInstance 潜在的实例对象
         * @returns 如果是实例，则返回 `true`；否则返回 `false`
         */
        isInstance(this: AnyClass, potentialInstance: unknown): boolean
    }
}

// 1. isDirectSubclass (检查是否是直接子类)
Object.defineProperty(Function.prototype, 'isDirectSubclass', {
    value: function (this: AnyClass, potentialChild: unknown): boolean {
        if (typeof potentialChild !== 'function' || typeof this !== 'function') {
            return false
        }
        return Object.getPrototypeOf(potentialChild) === this
    },
    writable: true, configurable: true, enumerable: false
})

// 2. isSubclass (检查是否是子孙类或自身)
Object.defineProperty(Function.prototype, 'isSubclass', {
    value: function (this: AnyClass, potentialDescendant: unknown): boolean {
        if (typeof potentialDescendant !== 'function' || typeof this !== 'function') {
            return false
        }
        // 遍历原型链来检查构造函数之间的继承关系
        let current = potentialDescendant
        while (typeof current === 'function') {
            if (current === this) {
                return true
            }
            current = Object.getPrototypeOf(current)
            // 到达原型链顶端 (Function.prototype) 停止
            if (current === Function.prototype) break
        }
        return false
    },
    writable: true, configurable: true, enumerable: false
})

// 3. isDirectInstance (检查是否是直接实例)
Object.defineProperty(Function.prototype, 'isDirectInstance', {
    value: function (this: AnyClass, potentialInstance: unknown): boolean {
        if (typeof this !== 'function' || potentialInstance === null || typeof potentialInstance !== 'object') {
            return false
        }
        // 实例的原型的 constructor 应该严格等于当前类
        return Object.getPrototypeOf(potentialInstance).constructor === this
    },
    writable: true, configurable: true, enumerable: false
})

// 4. isInstance (检查是否是实例)
Object.defineProperty(Function.prototype, 'isInstance', {
    value: function (this: AnyClass, potentialInstance: unknown): boolean {
        // instanceof 操作符正是为此而生的
        return typeof this === 'function' && potentialInstance instanceof this
    },
    writable: true, configurable: true, enumerable: false
})

export {}