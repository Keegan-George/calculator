/**
* @jest-environment jsdom
*/

import { DEFAULT_RESULT, calculatorState, handleDigitInput, handleOperatorInput, handleEqualsInput, handleDecimalInput, handleBackspaceInput, resetCalculatorState } from "../calculator.js";

beforeEach(() => { resetCalculatorState() });

describe("Reset state", () => {
    test("Resets from initial state", () => {
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

    test("Resets after calculation", () => {
        const expectedState = {
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
        expect(calculatorState).toEqual(expectedState);
    });

});

describe("Digit input", () => {
    test("Inputs digit in initial state", () => {
        const mockEvent = {
            type: "click",
            target: {
                innerText: "3",
            },
        }

        const expectedState = {
            operator: "",
            currentNumber: "3",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        document.querySelector = () => ({ innerText: "" });

        handleDigitInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

    test("Inputs digit after one entered", () => {
        const mockEvent = {
            type: "click",
            target: {
                innerText: "5",
            },
        };

        const expectedState = {
            operator: "",
            currentNumber: "35",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.operator = "";
        calculatorState.currentNumber = "3";
        calculatorState.expression = [];
        calculatorState.isEqualsPressed = false;

        document.querySelector = () => ({ innerText: "" });

        handleDigitInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

    test("Inputs digit after number and operator", () => {
        const mockEvent = {
            type: "click",
            target: {
                innerText: "6",
            },
        };

        const expectedState = {
            operator: "+",
            currentNumber: mockEvent.target.innerText,
            expression: ["35", "+"],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.operator = "+";
        calculatorState.currentNumber = "";
        calculatorState.expression = ["35", "+"];
        calculatorState.isEqualsPressed = false;

        document.querySelector = () => ({ innerText: "" });

        handleDigitInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

    test("Digit after equals starts new expression", () => {
        const mockEvent = {
            type: "click",
            target: {
                innerText: "2",
            },
        };

        const expectedState = {
            operator: "",
            currentNumber: mockEvent.target.innerText,
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.operator = "+";
        calculatorState.currentNumber = "41";
        calculatorState.expression = [];
        calculatorState.result = "41";
        calculatorState.isEqualsPressed = true;

        document.querySelector = () => ({ innerText: "" });

        handleDigitInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });


});

describe("Operator input", () => {
    test("Inputs operator after number", () => {
        const mockEvent = {
            type: "click",
            target: {
                innerText: "+",
            },
        };

        const expectedState = {
            operator: mockEvent.target.innerText,
            currentNumber: "",
            expression: ["35", mockEvent.target.innerText],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.operator = "";
        calculatorState.currentNumber = "35";
        calculatorState.expression = [];
        calculatorState.isEqualsPressed = false;

        document.querySelector = () => ({ innerText: "" });

        handleOperatorInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

    test("Operator after equals continues expression", () => {
        const mockEvent = {
            type: "click",
            target: {
                innerText: "*",
            },
        };

        const expectedState = {
            operator: mockEvent.target.innerText,
            currentNumber: "",
            expression: ["41", mockEvent.target.innerText],
            result: "41",
            isEqualsPressed: false,
        };

        calculatorState.operator = "+";
        calculatorState.currentNumber = "41";
        calculatorState.expression = [];
        calculatorState.result = "41";
        calculatorState.isEqualsPressed = true;

        document.querySelector = () => ({ innerText: "" });

        handleOperatorInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

    test("Operator pressed twice updates operator", () => {
        const mockEvent = {
            type: "click",
            target: {
                innerText: "-",
            },
        };

        const expectedState = {
            operator: mockEvent.target.innerText,
            currentNumber: "",
            expression: ["8", mockEvent.target.innerText],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.operator = "+";
        calculatorState.currentNumber = "";
        calculatorState.expression = ["8", "+"];

        document.querySelector = () => ({ innerText: "" });

        handleOperatorInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

});

describe("Evaluate expression", () => {
    test("Equals evaluates expression", () => {
        const expectedState = {
            operator: "+",
            currentNumber: "41",
            expression: [],
            result: "41",
            isEqualsPressed: true,
        };

        calculatorState.operator = "+";
        calculatorState.currentNumber = "6";
        calculatorState.expression = ["35", "+"];
        calculatorState.isEqualsPressed = false;

        document.querySelector = () => ({ innerText: "" });

        handleEqualsInput();
        expect(calculatorState).toEqual(expectedState)
    });

    test("Operator evaluates expression", () => {
        const mockEvent = {
            type: "click",
            target: {
                innerText: "+",
            },
        };

        const expectedState = {
            operator: mockEvent.target.innerText,
            currentNumber: "",
            expression: ["41", mockEvent.target.innerText],
            result: "41",
            isEqualsPressed: false,
        };

        calculatorState.operator = "+";
        calculatorState.currentNumber = "6";
        calculatorState.expression = ["35", "+"];
        calculatorState.isEqualsPressed = false;

        document.querySelector = () => ({ innerText: "" });

        handleOperatorInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

    test("Handles division by zero", () => {
        const expectedState = {
            operator: "",
            currentNumber: "",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.operator = "/";
        calculatorState.currentNumber = "0";
        calculatorState.expression = ["5", "/"];

        document.querySelector = () => ({ innerText: "" });

        handleEqualsInput();
        expect(calculatorState).toEqual(expectedState);
    });

});



describe("Decimal input", () => {
    test("Creates decimal in initial state", () => {
        const expectedState = {
            operator: "",
            currentNumber: "0.",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        document.querySelector = () => ({ innerText: "" });

        handleDecimalInput();
        expect(calculatorState).toEqual(expectedState);
    });


    test("Appends decimal after digit", () => {
        const expectedState = {
            operator: "",
            currentNumber: "3.",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "3"

        document.querySelector = () => ({ innerText: "" });

        handleDecimalInput();
        expect(calculatorState).toEqual(expectedState);
    });

    test("Number allows only one decimal", () => {
        const expectedState = {
            operator: "",
            currentNumber: "3.",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "3."

        document.querySelector = () => ({ innerText: "" });

        handleDecimalInput();
        expect(calculatorState).toEqual(expectedState);
    });

});

describe("Backspace input", () => {
    test("Deletes decimal", () => {
        const expectedState = {
            operator: "",
            currentNumber: "3",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "3."

        document.querySelector = () => ({ innerText: "" });

        handleBackspaceInput();
        expect(calculatorState).toEqual(expectedState);
    });

    test("Deletes digit", () => {
        const expectedState = {
            operator: "",
            currentNumber: "24",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "246"

        document.querySelector = () => ({ innerText: "" });

        handleBackspaceInput();
        expect(calculatorState).toEqual(expectedState);
    });

    test("Deletes single digit clears field", () => {
        const expectedState = {
            operator: "",
            currentNumber: "",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "2";

        document.querySelector = () => ({ innerText: "" });

        handleBackspaceInput();
        expect(calculatorState).toEqual(expectedState);
    });
});



