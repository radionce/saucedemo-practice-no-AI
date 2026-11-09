import { test, expect } from '@playwright/test';
test('valid credentials land on the inventory page', async ({ page }) => {
await page.goto('/');
await page.getByTestId('username').fill('standard_user');
await page.getByTestId('password').fill(process.env.SAUCE_PASSWORD);
await page.getByTestId('login-button').click();
await expect(page).toHaveURL('/inventory.html');
await expect(page.getByTestId('title')).toHaveText('Products');
await expect(page.getByTestId('title')).toBeVisible();
});