import { StringUtil } from "./string"

export const UrlUtil = (url?: string) => ({
    join(...path: string[]) {
        return path
        .filter(p => p !== '')
        .map((p, index) => {
            if (index === 0) {
                return StringUtil(p).removeEnd("/")
            }
            return "/" + StringUtil(p).removeStart("/")
        })
        .join("")
    }
})