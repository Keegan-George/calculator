const { operate, round } = require("./math-utils.js");

test("Adds two integers together", () => {
    expect(operate("+", 2, 3)).toBe(5);
});

test("Add two large numbers together", () => {
    expect(operate("+", 99999999, 99999999)).toBe(199999998);
});
