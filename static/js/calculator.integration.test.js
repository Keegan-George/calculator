/**
* @jest-environment jsdom
*/

import { DEFAULT_RESULT, calculatorState, resetCalculatorState } from "./calculator.js";

test("Can reset Calculator from its initial state", () => {
    const expectedState = {
        operator: "",
        currentNumber: "",
        expression: [],
        result: DEFAULT_RESULT,
        isEqualsPressed: false,
    };

    resetCalculatorState();
    expect(calculatorState).toEqual(expectedState);
});

test("Can reset Calculator after pressing equals", () => {
    const expected = {
        operator: "",
        currentNumber: "",
        expression: [],
        result: DEFAULT_RESULT,
        isEqualsPressed: false,
    };

    calculatorState.operator = "+";
    calculatorState.currentNumber = "3";
    calculatorState.expression = [];
    calculatorState.result = "3";
    calculatorState.isEqualsPressed = true;

    resetCalculatorState();
    expect(calculatorState).toEqual(expected)
})