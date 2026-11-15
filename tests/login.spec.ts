import { test, expect } from '@playwright/test';
import { login } from './helpers';
test('valid credentials land on the inventory page', async ({ page }) => {
await login(page);
await expect(page).toHaveURL('/inventory.html');
await expect(page.getByTestId('title')).toHaveText('Products');
await expect(page.getByTestId('title')).toBeVisible();
});