import { test, expect } from "@playwright/test";

const lang = process.env.TRANSL_LANG || "cz";
const translations = require(`../locales/${lang}/translations.json`);

test(`[${lang}] TEG#B Login page translations`, async ({ page }) => {
  await page.goto("https://tegb-frontend-88542200c6db.herokuapp.com/");
  await page.locator(translations.language_switch_locator).click();
  await expect(page.locator('[data-testid="username-input"]')).toHaveAttribute(
    "placeholder",
    translations.login_username_placeholder
  );
  await expect(page.locator('[data-testid="submit-button"]')).toHaveText(
    translations.login_login
  );
});
