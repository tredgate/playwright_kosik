import { test, expect } from "@playwright/test";

test.describe("PMTool login tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/pmtool");
  });

  test("Successful login", async ({ page }) => {
    await page.locator("#username").fill("pw_skoleni");
    await page.locator("#password").fill("TEG2023");
    await page.locator(".btn").click();
    await expect(page.locator("#welcome-page-header")).toBeVisible();
  });

  test.skip("Failed login", async ({ page }) => {
    await page.locator("#username").fill("wrong");
    await page.locator("#password").fill("wrong");
    await page.locator(".btn").click();
    await expect(page.locator(".alert-danger")).toBeVisible();
  });
});
