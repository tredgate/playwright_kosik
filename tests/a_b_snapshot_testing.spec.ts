import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("pw_skoleni");
  await page.locator("#password").fill("TEG2023");
  await page.locator(".btn").click();
  await page.locator("li#Users .menu-itemsitems1").click();
  await expect(page.locator('[test_id="Add User"]')).toBeVisible();
});

test("Compare Projects by Snapshots", async ({ page }) => {
  await expect(page).toHaveScreenshot("projects_snapshot.png", {
    mask: [
      page.locator('[test_id="fieldtype_id"]'),
      page.locator('[test_id="Priority"]'),
      page.locator('[test_id="Name"]'),
      page.locator('[test_id="Status"]'),
      page.locator('[test_id="Start Date"]'),
      page.locator('[test_id="fieldtype_date_added"]'),
      page.locator('[test_id="fieldtype_created_by"]'),
      page.locator("nobr:nth-child(2) strong:nth-child(1)"),
    ],
  });
});
