import { isValidExpression, evaluateExpression, isInvalidResult } from "../validation-utils.js";


describe("isValidExpression", () => {
    test("Empty array is invalid", () => {
        const expression = [];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("Array of empty strings is invalid", () => {
        const expression = ["", "", ""];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("Single value is invalid", () => {
        const expression = ["1"];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("Two values is invalid", () => {
        const expression = ["1", "*"];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("More than three values is invalid", () => {
        const expression = ["1", "*", "3", "2"];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("First value non-numeric is invalid", () => {
        const expression = ["*", "*", "3"];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("Second value not operator is invalid", () => {
        const expression = ["1", "2", "3"];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("Third value non-numeric is invalid", () => {
        const expression = ["1", "*", "*"];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("Invalid operator is invalid", () => {
        const expression = ["1", "$", "3"];
        expect(isValidExpression(expression)).toBe(false);
    });

    test("Properly formated expression is valid", () => {
        const expression = ["1", "+", "3"];
        expect(isValidExpression(expression)).toBe(true);
    });
});

describe("evaluteExpression", () => {
    test("Evaluates valid expression", () => {
        const expression = ["1", "+", "3"];
        expect(evaluateExpression(expression)).toBe(4);
    });

    test("Evaluates numeric values", () => {
        const expression = [1, "+", 3];
        expect(evaluateExpression(expression)).toBe(4);
    });

});

describe("isInvalidResult", () => {
    test("Numeric result is valid", () => {
        const result = 5;
        expect(isInvalidResult(result)).toBe(false);
    });

    test("Numeric string result is valid", () => {
        const result = "5";
        expect(isInvalidResult(result)).toBe(false);
    });

    test("Infinity is invalid", () => {
        const result = Infinity;
        expect(isInvalidResult(result)).toBe(true);
    });

    test("NaN is invalid", () => {
        const result = NaN;
        expect(isInvalidResult(result)).toBe(true);
    });
});


