import { operate } from "./math-utils.js";

/**
 * Determines if the calculator expression array is a valid math expression.
 * @param {string[]} expression - An array expected in the format [num1, operator, num2].  
 * @returns {boolean} True if a valid expression, false otherwise.
 */
function isValidExpression(expression) {
    const [num1, op, num2] = expression;

    if (!isNaN(num1) && !isNaN(num2) && op) {
        return true;
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
 * 
 * @param {number} result - The number to be validated.
 * @returns {boolean} True if invalid, false otherwise.
 */
function isInvalidResult(result) {
    return isNaN(result) || !isFinite(result);
}

export { isValidExpression, evaluateExpression, isInvalidResult };

