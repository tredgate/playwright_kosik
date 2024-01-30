import { type Page, type Locator, test } from "@playwright/test";

export class LoginPage {
  // * Sekci lokátorů
  readonly page: Page;
  readonly url: string = "https://tredgate.com/pmtool/";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // * Naplnění lokátorů
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".btn");
  }

  // * Akce nad elementy
  async openPmtool() {
    await this.page.goto(this.url);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async loginSuccessfully(username: string, password: string) {
    await test.step(`Successful login as ${username}`, async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.submitLogin();
    });
  }
}
