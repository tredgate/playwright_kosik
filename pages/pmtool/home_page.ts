import { type Page, type Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
  }

  clickProfile() {
    this.profileButton.click();
  }

  clickLogout() {
    this.logoutButton.click();
  }
}
