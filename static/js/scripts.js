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
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "x":
            return multiply(num1, num2);

        case "/":
            return divide(num1, num2);
    }
}

function initalizeInputButtons() {
    const display = document.querySelector(".display");
    const digitButtons = document.querySelectorAll(".digit-button");
    const clearButton = document.querySelector(".clear-button");
    const operatorButtons = document.querySelectorAll(".operator-button");
    const equalButton = document.querySelector(".equal-button");

    digitButtons.forEach(button => {
        button.addEventListener("click", event => {
            let digit = event.target.innerText;

            if (operator) {
                num2 === "0" ? num2 = digit : num2 += digit;
                display.innerText = num2;
            }
            else {
                num1 === "0" ? num1 = digit : num1 += digit;
                display.innerText = num1;
            }
        });
    });

    clearButton.addEventListener("click", () => {
        num1 = num2 = result = "0";
        operator = ""
        display.innerText = result;
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", event => {
            operator = event.target.innerText;
        });
    });

    equalButton.addEventListener("click", () => {
        if (num1 && num2 && operator) {
            result = operate(operator, +num1, +num2);
            display.innerText = result;

            num1 = result;
            num2 = "0";
        }   
    })
}