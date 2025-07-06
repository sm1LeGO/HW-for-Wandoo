import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;
  readonly cookieBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#form input[type="email"]');
    this.passwordInput = page.locator('#form input[type="password"]');
    this.submitBtn = page.locator(
      '#login-view .modal-footer .tablediv >> text=/^\s*Log in\s*$/i',
    );
    this.cookieBanner = page.locator('#CybotCookiebotDialog');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://swaper.com/en/login', {
      waitUntil: 'domcontentloaded',
    });
    await this.acceptCookiesIfVisible();
  }

  async acceptCookiesIfVisible(): Promise<void> {
    const appeared = await this.cookieBanner
      .waitFor({ state: 'visible', timeout: 3000 })
      .catch(() => false);
    if (!appeared) return;

    const allowAllBtn = this.cookieBanner.locator(
      'button:has-text("Allow all cookies")',
    );
    const declineBtn = this.cookieBanner.locator(
      'button:has-text("Use necessary cookies only")',
    );

    if (await allowAllBtn.isVisible()) {
      await allowAllBtn.click();
    } else if (await declineBtn.isVisible()) {
      await declineBtn.click();
    }

    await this.cookieBanner.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async login(email: string, password: string): Promise<void> {
    if (!this.page.url().includes('/login')) {
      await this.goto();
    }

    await this.acceptCookiesIfVisible();
    await this.emailInput.fill(email, { timeout: 5000 });
    await this.passwordInput.fill(password);
    await expect(this.submitBtn).toBeVisible();
    await expect(this.submitBtn).toBeEnabled();
    await this.submitBtn.click();
    await this.page.locator('#add-funds').waitFor({ state: 'visible', timeout: 20000 });
  }
}