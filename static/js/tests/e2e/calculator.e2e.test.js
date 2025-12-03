import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto("http://localhost:5500");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("Calculator");
});

test("add numbers", async ({page}) => {
  await page.getByRole("button", {name: "3"}).click();
  await page.getByRole("button", {name: "+"}).click();
  await page.getByRole("button", {name: "2"}).click();
  await page.getByRole("button", {name: "="}).click();

  const screen = page.locator(".screen");

  await expect(screen).toContainText("5");
});

















//Example spec

// // @ts-check
// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
