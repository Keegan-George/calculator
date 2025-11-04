initalizeInputButtons();
let operator = "";
let num1;
let num2;
let result = 0;

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

        case "*":
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
            display.innerText === "0" ? display.innerText = digit : display.innerText += digit;
        });
    });

    clearButton.addEventListener("click", () => {
        num1 = num2 = result = 0;
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
            result = operator(operator, num1, num2)
        }
    })
}