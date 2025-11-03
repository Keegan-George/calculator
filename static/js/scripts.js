initalizeInputButtons();


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
    const digitButtons = document.querySelectorAll(".digit-button")
    const clearButton = document.querySelector(".clear-button")

    digitButtons.forEach(button => {
        button.addEventListener("click", event => {
            display.innerText += event.target.innerText; 
        });
    });

    clearButton.addEventListener("click", () => {
        display.innerText = "0";
    })
}