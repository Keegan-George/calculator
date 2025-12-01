import { operate, round } from "../math-utils.js";

describe("addition operator", () => {
    test("Adds integers", () => {
        expect(operate("+", 1, 2)).toBe(3);
    });

    test("Adds large integers", () => {
        expect(operate("+", 99999999, 99999999)).toBe(199_999_998);
    });

    test("Adds floats", () => {
        expect(operate("+", 0.1, 0.2)).toBeCloseTo(0.3);
    });

    test("Adds int and float", () => {
        expect(operate("+", 1, 0.2)).toBeCloseTo(1.2);
    });

    test("Adds zero and int", () => {
        expect(operate("+", 0, 1)).toBe(1);
    });

    test("Adds zero and float", () => {
        expect(operate("+", 0, 0.1)).toBeCloseTo(0.1);
    });
});

describe("subtract operator", () => {
    test("Subtracts integers", () => {
        expect(operate("-", 3, 1)).toBe(2);
    });

    test("Subtracts larger int from smaller", () => {
        expect(operate("-", 1, 3)).toBe(-2);
    });

    test("Subtracts floats", () => {
        expect(operate("-", 0.3, 0.1)).toBeCloseTo(0.2);
    });

    test("Subtracts larger float from smaller", () => {
        expect(operate("-", 0.1, 0.3)).toBeCloseTo(-0.2);
    });

    test("Subtracts zero from int", () => {
        expect(operate("-", 1, 0)).toBe(1);
    });

    test("Subtracts int from zero", () => {
        expect(operate("-", 0, 1)).toBe(-1);
    });

    test("Subtracts zero from float", () => {
        expect(operate("-", 0.2, 0)).toBeCloseTo(0.2);
    });

    test("Subtracts float from zero", () => {
        expect(operate("-", 0, 0.2)).toBeCloseTo(-0.2);
    });
});

describe("Multiply operator", () => {
    test("Multiplies integers", () => {
        expect(operate("*", 2, 3)).toBe(6);
    });

    test("Multiplies large integers", () => {
        expect(operate("*", 999999999, 999999999)).toBe(999_999_998_000_000_000);
    });

    test("Multiplies floats", () => {
        expect(operate("*", 0.2, 0.3)).toBeCloseTo(0.06);
    });

    test("Multiplies floats with many decimals", () => {
        expect(operate("*", 0.999999999, 0.999999999)).toBeCloseTo(0.999_999_998);
    });

    test("Multiplies zero and int", () => {
        expect(operate("*", 0, 2)).toBe(0);
    });

    test("Multiplies zero and zero", () => {
        expect(operate("*", 0, 0)).toBe(0);
    });
});

describe("Divide operator", () => {
    test("Divides integers", () => {
        expect(operate("/", 6, 3)).toBe(2);
    });

    test("Divides floats to integer", () => {
        expect(operate("/", 0.6, 0.3)).toBe(2);
    });

    test("Divides floats to float", () => {
        expect(operate("/", 0.3, 0.5)).toBeCloseTo(0.6);
    });

    test("Division result rounded to 11 decimal places", () => {
        expect(operate("/", 0.7, 0.3)).toBeCloseTo(2.33333333333);
    });

    test("Zero divided by int", () => {
        expect(operate("/", 0, 3)).toBe(0);
    });

    test("Zero divided by zero", () => {
        expect(operate("/", 0, 0)).toBeNaN();
    });

    test("Int divided by zero", () => {
        expect(operate("/", 1, 0)).toBe(Infinity);
    });
});

describe("Round function", () => {
    test("Rounds float to 2 decimals", () => {
        expect(round(1.2345678910, 2)).toBeCloseTo(1.23);
    });

    test("Rounds float to 0 decimals", () => {
        expect(round(2.3456789123, 0)).toBe(2);
    });

    test("Rounds int to 11 decimals", () => {
        expect(round(3, 11)).toBeCloseTo(3.00_000_000_000);
    });

    test("Rounds int to 0 decimals", () => {
        expect(round(3, 0)).toBe(3);
    });
});
