import { test, expect } from "@playwright/test";

test("Profile Mock Test", async ({ page }) => {
  const email = "testujeme@mocky.cz";
  await page.route("**/tegb/profile", async (route) => {
    const json = {
      userId: 975,
      name: "Petr",
      surname: "Košíkový",
      age: 112,
      email: email,
      phone: 123456789,
    };
    await route.fulfill({ status: 200, body: JSON.stringify(json) });
  });

  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");
  await page.locator("[data-testid='username-input']").fill("kosik_test");
  await page.locator("[data-testid='password-input']").fill("Heslo1234");
  await page.locator("[data-testid='submit-button']").click();
  await expect(page.locator("[data-testid='email']")).toContainText(email);
});
