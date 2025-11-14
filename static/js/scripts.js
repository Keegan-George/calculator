initializeButtons();

//constants
const DEFAULT_RESULT = "0";
const ERROR_MESSAGE = "E R R O R";
const arithmeticKeys = ["+", "-", "*", "/"]

const calculatorState = {
    operator: "",
    currentNumber: "",
    expression: [],
    result: DEFAULT_RESULT,
    isEqualsPressed: false,
}

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "/": (a, b) => a / b,
}

function operate(operator, num1, num2) {
    return round(operations[operator](num1, num2));
}

function clear() {
    calculatorState.currentNumber = "";
    calculatorState.result = "0";
    calculatorState.operator = "";
    calculatorState.expression = [];
    calculatorState.isEqualsPressed = false;
}

function handleDigitInput(event) {
    if (calculatorState.isEqualsPressed) {
        clear();
    }

    let digit;

    if (event.type === "click") {
        digit = event.target.innerText;
    }
    else if (event.type === "keydown") {
        digit = event.key;
    }

    calculatorState.currentNumber === "0" ? calculatorState.currentNumber = digit : calculatorState.currentNumber += digit;
    updateScreen(calculatorState.currentNumber);
}


function handleOperatorInput(event) {
    if (calculatorState.isEqualsPressed) {
        calculatorState.isEqualsPressed = false;
    }

    if (event.type === "click") {
        calculatorState.operator = event.target.innerText;
    }

    else if (event.type === "keydown") {
        if (event.key === "*") {
            calculatorState.operator = "x";
        }

        else {
            calculatorState.operator = event.key;
        }
    }


    if (calculatorState.currentNumber) {
        calculatorState.expression.push(calculatorState.currentNumber);

        if (isValidExpression(calculatorState.expression)) {
            calculatorState.result = evaluateExpression(calculatorState.expression);

            if (isNaN(calculatorState.result) || !isFinite(calculatorState.result)) {
                clear();
                updateScreen(ERROR_MESSAGE);
            }

            else {
                calculatorState.expression = [];
                calculatorState.expression.push(calculatorState.result);
                updateScreen(calculatorState.result);
            }
        }

        calculatorState.expression.push(calculatorState.operator);
        calculatorState.currentNumber = "";
    }

    else if (calculatorState.expression.length == 2) {
        calculatorState.expression[1] = calculatorState.operator;
    }
}

function handleEqualsInput() {
    if (calculatorState.expression.length == 2) {
        calculatorState.expression.push(calculatorState.currentNumber);

        if (isValidExpression(calculatorState.expression)) {
            calculatorState.result = evaluateExpression(calculatorState.expression);

            if (isNaN(calculatorState.result) || !isFinite(calculatorState.result)) {
                clear();
                updateScreen(ERROR_MESSAGE);
            }

            else {
                calculatorState.currentNumber = calculatorState.result;
                calculatorState.expression = [];
                updateScreen(calculatorState.result);
                calculatorState.isEqualsPressed = true;
            }
        }
    }
}

function handleDecimalInput() {
    if (calculatorState.currentNumber.indexOf(".") === -1) {
        if (calculatorState.currentNumber === "") {
            calculatorState.currentNumber = "0.";
        }
        else {
            calculatorState.currentNumber += "."
        }

        updateScreen(calculatorState.currentNumber);
    }
}

function handleBackspaceInput() {
    if (calculatorState.currentNumber.length === 1) {
        calculatorState.currentNumber = "";
        updateScreen("0");
    }
    else {
        calculatorState.currentNumber = calculatorState.currentNumber.slice(0, -1);
        updateScreen(calculatorState.currentNumber);
    }
}

function initializeButtons() {
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
        clear();
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
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            clear();
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

        else if (arithmeticKeys.indexOf(event.key) !== -1) {
            handleOperatorInput(event);
        }

        else if (isFinite(event.key)) {
            handleDigitInput(event);
        }
    });
}

function updateScreen(str) {
    const screen = document.querySelector(".screen");
    screen.innerText = str;
}

function round(number, precision = 11) {
    const decimalPlaces = 10 ** precision;
    return Math.round(number * decimalPlaces) / decimalPlaces;
}

function isValidExpression(expression) {
    const [num1, op, num2] = expression;

    if (!isNaN(num1) && !isNaN(num2) && op) {
        return true;
    }

    return false;
}

function evaluateExpression(expression) {
    const [num1, op, num2] = expression
    return operate(op, +num1, +num2);
}
