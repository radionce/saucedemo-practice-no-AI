import { test, expect } from '@playwright/test';
test('autotest for another website/adding a todo shows it in the list', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.getByPlaceholder('What needs to be done?').fill('Bread');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.getByText('Bread')).toBeVisible();
});