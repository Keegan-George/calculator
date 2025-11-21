const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
}

/**
 * Performs the specified arithmetic operation on two numbers and rounds the result.
 * @param {string} operator - The arithmetic operator ("+", "-", "*", "/").
 * @param {number} num1 - The first operand.
 * @param {number} num2 - The second operand.
 * @returns {number} The rounded result of the operation.
 */
function operate(operator, num1, num2) {
    return round(operations[operator](num1, num2));
}

/**
 * Rounds a number to the specified precision.
 * @param {number} number - The number to be rounded.
 * @param {number} precision - Number of decimal places.
 * @returns {number} The rounded number.
 */
function round(number, precision = 11) {
    const decimalPlaces = 10 ** precision;
    return Math.round(number * decimalPlaces) / decimalPlaces;
}

module.exports = {operate, round};