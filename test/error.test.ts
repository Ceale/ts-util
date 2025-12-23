import { describe, expect, test } from "bun:test";
import { tryCatch } from "src/error"

// 定义一些自定义错误用于测试 catchClass
class MyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MyError";
    }
}

class OtherError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OtherError";
    }
}

describe("tryCatch 同步函数测试", () => {
    test("同步成功：应返回数据并支持数组/对象解构", () => {
        const [data, error] = tryCatch(() => "hello");
        const res = tryCatch(() => "hello");

        expect(data).toBe("hello");
        expect(error).toBeNull();
        expect(res.data).toBe("hello");
        expect(res.error).toBeNull();
    });

    test("同步失败（捕获所有）：应返回错误", () => {
        const err = new Error("sync fail");
        const [data, error] = tryCatch(() => {
            throw err;
        });

        expect(data).toBeNull();
        expect(error).toBe(err);
    });

    test("同步失败（指定错误类）：匹配时应捕获", () => {
        const err = new MyError("known error");
        const [data, error] = tryCatch(() => {
            throw err;
        }, MyError);

        expect(data).toBeNull();
        expect(error).toBe(err);
    });

    test("同步失败（指定错误类）：不匹配时应抛出错误", () => {
        const err = new OtherError("unknown error");
        expect(() => {
            tryCatch(() => {
                throw err;
            }, MyError);
        }).toThrow(OtherError);
    });
});

describe("tryCatch Promise 测试", () => {
    test("异步成功：应返回数据", async () => {
        const promise = Promise.resolve("async hello");
        const [data, error] = await tryCatch(promise);

        expect(data).toBe("async hello");
        expect(error).toBeNull();
    });

    test("异步失败（捕获所有）：应返回错误", async () => {
        const err = new Error("async fail");
        const [data, error] = await tryCatch(Promise.reject(err));

        expect(data).toBeNull();
        expect(error).toBe(err);
    });

    test("异步失败（指定错误类）：匹配时应捕获", async () => {
        const err = new MyError("async known error");
        const [data, error] = await tryCatch(Promise.reject(err), MyError);

        expect(data).toBeNull();
        expect(error).toBe(err);
    });

    test("异步失败（指定错误类）：不匹配时应 reject", async () => {
        const err = new OtherError("async unknown error");
        // Bun 的 expect 支持 rejects 断言
        expect(tryCatch(Promise.reject(err), MyError)).rejects.toThrow(OtherError);
    });
});