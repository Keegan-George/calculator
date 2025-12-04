import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});


async function press(page, key) {
  await page.getByRole("button", { name: key }).click();
}

async function expectScreen(page, value) {
  const screen = page.locator(".screen");
  await expect(screen).toContainText(value);
}

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Calculator");
});

test("add numbers", async ({ page }) => {
  await press(page, "3");
  await expectScreen(page, "3");

  await press(page, "+");

  await press(page, "2");
  await expectScreen(page, "2");

  await press(page, "=");

  await expectScreen(page, "5");
});

test("subtract numbers", async ({ page }) => {
  await press(page, "3");
  await expectScreen(page, "3");

  await press(page, "-");

  await press(page, "2");
  await expectScreen(page, "2");

  await press(page, "=");

  await expectScreen(page, "1");
});

test("multiply numbers", async ({ page }) => {
  await press(page, "3");
  await expectScreen(page, "3");

  await press(page, "x");

  await press(page, "2");
  await expectScreen(page, "2");

  await press(page, "=");

  await expectScreen(page, "6");
});

test("divide numbers", async ({ page }) => {
  await press(page, "6");
  await expectScreen(page, "6");

  await press(page, "/");

  await press(page, "2");
  await expectScreen(page, "2");

  await press(page, "=");

  await expectScreen(page, "3");
});

test("divide number by 0", async ({ page }) => {
  await press(page, "6");
  await expectScreen(page, "6");

  await press(page, "/");

  await press(page, "0");
  await expectScreen(page, "0");

  await press(page, "=");

  await expectScreen(page, "E R R O R");
});


test("divide 0 by 0", async ({ page }) => {
  await press(page, "0");
  await expectScreen(page, "0");

  await press(page, "/");

  await press(page, "0");
  await expectScreen(page, "0");

  await press(page, "=");

  await expectScreen(page, "E R R O R");
});

test("new expression after equals", async ({ page }) => {
  //expression 1
  await press(page, "2");
  await expectScreen(page, "2");

  await press(page, "+");

  await press(page, "3");
  await expectScreen(page, "3");

  await press(page, "=");

  await expectScreen(page, "5");

  //expression 2
  await press(page, "6");
  await expectScreen(page, "6");

  await press(page, "x");

  await press(page, "3");
  await expectScreen(page, "3");

  await press(page, "=");

  await expectScreen(page, "18");
});

test("operator continues expression", async ({ page }) => {
  //expression 1
  await press(page, "2");
  await expectScreen(page, "2");

  await press(page, "+");

  await press(page, "3");
  await expectScreen(page, "3");

  await press(page, "=");

  await expectScreen(page, "5");

  //continue expression
  await press(page, "x");

  await press(page, "2");
  await expectScreen(page, "2");

  await press(page, "=");

  await expectScreen(page, "10");
});

test("enter all digits", async ({ page }) => {
  await press(page, "9");
  await expectScreen(page, "9");

  await press(page, "8");
  await expectScreen(page, "98");

  await press(page, "7");
  await expectScreen(page, "987");

  await press(page, "6");
  await expectScreen(page, "9876");

  await press(page, "5");
  await expectScreen(page, "98765");

  await press(page, "4");
  await expectScreen(page, "987654");

  await press(page, "3");
  await expectScreen(page, "9876543");

  await press(page, "2");
  await expectScreen(page, "98765432");

  await press(page, "1");
  await expectScreen(page, "987654321");

  await press(page, "0");
  await expectScreen(page, "9876543210");
});

test("delete digits", async ({ page }) => {
  await press(page, "9");
  await expectScreen(page, "9");

  await press(page, "8");
  await expectScreen(page, "98");

  await press(page, "7");
  await expectScreen(page, "987");

  await press(page, "<");
  await expectScreen(page, "98");

  await press(page, "<");
  await expectScreen(page, "9");

  await press(page, "<");
  await expectScreen(page, "0");
});

test("clear digits", async ({ page }) => {
  await press(page, "9");
  await expectScreen(page, "9");

  await press(page, "8");
  await expectScreen(page, "98");

  await press(page, "7");
  await expectScreen(page, "987");

  await press(page, "CE");
  await expectScreen(page, "0");
});

test("add floats", async ({ page }) => {
  await press(page, "3");
  await expectScreen(page, "3");

  await press(page, ".");
  await expectScreen(page, "3.");

  await press(page, "8");
  await expectScreen(page, "3.8");

  await press(page, "+");

  await press(page, "2");
  await expectScreen(page, "2");

  await press(page, ".");
  await expectScreen(page, "2.");

  await press(page, "1");
  await expectScreen(page, "2.1");

  await press(page, "=");
  await expectScreen(page, "5.9");
});

test("Number allows only one decimal", async ({ page }) => {
  await press(page, "3");
  await expectScreen(page, "3");

  await press(page, ".");
  await expectScreen(page, "3.");

  await press(page, ".");
  await expectScreen(page, "3.");

  await press(page, "<");
  await expectScreen(page, "3");

  await press(page, ".");
  await expectScreen(page, "3.");
});