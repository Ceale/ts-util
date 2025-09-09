# @ceale/util

小工具集

提供了
- String.prototype
    - removePrefix()
    - removeSuffix()
    - removeAllPrefixes()
    - removeAllSuffixes()
    - toCamelCase()
    - toKebabCase()
- Function.prototype
    - isDirectSubclass()
    - isSubclass()
    - isDirectInstance()
    - isInstance()
- namespace: `uri`
    - join()
- namespace: `css`
    - rule()
    - selector()
    - at()
    - join()
- `time.ts`
    - wait() `# Alias: sleepAsync()`
    - sleep() `# Alias: waitSync()`
- `task.ts`
    - debounce()
    - throttle()
- `bezier.ts`
    - namespace `quadraticCurve`
        - solveX()
        - solveY()
        - solveTForX()
    - namespace `cubicCurve`
        - solveX()
        - solveY()
        - solveTForX()
    - class `QuadraticBezier`
    - class `CubicBezier`
- `error.ts`
    - tryCatch()