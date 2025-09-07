// --- 测试套件 ---
const testCases: { input: string[], expected: string }[] = [
    // --- 你的期望 ---
    { input: ["a", "/b/"], expected: "a/b/" },
    { input: ["/a", "b"], expected: "/a/b" },
    { input: ["//domain", "a/"], expected: "//domain/a/" },
    { input: ["//domain/", "/a/", "b"], expected: "//domain/a/b" },

    // --- 基础拼接 ---
    { input: ["a", "b", "c"], expected: "a/b/c" },
    { input: ["a/", "b/", "c"], expected: "a/b/c" },
    { input: ["/a/", "/b/", "/c"], expected: "/a/b/c" },
    
    // --- 连续斜杠处理 ---
    { input: ["a//b", "c"], expected: "a//b/c" },
    { input: ["//a", "//b"], expected: "//a//b" },
    
    // --- `.` 和 `..` 路径解析 ---
    { input: ["a", ".", "b"], expected: "a/b" },
    { input: ["a", "./b"], expected: "a/b" },
    { input: ["a", "b", "..", "c"], expected: "a/c" },
    { input: ["a", "../b"], expected: "b" },
    { input: ["/a", "b", ".."], expected: "/a" },
    { input: ["a", "b", "../../c"], expected: "c" },
    
    // --- 越界 `..` 处理 ---
    { input: ["..", "a"], expected: "a" },
    { input: ["a", "..", "..", "b"], expected: "b" },
    { input: ["/..", "a"], expected: "a" },
    
    // --- 绝对路径和根路径 ---
    { input: ["/"], expected: "/" },
    { input: ["/", "a"], expected: "/a" },
    { input: ["a", "/"], expected: "a/" },

    // --- 包含协议头的特殊情况 ---
    { input: ["http://a", "b"], expected: "http://a/b" },
    { input: ["file:///a", "b"], expected: "file:///a/b" },
]

import { test, expect } from "bun:test"
import { URI } from "src/uri"

testCases.forEach(({ input, expected }, i) => {
    test(`src/url #${i + 1}: join(${input.map(s => JSON.stringify(s)).join(', ')})`, () => {
        expect(URI.join(...input)).toBe(expected)
    })
})