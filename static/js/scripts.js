initalizeInputButtons();
let operator = "";
let num1, num2, result;
num1 = num2 = result = "0";

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
    const digitButtons = document.querySelectorAll(".digit-button");
    const clearButton = document.querySelector(".clear-button");
    const operatorButtons = document.querySelectorAll(".operator-button");
    const equalButton = document.querySelector(".equal-button");

    digitButtons.forEach(button => {
        button.addEventListener("click", event => {
            let digit = event.target.innerText;

            if (operator) {
                num2 === "0" ? num2 = digit : num2 += digit;
                updateDisplay(num2)
            }
            else {
                num1 === "0" ? num1 = digit : num1 += digit;
                updateDisplay(num1);
            }
        });
    });

    clearButton.addEventListener("click", () => {
        num1 = num2 = result = "0";
        operator = ""
        updateDisplay(result);
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", event => {
            if (operator) {
                result = operate(operator, +num1, +num2);
                updateDisplay(result);

                num1 = result;
                num2 = "0";
            }

            operator = event.target.innerText;
        });
    });

    equalButton.addEventListener("click", () => {
        if (num1 && num2 && operator) {
            result = operate(operator, +num1, +num2);
            updateDisplay(result);

            num1 = result;
            num2 = "0";
            operator = "";
        }
    })
}

function updateDisplay(str) {
    const display = document.querySelector(".display");
    display.innerText = str;
}

function round(number, precision = 11) {
    const decimalPlaces = 10 ** precision;

    return Math.round(number * decimalPlaces) / decimalPlaces;
}


