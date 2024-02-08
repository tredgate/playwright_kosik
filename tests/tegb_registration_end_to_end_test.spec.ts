import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

test("Register user in TEG#B and check API", async ({ page }) => {
  const username = faker.internet.userName();
  const email = faker.internet.exampleEmail();
  console.log(username);
  console.log(email);
  const password = "123456";

  await page.route(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register",
    (route, request) => {
      console.log(request.postData());
      route.continue();
    }
  );

  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");
  await page.locator('[data-testid="register-button"]').click();
  await page.locator("//input[@data-testid='username-input']").fill(username);
  await page.locator("//input[@data-testid='email-input']").fill(email);
  await page.locator("//input[@data-testid='password-input']").fill(password);
  await page.locator("//button[@data-testid='submit-button']").click();

  const response = await page.waitForResponse(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register"
  );
  const responseBody = await response.json();
  expect(responseBody.username).toBe(username);
  expect(responseBody.email).toBe(email);
  expect(responseBody.userId).toBeDefined();
  expect(typeof responseBody.userId).toBe("number");
  expect(responseBody.updatedAt).toBe(null);
  expect(responseBody.active).toBe(1);
});
