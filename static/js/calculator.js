import { ARITHMETIC_KEYS, isValidExpression, evaluateExpression, isInvalidResult } from "./validation-utils.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeCalculatorButtons();
});

//constants
const DEFAULT_RESULT = "0";
const ERROR_MESSAGE = "E R R O R";

const calculatorState = {
    currentNumber: "",
    expression: [],
    result: DEFAULT_RESULT,
    isEqualsPressed: false,
}

/**
 * Resets the calculator state to its default values.
 */
function resetCalculatorState() {
    calculatorState.currentNumber = "";
    calculatorState.result = DEFAULT_RESULT;
    calculatorState.expression = [];
    calculatorState.isEqualsPressed = false;
}

/**
 * Handles digit input from a button click or keyboard press.
 * @param {Event} event - The input event.
 */
function handleDigitInput(event) {
    if (calculatorState.isEqualsPressed) {
        resetCalculatorState();
    }

    const digit = extractEventInput(event);

    calculatorState.currentNumber === DEFAULT_RESULT ? calculatorState.currentNumber = digit : calculatorState.currentNumber += digit;
    updateScreen(calculatorState.currentNumber);
}

/**
 * Handles operator input from a button click or keyboard press.
 * @param {Event} event - The input event.
 */
function handleOperatorInput(event) {
    if (calculatorState.isEqualsPressed) {
        calculatorState.isEqualsPressed = false;
    }

    let operator = extractEventInput(event);

    if (operator === "x") {
        operator = "*";
    }

    if (calculatorState.currentNumber) {
        calculatorState.expression.push(calculatorState.currentNumber);

        if (isValidExpression(calculatorState.expression)) {
            const result = evaluateExpression(calculatorState.expression);

            if (isInvalidResult(result)) {
                resetCalculatorState();
                updateScreen(ERROR_MESSAGE);
            }

            else {
                calculatorState.result = result.toString();
                calculatorState.expression = [];
                calculatorState.expression.push(calculatorState.result);
                updateScreen(calculatorState.result);
            }
        }

        calculatorState.expression.push(operator);
        calculatorState.currentNumber = "";
    }

    else if (calculatorState.expression.length === 2) {
        calculatorState.expression[1] = operator;
    }
}

/**
 * Handles equals input for evaluating an expression.
 */
function handleEqualsInput() {
    if (calculatorState.expression.length === 2) {
        calculatorState.expression.push(calculatorState.currentNumber);

        if (isValidExpression(calculatorState.expression)) {
            const result = evaluateExpression(calculatorState.expression);

            if (isInvalidResult(result)) {
                resetCalculatorState();
                updateScreen(ERROR_MESSAGE);
            }

            else {
                calculatorState.result = result.toString();
                calculatorState.currentNumber = calculatorState.result;
                calculatorState.expression = [];
                updateScreen(calculatorState.result);
                calculatorState.isEqualsPressed = true;
            }
        }
    }
}

/**
 * Handles decimal point input on current number.
 */
function handleDecimalInput() {
    if (calculatorState.isEqualsPressed) {
        resetCalculatorState();
    }

    if (!calculatorState.currentNumber.includes(".")) {
        if (calculatorState.currentNumber === "") {
            calculatorState.currentNumber = "0.";
        }
        else {
            calculatorState.currentNumber += ".";
        }

        updateScreen(calculatorState.currentNumber);
    }
}

/**
 * Handles backspace input to remove the last digit from the current number.
 */
function handleBackspaceInput() {
    if (calculatorState.currentNumber.length <= 1) {
        calculatorState.currentNumber = "";
        updateScreen(DEFAULT_RESULT);
    }
    else {
        calculatorState.currentNumber = calculatorState.currentNumber.slice(0, -1);
        updateScreen(calculatorState.currentNumber);
    }
}

/**
 * Initializes the button click and keyboard event listeners.
 */
function initializeCalculatorButtons() {
    const clearButton = document.querySelector(".clear-button");
    const equalButton = document.querySelector(".equal-button");
    const digitButtons = document.querySelectorAll(".input-button");
    const operatorButtons = document.querySelectorAll(".operator-button");
    const backspaceButton = document.querySelector(".backspace");
    const decimalButton = document.querySelector(".decimal-button");

    digitButtons.forEach(button => {
        button.addEventListener("click", event => {
            handleDigitInput(event);
        });
    });

    clearButton.addEventListener("click", () => {
        resetCalculatorState();
        updateScreen(calculatorState.result);
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", event => {
            handleOperatorInput(event);
        });
    });

    equalButton.addEventListener("click", () => {
        handleEqualsInput();
    });

    backspaceButton.addEventListener("click", () => {
        handleBackspaceInput();
    });

    decimalButton.addEventListener("click", () => {
        handleDecimalInput();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            resetCalculatorState();
            updateScreen(calculatorState.result);
        }

        else if (event.key === "=" || event.key === "Enter") {
            handleEqualsInput();
        }

        else if (event.key === ".") {
            handleDecimalInput();
        }

        else if (event.key === "Backspace") {
            handleBackspaceInput();
        }

        else if (ARITHMETIC_KEYS.includes(event.key)) {
            handleOperatorInput(event);
        }

        else if (isFinite(event.key)) {
            handleDigitInput(event);
        }
    });
}

/**
 * Updates the calculator screen with the provided string.
 * @param {string} str - The string value to be displayed. 
 */
function updateScreen(str) {
    const screen = document.querySelector(".screen");
    screen.innerText = str;
}

/**
 * Retrieves the user input from a click or keyboard event.
 * @param {Event} - input event.
 * @returns {string} - The retrieved input value. 
 */
function extractEventInput(event) {
    return event.type === "click" ? event.target.innerText : event.key;
}

export { DEFAULT_RESULT, calculatorState, resetCalculatorState, handleDigitInput, handleOperatorInput, handleEqualsInput, handleDecimalInput, handleBackspaceInput };