import { isValidExpression, evaluateExpression, isInvalidResult } from "./validation-utils.js";

test("An empty array evaluates as an invalid expression", () => {
    const expression = [];
    expect(isValidExpression(expression)).toBe(false);
});

test("An array with empty strings evaluates as an invalid expression", () => {
    const expression = ["", "", ""];
    expect(isValidExpression(expression)).toBe(false);
});

test("An expression with one value evaluates as invalid", () => {
    const expression = ["1"];
    expect(isValidExpression(expression)).toBe(false);
});

test("An expression with two values evaluates as an invalid", () => {
    const expression = ["1", "*"];
    expect(isValidExpression(expression)).toBe(false);
});

test("If first value is non-numeric the expression evaluates as invalid", () => {
    const expression = ["*", "*", "3"];
    expect(isValidExpression(expression)).toBe(false);
});

test("If second value is not an operator the expression evaluates as invalid", () => {
    const expression = ["1", "2", "3"];
    expect(isValidExpression(expression)).toBe(false);
});

test("If third value is non-numeric the expression evaluates as invalid", () => {
    const expression = ["1", "*", "*"];
    expect(isValidExpression(expression)).toBe(false);
});

test("If expression has more than three values it evaluates as invalid", () => {
    const expression = ["1", "*", "3", "2"];
    expect(isValidExpression(expression)).toBe(false);
});

test("If operator is not from the list of valid operators the expression evaluates as an invalid", () => {
    const expression = ["1", "$", "3"];
    expect(isValidExpression(expression)).toBe(false);
});

test("A properly formated expression evaluates as valid", () => {
    const expression = ["1", "+", "3"];
    expect(isValidExpression(expression)).toBe(true);
});
