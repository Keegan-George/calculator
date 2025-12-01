/**
* @jest-environment jsdom
*/

import { DEFAULT_RESULT, calculatorState, handleDigitInput, handleOperatorInput, handleEqualsInput, handleDecimalInput, handleBackspaceInput, resetCalculatorState } from "./calculator.js";

beforeEach(() => { resetCalculatorState() });


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

test("Can reset Calculator after a result has been calculated", () => {
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

test("Can input a digit on a calculator in its initial state", () => {
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

test("Can input a digit after one has already been entered", () => {
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

test("Can input an operator after a number have been entered", () => {
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

test("Can input a digit after a number and an operator are part of the expression", () => {
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

test("Pressing equals evaluates a valid expression", () => {
    const mockEvent = {
        type: "click",
        target: {
            innerText: "=",
        },
    };

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

    handleEqualsInput(mockEvent);
    expect(calculatorState).toEqual(expectedState)
});

test("Pressing an operator evaluates a valid expression", () => {
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

test("Pressing a digit after calculating an expression with the equals button starts a new expression", () => {
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

test("Pressing an operator after calculating an expression with the equals button continues the expression", () => {
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


test("Can handle division by zero", () => {
    const mockEvent = {
        type: "click",
        target: {
            innerText: "=",
        },
    };

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

    handleEqualsInput(mockEvent);
    expect(calculatorState).toEqual(expectedState);
});

test("Pressing an operator twice updates the operator", () => {
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

test("Can create decimal number from calculator in initial state", () => {
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


test("Can append a decimal after a digit has been entered", () => {
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

test("Number can only contain at most one decimal", () => {
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

test("Can delete a decimal", () => {
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

