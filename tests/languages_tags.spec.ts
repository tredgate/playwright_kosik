import { test, expect } from "@playwright/test";

test("Czech test @cz", async ({ page }) => {
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com");
  await page.locator('[data-testid="username-input"]').fill("Česká verze!");
});

test("English test @en", async ({ page }) => {
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com");
  await page.locator('[data-testid="username-input"]').fill("English version!");
});

test("Czech And English test @cz @en", async ({ page }) => {
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com");
  await page
    .locator('[data-testid="username-input"]')
    .fill("Czech and English version!");
});
