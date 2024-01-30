import { test } from "@playwright/test";
import { FluentLoginPage } from "../../../pages/pmtool/fluent/fluent_login_page";

test("Test Using Fluent API", async ({ page }) => {
  const loginPage = await new FluentLoginPage(page);
  await loginPage
    .openPmtool()
    .then((page) => page.loginSuccessfully("pw_skoleni", "TEG2023"))
    .then((page) => page.clickProfile())
    .then((page) => page.clickLogout())
    .then((page) => page.fillUsername("Tradá"));
});
