initalizeInputButtons();
let operator = "";
let num1, num2, result;
num1 = num2 = result = "0";
equalsButtonPressed = false;
error_message = "E R R O R";


let current = "0";
let expression = [];

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

    digitButtons.forEach(button => {
        button.addEventListener("click", event => {
            let digit = event.target.innerText;

            current === "0" ? current = digit : current += digit;
            updateScreen(current);
        });
    });

    clearButton.addEventListener("click", () => {
        clear();
        updateScreen(result);
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", event => {
            expression.push(current);

            if (isValidExpression(expression)) {
                result = evaluateExpression(expression);
                expression = [];
                current = result;
                expression.push(current);
                updateScreen(result);
            }

            operator = event.target.innerText;
            expression.push(operator);
            current = "0";
        });
    });

    equalButton.addEventListener("click", () => {
        expression.push(current);

        if (isValidExpression(expression)) {
            result = evaluateExpression(expression);
            current = result;
            expression = [];
            updateScreen(result);
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

function clear() {
    num1 = num2 = result = current = "0";
    expression = [];
    operator = ""
}

function isValidExpression(expression) {
    [num1, operator, num2] = expression;

    if (!isNaN(num1) && !isNaN(num2) && operator) {
        return true;
    }

    return false;
}

function evaluateExpression(expression) {
    [num1, operator, num2] = expression;
    return operate(operator, +num1, +num2);
}

function isInvalidNumber(num) {
    return isNaN(result) || !isFinite(result)
}
