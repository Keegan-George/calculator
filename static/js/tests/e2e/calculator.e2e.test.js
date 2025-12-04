import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5500");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Calculator");
});

test("add numbers", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "+" }).click();

  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("2");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("5");
});

test("subtract numbers", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "-" }).click();

  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("2");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("1");
});

test("multiply numbers", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "x" }).click();

  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("2");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("6");
});

test("divide numbers", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "6" }).click();
  await expect(screen).toContainText("6");

  await page.getByRole("button", { name: "/" }).click();

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("2");
});

test("divide number by 0", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "6" }).click();
  await expect(screen).toContainText("6");

  await page.getByRole("button", { name: "/" }).click();

  await page.getByRole("button", { name: "0" }).click();
  await expect(screen).toContainText("0");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("E R R O R");
});


test("divide 0 by 0", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "0" }).click();
  await expect(screen).toContainText("0");

  await page.getByRole("button", { name: "/" }).click();

  await page.getByRole("button", { name: "0" }).click();
  await expect(screen).toContainText("0");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("E R R O R");
});

test("new expression after equals", async ({ page }) => {
  const screen = page.locator(".screen");

  //expression 1
  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("2");

  await page.getByRole("button", { name: "+" }).click();

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("5");

  //expression 2
  await page.getByRole("button", { name: "6" }).click();
  await expect(screen).toContainText("6");

  await page.getByRole("button", { name: "x" }).click();

  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("2");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("12");

});

test("operator continues expression", async ({ page }) => {
  const screen = page.locator(".screen");

  //expression
  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("2");

  await page.getByRole("button", { name: "+" }).click();

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("5");

  //continue expression
  await page.getByRole("button", { name: "x" }).click();

  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("2");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("10");
});

test("enter all digits", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "9" }).click();
  await expect(screen).toContainText("9");

  await page.getByRole("button", { name: "8" }).click();
  await expect(screen).toContainText("98");

  await page.getByRole("button", { name: "7" }).click();
  await expect(screen).toContainText("987");

  await page.getByRole("button", { name: "6" }).click();
  await expect(screen).toContainText("9876");

  await page.getByRole("button", { name: "5" }).click();
  await expect(screen).toContainText("98765");

  await page.getByRole("button", { name: "4" }).click();
  await expect(screen).toContainText("987654");

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("9876543");

  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("98765432");

  await page.getByRole("button", { name: "1" }).click();
  await expect(screen).toContainText("987654321");

  await page.getByRole("button", { name: "0" }).click();
  await expect(screen).toContainText("9876543210");
});

test("delete digits", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "9" }).click();
  await expect(screen).toContainText("9");

  await page.getByRole("button", { name: "8" }).click();
  await expect(screen).toContainText("98");

  await page.getByRole("button", { name: "7" }).click();
  await expect(screen).toContainText("987");

  await page.getByRole("button", { name: "<" }).click();
  await expect(screen).toContainText("98");

  await page.getByRole("button", { name: "<" }).click();
  await expect(screen).toContainText("9");

  await page.getByRole("button", { name: "<" }).click();
  await expect(screen).toContainText("0");
});

test("clear digits", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "9" }).click();
  await expect(screen).toContainText("9");

  await page.getByRole("button", { name: "8" }).click();
  await expect(screen).toContainText("98");

  await page.getByRole("button", { name: "7" }).click();
  await expect(screen).toContainText("987");

  await page.getByRole("button", { name: "CE" }).click();
  await expect(screen).toContainText("0");
});

test("add floats", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "." }).click();
  await expect(screen).toContainText("3.");

  await page.getByRole("button", { name: "8" }).click();
  await expect(screen).toContainText("3.8");

  await page.getByRole("button", { name: "+" }).click();

  await page.getByRole("button", { name: "2" }).click();
  await expect(screen).toContainText("2");

  await page.getByRole("button", { name: "." }).click();
  await expect(screen).toContainText("2.");

  await page.getByRole("button", { name: "1" }).click();
  await expect(screen).toContainText("1");

  await page.getByRole("button", { name: "=" }).click();

  await expect(screen).toContainText("5.9");
});

test("Number allows only one decimal", async ({ page }) => {
  const screen = page.locator(".screen");

  await page.getByRole("button", { name: "3" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "." }).click();
  await expect(screen).toContainText("3.");

  await page.getByRole("button", { name: "." }).click();
  await expect(screen).toContainText("3.");

  await page.getByRole("button", { name: "<" }).click();
  await expect(screen).toContainText("3");

  await page.getByRole("button", { name: "." }).click();
  await expect(screen).toContainText("3.");
});