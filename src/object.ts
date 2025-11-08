declare global {
    interface Object {
        /**
         * 复数版本的`hasOwnProperty`
         * @param keys 要检查的属性名
         */
        hasKeys(...keys: string[]): boolean

        /**
         * 复数版本的`in`
         * @param keys 要检查的属性名
         */
        inKeys(...keys: string[]): boolean
    }
}

Object.defineProperty(Object.prototype, "hasKeys", {
    value: function(this: object, ...keys: string[]): boolean {
        if (keys.length === 0) return false
        return keys.every(key => this.hasOwnProperty(key))
    },
    enumerable: false,
    writable: true,
    configurable: true
})

Object.defineProperty(Object.prototype, "inKeys", {
    value: function(this: object, ...keys: string[]): boolean {
        if (keys.length === 0) return false
        return keys.every(key => key in this)
    },
    enumerable: false,
    writable: true,
    configurable: true
})