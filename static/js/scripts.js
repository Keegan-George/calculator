initalizeInputButtons();

let operator = "";
let result = "0";
let current = "0";
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

    digitButtons.forEach(button => {
        button.addEventListener("click", event => {
            if (isEqualsPressed){
                clear();
                isEqualsPressed = false;
            }

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
            if (isEqualsPressed){
                isEqualsPressed = false;
            }

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
            isEqualsPressed = true;
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
    operator = "";
    expression = [];
    result = current = "0";  
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
