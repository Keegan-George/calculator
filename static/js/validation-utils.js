import { operate } from "./math-utils.js";

const ARITHMETIC_KEYS = ["+", "-", "*", "/"];

/**
 * Determines if the calculator expression array is a valid math expression.
 * @param {string[]} expression - An array expected in the format [num1, operator, num2].  
 * @returns {boolean} True if a valid expression, false otherwise.
 */
function isValidExpression(expression) {
    const [num1, op, num2] = expression;

    if (expression.length === 3){
        if (!isNaN(num1) && !isNaN(num2) && ARITHMETIC_KEYS.includes(op)) {
            return true;
        }
    }

    return false;
}

/**
 * Evaluates a valid math expression
 * @param {string[]} expression - An array expected in the format [num1, operator, num2].
 * @returns {number} The resut of the expression.
 */
function evaluateExpression(expression) {
    const [num1, op, num2] = expression;
    return operate(op, +num1, +num2);
}

/**
 * Evaluates that the result is a valid number
 * @param {number} result - The number to be validated.
 * @returns {boolean} True if invalid, false otherwise.
 */
function isInvalidResult(result) {
    return isNaN(result) || !isFinite(result);
}

export { ARITHMETIC_KEYS, isValidExpression, evaluateExpression, isInvalidResult };

