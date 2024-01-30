import { test } from "@playwright/test";

test("Failing test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username2").fill("failing");
});
