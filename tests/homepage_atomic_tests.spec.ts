import { test, expect } from "@playwright/test";
import { FluentLoginPage } from "../pages/pmtool/fluent/fluent_login_page";
import { FluentHomePage } from "../pages/pmtool/fluent/fluent_home_page";

test.beforeEach(async ({ page }) => {
  const loginPage = await new FluentLoginPage(page);
  await loginPage
    .openPmtool()
    .then((page) => page.fillUsername("pw_skoleni"))
    .then((page) => page.fillPassword("TEG2023"))
    .then((page) => page.submitLogin())
    .then((page) => page.waitOnPage());
});

test("Pmtool Homepage Atomic Tests", async ({ page }) => {
  const homepage = await new FluentHomePage(page);
  await test.step("Top bar checks", async () => {
    await expect.soft(homepage.profileButton).toBeVisible();
    await expect.soft(homepage.headerTitle).toBeVisible();
    await expect.soft(homepage.bellIcon).toBeVisible();
    await expect
      .soft(homepage.headerTitle)
      .toContainText("TEG Project Management");
  });

  await test.step("Left menu checks", async () => {
    await expect.soft(homepage.dashboard).toBeVisible();
    await expect.soft(homepage.projects).toBeVisible();
    await expect.soft(homepage.users).toBeVisible();
    await expect.soft(homepage.reports).toBeVisible();
    await expect.soft(homepage.configuration).toBeVisible();
    await expect.soft(homepage.applicationStructure).toBeVisible();
    await expect.soft(homepage.extension).toBeVisible();
    await expect.soft(homepage.tools).toBeVisible();
    await expect.soft(homepage.documentation).toBeVisible();
    await expect.soft(homepage.logo).toBeVisible();
    await expect.soft(homepage.dashboard).toContainText("Dashboard");
    await expect.soft(homepage.projects).toContainText("Projects");
    await expect.soft(homepage.users).toContainText("Users");
    await expect.soft(homepage.reports).toContainText("Reports");
    await expect.soft(homepage.configuration).toContainText("Configuration");
    await expect
      .soft(homepage.applicationStructure)
      .toContainText("Application Structure");
    await expect.soft(homepage.extension).toContainText("Extension");
    await expect.soft(homepage.tools).toContainText("Tools");
    await expect.soft(homepage.documentation).toContainText("Documentation");
  });

  await test.step("Content checks", async () => {
    await expect.soft(homepage.contentHeader).toBeVisible();
    await expect
      .soft(homepage.contentHeader)
      .toHaveText("Vítej v testovací aplikaci Tredgate Project");
    await expect.soft(homepage.firstParagraph).toBeVisible();
    await expect
      .soft(homepage.firstParagraph)
      .toContainText(
        "Tato aplikace slouží pro trénink Software Testování a Automatizace testování"
      );
    await expect.soft(homepage.secondParagraph).toBeVisible();
    await expect
      .soft(homepage.secondParagraph)
      .toContainText(
        "Pokud budeš mít jakékoliv problémy, kontakuj Petra na: petr.fifka@tredgate.cz"
      );
  });
});
