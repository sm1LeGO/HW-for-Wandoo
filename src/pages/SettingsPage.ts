import { expect, Locator, Page } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly withdrawalTab: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.withdrawalTab = page.locator('.tab.withdrawal');
    this.emptyMessage = page.locator('.empty-message');
  }

  async openWithdrawalTab(): Promise<void> {
    await expect(this.withdrawalTab).toBeVisible();
    await this.withdrawalTab.click();
  }

  async assertWithdrawalIsEmpty(): Promise<void> {
    await expect(this.emptyMessage).toBeVisible();
    await expect(this.emptyMessage).toHaveText(/There are no funds added to your account/);
  }
}
