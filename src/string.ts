declare global {
    interface String {
        /**
         * 移除字符串的前缀`prefix`，如果不以`prefix`开头，则返回原字符串
         * @param prefix 指定字符串
         * @returns 移除后的字符串
         */
        removePrefix(prefix: string): string

        /**
         * 移除字符串的后缀`suffix`，如果不以`suffix`结尾，则返回原字符串
         * @param suffix 待匹配的串
         * @returns 移除后的字符串
         */
        removeSuffix(suffix: string): string

        /**
         * 移除字符串连续出现的若干个前缀`prefix`，如果不以`prefix`开头，则返回原字符串
         * @param prefix 待匹配的串
         * @returns 移除后的字符串
         */
        removeAllPrefixes(prefix: string): string

        /**
         * 移除字符串连续出现的若干个后缀`suffix`，如果不以`suffix`结尾，则返回原字符串
         * @param suffix 待匹配的串
         * @returns 移除后的字符串
         */
        removeAllSuffixes(suffix: string): string

        /**
         * 将字符串转为驼峰命名
         * @returns 驼峰命名的字符串
         */
        toCamelCase(): string
        
        /**
         * 将字符串转为连字符命名
         * @returns 连字符命名的字符串
         */
        toKebabCase(): string
    }
}

Object.defineProperty(String.prototype, 'removePrefix', {
    value: function(this: string, prefix: string): string {
        return this.startsWith(prefix) ? this.slice(prefix.length) : this
    },
    writable: true, configurable: true, enumerable: false
})

Object.defineProperty(String.prototype, 'removeSuffix', {
    value: function(this: string, suffix: string): string {
        return this.endsWith(suffix) ? this.slice(0, -suffix.length) : this
    },
    writable: true, configurable: true, enumerable: false
})

Object.defineProperty(String.prototype, 'removeAllPrefixes', {
    value: function(this: string, prefix: string): string {
        if (prefix.length === 0) return this
        let str = this
        while (str.startsWith(prefix)) {
            str = str.slice(prefix.length)
        }
        return str
    },
    writable: true, configurable: true, enumerable: false
})

Object.defineProperty(String.prototype, 'removeAllSuffixes', {
    value: function(this: string, suffix: string): string {
        if (suffix.length === 0) return this
        let str = this
        while (str.endsWith(suffix)) {
            str = str.slice(0, -suffix.length)
        }
        return str
    },
    writable: true, configurable: true, enumerable: false
})

Object.defineProperty(String.prototype, 'toCamelCase', {
    value: function(this: string): string {
        return this.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    },
    writable: true, configurable: true, enumerable: false
})

Object.defineProperty(String.prototype, 'toKebabCase', {
    value: function(this: string): string {
        return this.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    },
    writable: true, configurable: true, enumerable: false
})

export {}