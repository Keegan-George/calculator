initalizeInputButtons();

let result = "0";
let currentNumber = "";
let operator = "";
let expression = [];

const error_message = "E R R O R";
let isEqualsPressed = false;


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return round(add(num1, num2));

        case "-":
            return round(subtract(num1, num2));

        case "x":
            return round(multiply(num1, num2));

        case "/":
            return round(divide(num1, num2));
    }
}

function initalizeInputButtons() {
    const clearButton = document.querySelector(".clear-button");
    const equalButton = document.querySelector(".equal-button");
    const digitButtons = document.querySelectorAll(".input-button");
    const operatorButtons = document.querySelectorAll(".operator-button");
    const backspaceButton = document.querySelector(".backspace");
    const decimalButton = document.querySelector(".decimal-button");

    digitButtons.forEach(button => {
        button.addEventListener("click", event => {
            if (isEqualsPressed) {
                clear();
                isEqualsPressed = false;
            }

            let digit = event.target.innerText;

            currentNumber === "0" ? currentNumber = digit : currentNumber += digit;
            updateScreen(currentNumber);
        });
    });

    clearButton.addEventListener("click", () => {
        clear();
        updateScreen(result);
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", event => {
            if (isEqualsPressed) {
                isEqualsPressed = false;
            }

            operator = event.target.innerText;

            if (currentNumber) {
                expression.push(currentNumber);

                if (isValidExpression(expression)) {
                    result = evaluateExpression(expression);
                    expression = [];
                    expression.push(result);
                    updateScreen(result);
                }

                expression.push(operator);
                currentNumber = "";
            }

            else if (expression.length == 2) {
                expression[1] = operator;
            }
        });
    });

    equalButton.addEventListener("click", () => {
        if (expression.length == 2) {

            expression.push(currentNumber);

            if (isValidExpression(expression)) {
                result = evaluateExpression(expression);
                currentNumber = result;
                expression = [];
                updateScreen(result);
                isEqualsPressed = true;
            }
        }
    });

    backspaceButton.addEventListener("click", () => {
        if (currentNumber.length === 1) {
            currentNumber = "";
            updateScreen("0");
        }
        else {
            currentNumber = currentNumber.slice(0, -1);
            updateScreen(currentNumber);
        }
    });

    decimalButton.addEventListener("click", () => {
        if (currentNumber.indexOf(".") === -1) {
            if (currentNumber === "") {
                currentNumber = "0.";
            }
            else {
                currentNumber += "."
            }

            updateScreen(currentNumber);
        }
    })
}

function updateScreen(str) {
    const screen = document.querySelector(".screen");
    screen.innerText = str;
}

function round(number, precision = 11) {
    const decimalPlaces = 10 ** precision;
    return Math.round(number * decimalPlaces) / decimalPlaces;
}

function clear() {
    currentNumber = "";
    result = "0";
    operator = "";
    expression = [];
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

function isInvalidNumber(num) {
    return isNaN(result) || !isFinite(result)
}
