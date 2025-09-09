type Point = [number, number]

class BezierError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'BezierError'
    }
}

// --- 二次贝塞尔曲线核心计算 (P₀=(0,0), P2=(1,1)) ---
export namespace quadraticCurve {

    /**
     * [二次] 给定控制点 P1 和 t (时间)，计算 x 坐标
     * @param p1 控制点1 的坐标
     * @param t 时间比例 [0, 1]
     * @returns x 坐标
     */
    export const solveX = (p1: Point, t: number): number => {
        const [p1x, p1y] = p1
        const oneMinusT = 1 - t
        // 公式: (1-t)²*P₀ + 2(1-t)t*P1 + t²*P2
        // P₀=0, P2=1 => 2(1-t)t*p1x + t²
        return 2 * oneMinusT * t * p1x + t * t
    }

    /**
     * [二次] 给定控制点 P1 和 t (时间)，计算 y 坐标
     * @param p1 控制点1 坐标
     * @param t 时间比例 [0, 1]
     * @returns y 坐标
     */
    export const solveY = (p1: Point, t: number): number => {
        const [p1x, p1y] = p1
        const oneMinusT = 1 - t
        return 2 * oneMinusT * t * p1y + t * t
    }

    /**
     * [二次] 给定控制点 P1 和 x (坐标)，反向求解 t (时间)
     * 使用二分查找法
     * @param p1 控制点1 坐标
     * @param x 目标 x 坐标 [0, 1]
     * @returns 对应的时间 t
     */
    export const solveTForX = (p1: Point, x: number, iterations: number = 8): number => {
        let tMin = 0.0
        let tMax = 1.0
        let tGuess: number

        for (let i = 0; i < iterations; i++) { // 对于二次曲线，8次迭代足够
            tGuess = (tMin + tMax) / 2
            const xGuess = solveX(p1, tGuess)
            if (xGuess < x) {
                tMin = tGuess
            } else {
                tMax = tGuess
            }
        }
        return (tMin + tMax) / 2
    }
}

// --- 三次贝塞尔曲线核心计算 (P₀=(0,0), P₃=(1,1)) ---
export namespace cubicCurve {

    /**
     * [三次] 给定控制点 P1, P2 和 t (时间)，计算 x 坐标
     * @param \[p1, p2] 控制点1 控制点2 的坐标
     * @param t 时间比例 [0, 1]
     * @returns x 坐标
     */
    export const solveX = ([p1, p2]: [Point, Point],  t: number): number => {
        const [p1x, p1y] = p1
        const [p2x, p2y] = p2
        const oneMinusT = 1 - t
        const t2 = t * t
        // 公式: (1-t)³*P₀ + 3(1-t)²t*P1 + 3(1-t)t²*P2 + t³*P₃
        // P₀=0, P₃=1 => 3(1-t)²t*p1x + 3(1-t)t²*p2x + t³
        return 3 * oneMinusT * oneMinusT * t * p1x + 3 * oneMinusT * t2 * p2x + t2 * t
    }

    /**
     * [三次] 给定控制点 P1, P2 和 t (时间)，计算 y 坐标
     * @param \[p1, p2] 控制点1 控制点2 的坐标
     * @param t 时间比例 [0, 1]
     * @returns y 坐标
     */
    export const solveY = ([p1, p2]: [Point, Point], t: number): number => {
        const [p1x, p1y] = p1
        const [p2x, p2y] = p2
        const oneMinusT = 1 - t
        const t2 = t * t
        return 3 * oneMinusT * oneMinusT * t * p1y + 3 * oneMinusT * t2 * p2y + t2 * t
    }

    /**
     * [三次] 给定控制点 P1, P2 和 x (坐标)，反向求解 t (时间)
     * 使用二分查找法
     * @param \[p1, p2] 控制点1 控制点2 的坐标
     * @param x 目标 x 坐标 [0, 1]
     * @returns 对应的时间 t
     */
    export const solveTForX = ([p1, p2]: [Point, Point], x: number, iterations: number = 12): number => {
        let tMin = 0.0
        let tMax = 1.0
        let tGuess: number

        for (let i = 0; i < iterations; i++) { // 12次迭代精度非常高
            tGuess = (tMin + tMax) / 2
            const xGuess = solveX([p1, p2], tGuess)
            if (xGuess < x) {
                tMin = tGuess
            } else {
                tMax = tGuess
            }
        }
        return (tMin + tMax) / 2
    }
}


/**
 * 代表一个二次贝塞尔缓动曲线
 */
export class QuadraticBezier {

    /**
     * @param p1 控制点 P1
     */
    constructor(
        private readonly p1: Point
    ) {
        if (this.p1[0] < 0 || this.p1[0] > 1) {
            throw new BezierError("控制点P1的x坐标必须在[0, 1]之间")
        }
    }

    /**
     * 根据时间 t [0, 1]，计算 x 坐标
     */
    solveX(t: number): number {
        return quadraticCurve.solveX(this.p1, t)
    }

    /**
     * 根据时间 t [0, 1]，计算 y 坐标
     */
    solveY(t: number): number {
        return quadraticCurve.solveY(this.p1, t)
    }

    /**
     * 根据 x 坐标 [0, 1]，计算 y 坐标
     */
    solveYForX(x: number): number {
        const t = quadraticCurve.solveTForX(this.p1, x)
        return this.solveY(t)
    }
}

/**
 * 代表一个三次贝塞尔缓动曲线
 */
export class CubicBezier {
    /**
     * @param p1 控制点 P1
     * @param p2 控制点 P2
     */
    constructor(
        private readonly p1: Point,
        private readonly p2: Point
    ) {
        if (this.p1[0] < 0 || this.p1[0] > 1) {
            throw new BezierError("控制点P1的x坐标必须在[0, 1]之间")
        }
        if (this.p2[0] < 0 || this.p2[0] > 1) {
            throw new BezierError("控制点P2的x坐标必须在[0, 1]之间")
        }
    }

    /**
     * 根据时间 t [0, 1]，计算 x 坐标
     */
    solveX(t: number): number {
        return cubicCurve.solveX([this.p1, this.p2], t)
    }

    /**
     * 根据时间 t [0, 1]，计算 y 坐标
     */
    solveY(t: number): number {
        return cubicCurve.solveY([this.p1, this.p2], t)
    }

    /**
     * 根据 x 坐标 [0, 1]，计算 y 坐标
     */
    solveYForX(x: number): number {
        const t = cubicCurve.solveTForX([this.p1, this.p2], x)
        return this.solveY(t)
    }
}