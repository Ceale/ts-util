import { inspect } from 'util'

export const StringUtil = (str: string) => ({
    string: str,
    toString: () => str,
    valueOf: () => str,

    removeStart: (searchString: string) => str.startsWith(searchString) ? str.slice(searchString.length) : str,
    removeEnd: (searchString: string) => str.endsWith(searchString) ? str.slice(0, -searchString.length) : str,
    removeStartAll(searchString: string) {
        while (str.startsWith(searchString)) {
            str = str.slice(searchString.length)
        }
        return str
    },
    removeEndAll(searchString: string) {
        while (str.endsWith(searchString)) {
            str = str.slice(0, -searchString.length)
        }
        return str
    }
})