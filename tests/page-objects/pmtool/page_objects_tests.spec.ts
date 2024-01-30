import { test } from "@playwright/test";
import { LoginPage } from "../../../pages/pmtool/login_page";
import { HomePage } from "../../../pages/pmtool/home_page";

test("Test Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.fillUsername("pw_skoleni");
  await loginPage.fillPassword("TEG2023");
  await loginPage.submitLogin();
});

test("Login and Logout Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.openPmtool();
  await loginPage.fillUsername("pw_skoleni");
  await loginPage.fillPassword("TEG2023");
  await loginPage.submitLogin();
  await homePage.clickProfile();
  await homePage.clickLogout();
});

test("Login using group method", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.loginSuccessfully("pw_skoleni", "TEG2023");
});
