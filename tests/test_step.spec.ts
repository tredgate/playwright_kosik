import { test, expect } from "@playwright/test";

test("Pmtool Login and logout", async ({ page }) => {
  await test.step("Open Pmtool", async () => {
    await page.goto("https://tredgate.com/pmtool/");
  });

  await test.step("Login", async () => {
    await test.step("Fill username", async () => {
      await page.locator("#username").fill("pw_skoleni");
    });
    await test.step("Fill password", async () => {
      await page.locator("#password").fill("TEG2023");
    });
    await test.step("Click login", async () => {
      await page.locator(".btn").click();
    });
  });
  await test.step("Logout", async () => {
    await test.step("Click profile menu", async () => {
      // Chromium je moc rychlé, takže musíme počkat, až se načte ikona zvonku
      await expect(page.locator(".fa-bell-o")).toBeVisible();
      await page.locator("#user_dropdown").click();
    });
    await test.step("Click logout button", async () => {
      await page.locator("#logout").click();
    });

    await test.step("Assert: Login is successful", async () => {
      await expect(page.locator("#username")).toBeVisible();
    });
  });
});
