/**
* @jest-environment jsdom
*/

import { DEFAULT_RESULT, calculatorState, handleDigitInput, handleOperatorInput, handleEqualsInput, handleDecimalInput, handleBackspaceInput, resetCalculatorState } from "../calculator.js";

beforeEach(() => { 
    resetCalculatorState();
    document.querySelector = () => ({ innerText: "" });
});

describe("Reset state", () => {
    test("Resets from initial state", () => {
        const expectedState = {
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
            currentNumber: "",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

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
            currentNumber: "3",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

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
            currentNumber: "35",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "3";
        calculatorState.expression = [];
        calculatorState.isEqualsPressed = false;

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
            currentNumber: mockEvent.target.innerText,
            expression: ["35", "+"],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.currentNumber = "";
        calculatorState.expression = ["35", "+"];
        calculatorState.isEqualsPressed = false;

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
            currentNumber: mockEvent.target.innerText,
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.currentNumber = "41";
        calculatorState.expression = [];
        calculatorState.result = "41";
        calculatorState.isEqualsPressed = true;

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
            currentNumber: "",
            expression: ["35", mockEvent.target.innerText],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.currentNumber = "35";
        calculatorState.expression = [];
        calculatorState.isEqualsPressed = false;

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
            currentNumber: "",
            expression: ["41", mockEvent.target.innerText],
            result: "41",
            isEqualsPressed: false,
        };

        calculatorState.currentNumber = "41";
        calculatorState.expression = [];
        calculatorState.result = "41";
        calculatorState.isEqualsPressed = true;

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
            currentNumber: "",
            expression: ["8", mockEvent.target.innerText],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.currentNumber = "";
        calculatorState.expression = ["8", "+"];

        handleOperatorInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

});

describe("Evaluate expression", () => {
    test("Equals evaluates expression", () => {
        const expectedState = {
            currentNumber: "41",
            expression: [],
            result: "41",
            isEqualsPressed: true,
        };

        calculatorState.currentNumber = "6";
        calculatorState.expression = ["35", "+"];
        calculatorState.isEqualsPressed = false;

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
            currentNumber: "",
            expression: ["41", mockEvent.target.innerText],
            result: "41",
            isEqualsPressed: false,
        };

        calculatorState.currentNumber = "6";
        calculatorState.expression = ["35", "+"];
        calculatorState.isEqualsPressed = false;

        handleOperatorInput(mockEvent);
        expect(calculatorState).toEqual(expectedState);
    });

    test("Handles division by zero", () => {
        const expectedState = {
            currentNumber: "",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        };

        calculatorState.currentNumber = "0";
        calculatorState.expression = ["5", "/"];

        handleEqualsInput();
        expect(calculatorState).toEqual(expectedState);
    });

});

describe("Decimal input", () => {
    test("Creates decimal in initial state", () => {
        const expectedState = {
            currentNumber: "0.",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        handleDecimalInput();
        expect(calculatorState).toEqual(expectedState);
    });


    test("Appends decimal after digit", () => {
        const expectedState = {
            currentNumber: "3.",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "3"

        handleDecimalInput();
        expect(calculatorState).toEqual(expectedState);
    });

    test("Number allows only one decimal", () => {
        const expectedState = {
            currentNumber: "3.",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "3."

        handleDecimalInput();
        expect(calculatorState).toEqual(expectedState);
    });

    test("Decimal after result with equals", () => {
        const expectedState = {
            currentNumber: "0.",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "41",
        calculatorState.expression = [];
        calculatorState.result = "41";
        calculatorState.isEqualsPressed = true;

        handleDecimalInput();
        expect(calculatorState).toEqual(expectedState);
    });
});

describe("Backspace input", () => {
    test("Deletes decimal", () => {
        const expectedState = {
            currentNumber: "3",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "3."

        handleBackspaceInput();
        expect(calculatorState).toEqual(expectedState);
    });

    test("Deletes digit", () => {
        const expectedState = {
            currentNumber: "24",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "246";

        handleBackspaceInput();
        expect(calculatorState).toEqual(expectedState);
    });

    test("Deletes single digit clears field", () => {
        const expectedState = {
            currentNumber: "",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        calculatorState.currentNumber = "2";

        handleBackspaceInput();
        expect(calculatorState).toEqual(expectedState);
    });

    test("Backspace on initial state", () => {
        const expectedState = {
            currentNumber: "",
            expression: [],
            result: DEFAULT_RESULT,
            isEqualsPressed: false,
        }

        handleBackspaceInput();
        expect(calculatorState).toEqual(expectedState);
    });
});
