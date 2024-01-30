import { type Page, type Locator, test } from "@playwright/test";
import { FluentHomePage } from "./fluent_home_page";

export class FluentLoginPage {
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
  async openPmtool(): Promise<FluentLoginPage> {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string): Promise<FluentLoginPage> {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<FluentLoginPage> {
    await this.passwordInput.fill(password);
    return this;
  }

  async submitLogin(): Promise<FluentHomePage> {
    await this.loginButton.click();
    return new FluentHomePage(this.page);
  }

  async loginSuccessfully(
    username: string,
    password: string
  ): Promise<FluentHomePage> {
    await test.step(`Successful login as ${username}`, async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.submitLogin();
    });
    return new FluentHomePage(this.page);
  }
}
