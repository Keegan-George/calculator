initalizeInputButtons();

let result = "0";
let currentNumber = "";
let operator = "";
let expression = [];

const errorMessage = "E R R O R";
let isEqualsPressed = false;

const arithmeticKeys = ["+", "-", "*", "/"]


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

function clear() {
    currentNumber = "";
    result = "0";
    operator = "";
    expression = [];
}

function digitPress(event) {
    if (isEqualsPressed) {
        clear();
        isEqualsPressed = false;
    }

    let digit;

    if (event.type === "click") {
        digit = event.target.innerText;
    }
    else if (event.type === "keydown") {
        digit = event.key;
    }

    currentNumber === "0" ? currentNumber = digit : currentNumber += digit;
    updateScreen(currentNumber);
}


function operatorPress(event) {
    if (isEqualsPressed) {
        isEqualsPressed = false;
    }

    if (event.type === "click"){
        operator = event.target.innerText;
    }

    else if (event.type === "keydown"){
        if (event.key === "*"){
            operator = "x";
        }

        else {
            operator = event.key;
        }
    }


    if (currentNumber) {
        expression.push(currentNumber);

        if (isValidExpression(expression)) {
            result = evaluateExpression(expression);

            if (isNaN(result) || !isFinite(result)) {
                clear();
                updateScreen(errorMessage);
            }

            else {
                expression = [];
                expression.push(result);
                updateScreen(result);
            }
        }

        expression.push(operator);
        currentNumber = "";
    }

    else if (expression.length == 2) {
        expression[1] = operator;
    }
}

function equalPress() {
    if (expression.length == 2) {
        expression.push(currentNumber);

        if (isValidExpression(expression)) {
            result = evaluateExpression(expression);

            if (isNaN(result) || !isFinite(result)) {
                clear();
                updateScreen(errorMessage);
            }

            else {
                currentNumber = result;
                expression = [];
                updateScreen(result);
                isEqualsPressed = true;
            }
        }
    }
}

function decimalPress() {
    if (currentNumber.indexOf(".") === -1) {
        if (currentNumber === "") {
            currentNumber = "0.";
        }
        else {
            currentNumber += "."
        }

        updateScreen(currentNumber);
    }
}

function backspacePress() {
    if (currentNumber.length === 1) {
        currentNumber = "";
        updateScreen("0");
    }
    else {
        currentNumber = currentNumber.slice(0, -1);
        updateScreen(currentNumber);
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
            digitPress(event);
        });
    });

    clearButton.addEventListener("click", () => {
        clear();
        updateScreen(result);
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", event => {
            operatorPress(event);
        });
    });

    equalButton.addEventListener("click", () => {
        equalPress();
    });

    backspaceButton.addEventListener("click", () => {
        backspacePress();
    });

    decimalButton.addEventListener("click", () => {
        decimalPress();
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            clear();
            updateScreen(result);
        }

        else if (event.key === "=" || event.key === "Enter") {
            equalPress();
        }

        else if (event.key === ".") {
            decimalPress();
        }

        else if (event.key === "Backspace") {
            backspacePress();
        }

        else if (arithmeticKeys.indexOf(event.key) !== -1) {
            operatorPress(event);
        }

        else if (isFinite(event.key)) {
            digitPress(event);
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
