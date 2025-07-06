import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { SettingsPage } from '../pages/SettingsPage';

test('user can login, sees zero balance on withdrawal page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const settings = new SettingsPage(page);

  await loginPage.goto();
  await loginPage.login('testuser@qa.com', 'Parole123');
  await dashboard.assertBalanceIsZero();
  await dashboard.goToMyProfile();
  await settings.openWithdrawalTab();
  await settings.assertWithdrawalIsEmpty();
});
