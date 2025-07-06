import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly addFundsBlock: Locator;
  readonly amount: Locator;
  readonly myProfileLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addFundsBlock = page.locator('#add-funds');
    this.amount = this.addFundsBlock.locator('span.title');
    this.myProfileLink = page.locator('#personal-information');
  }

  async assertBalanceIsZero(): Promise<void> {
    await expect(this.addFundsBlock).toBeVisible();
    await expect(this.amount).toHaveText(/^0\s?€?$/);
  }

  async goToMyProfile(): Promise<void> {
    await expect(this.myProfileLink).toBeVisible();
    await this.myProfileLink.click();
    await this.page.waitForURL('**/settings/personal-information', { timeout: 10000 });
  }
}
