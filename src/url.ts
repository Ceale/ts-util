export namespace URI {
    // 删除左边的斜杠，该斜杆右边要有字符，且不能是斜杠——最左端的单个斜杠
    const leftSlash = /^\/(?=[^\/])/g
    // 删除右边的斜杠，该斜杆左边要有字符，且不能是斜杠——最右边的单个斜杠
    const rightSlash =/(?<=[^\/])\/$/g
    // 删除中间的斜杠，该斜杆两边都要有字符，且不能是斜杠——中间的独立的斜杠
    const innerSlash = /(?<=[^\/])\/(?=[^\/])/g
    export const join = (...path: string[]) => {
        return path
        .filter(path => path.length > 0)
        .map((path, index, pathArray) => {
            if (index === 0) {
                // 最左边的那一段
                return path
                    // 删除右边的斜杠
                    .replace(rightSlash, "")
                    // 删除中间的斜杠
                    .split(innerSlash)
            } else if (index === pathArray.length - 1) {
                // 最右边的那一段
                return path
                    // 删除左边的斜杠
                    .replace(leftSlash, "")
                    // 删除中间的斜杠
                    .split(innerSlash)
            } else {
                // 中间的片段
                return path
                    // 删除左边的斜杠
                    .replace(leftSlash, "")
                    // 删除右边的斜杠
                    .replace(rightSlash, "")
                    // 删除中间的斜杠
                    .split(innerSlash)
            }
        })
        .flat()
        .reduce((stack, path) => {
            if (path === "." || path === "/." || path === "./") {
                return stack
            } else if (path === ".." || path === "/.." || path === "../") {
                stack.pop()
                return stack
            } else {
                stack.push(path)
                return stack
            }
        }, [] as string[])
        .reduce((path, segment) => {
            if (path.length === 0) {
                return path + segment
            } else if (path.endsWith("/") || segment.startsWith("/")) {
                return path + segment
            } else {
                return path + "/" + segment
            }
        }, "")
    }
}