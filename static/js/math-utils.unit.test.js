import { operate, round } from "./math-utils.js";

test("Adds two integers", () => {
    expect(operate("+", 1, 2)).toBe(3);
});

test("Add two large integers", () => {
    expect(operate("+", 99999999, 99999999)).toBe(199_999_998);
});

test("Add two floating-point numbers", () => {
    expect(operate("+", 0.1, 0.2)).toBe(0.3);
});

test("Add an integer and a floating-point number", () => {
    expect(operate("+", 1, 0.2)).toBe(1.2);
});

test("Add zero and an integer", () => {
    expect(operate("+", 0, 1)).toBe(1);
});

test("Add zero and a floating-point number", () => {
    expect(operate("+", 0, 0.1)).toBe(0.1);
});

test("Subtract two integers", () => {
    expect(operate("-", 3, 1)).toBe(2);
});

test("Subtract a larger integer from a smaller integer returns a negative integer", () => {
    expect(operate("-", 1, 3)).toBe(-2);
});

test("Subtract two floating-point numbers", () => {
    expect(operate("-", 0.3, 0.1)).toBe(0.2);
});

test("Subtract a larger floating-point number from a smaller one returns a negative floating-point number", () => {
    expect(operate("-", 0.1, 0.3)).toBe(-0.2);
});

test("Subtract zero from an integer", () => {
    expect(operate("-", 1, 0)).toBe(1);
});

test("Subtract an integer from zero", () => {
    expect(operate("-", 0, 1)).toBe(-1);
});

test("Subtract zero from a floating-point number", () => {
    expect(operate("-", 0.2, 0)).toBe(0.2);
});

test("Subtract a floating-point number from zero", () => {
    expect(operate("-", 0, 0.2)).toBe(-0.2);
});

test("Multiply two integers", () => {
    expect(operate("*", 2, 3)).toBe(6);
});

test("Multiply two large integers", () => {
    expect(operate("*", 999999999, 999999999)).toBe(999_999_998_000_000_000);
});

test("Multiply two floating-point numbers", () => {
    expect(operate("*", 0.2, 0.3)).toBe(0.06);
});

test("Multiply two floating-point numbers with many decimal places", () => {
    expect(operate("*", 0.999999999, 0.999999999)).toBe(0.999_999_998);
});

test("Multiply zero and a number", () => {
    expect(operate("*", 0, 2)).toBe(0);
});

test("Multiply zero and zero", () => {
    expect(operate("*", 0, 0)).toBe(0);
});

test("Divide two integers", () => {
    expect(operate("/", 6, 3)).toBe(2);
});

test("Divide two floating-point numbers resulting in an integer", () => {
    expect(operate("/", 0.6, 0.3)).toBe(2);
});

test("Divide two floating-point numbers resulting in a floating-point number", () => {
    expect(operate("/", 0.3, 0.5)).toBe(0.6);
});

test("Result of division should be rounded to at most 11 decimal places", () => {
    expect(operate("/", 0.7, 0.3)).toBe(2.33333333333);
});

test("Zero divided by a number", () => {
    expect(operate("/", 0, 3)).toBe(0);
});

test("Zero divided by zero", () => {
    expect(operate("/", 0, 0)).toBeNaN();
});

test("Number divided by zero", () => {
    expect(operate("/", 1, 0)).toBe(Infinity);
});

test("Round a floating-point number to two decimal places", () => {
    expect(round(1.2345678910, 2)).toBe(1.23);
});

test("Round a floating-point number to zero decimal places", () => {
    expect(round(2.3456789123, 0)).toBe(2);
});

test("Round an integer to 11 decimal places", () => {
    expect(round(3, 11)).toBe(3.00_000_000_000);
});

test("Round an integer to 0 decimal places", () => {
    expect(round(3, 0)).toBe(3);
});