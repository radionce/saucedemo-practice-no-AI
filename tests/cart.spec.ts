import {test, expect} from '@playwright/test';
import { login } from './helpers';

test('inventory lists all six products', async ({ page }) => {
    //inventory lists all six products
await login(page);
await page.goto('/inventory.html');
const PRODUCTS = page.getByTestId('inventory-item');
await expect(PRODUCTS).toHaveCount(6);
});

test('adding an item bumps the cart badge to 1', async ({ page }) => {
    //adding an item bumps the cart badge to 1
await login(page);
await page.goto('/inventory.html');
await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
const CART_BADGE = page.getByTestId('shopping-cart-badge');
await expect(CART_BADGE).toHaveText('1');
});

test('removing an item removes the cart badge', async ({ page }) => {
    //removing an item removes the cart badge
await login(page);
await page.goto('/inventory.html');
await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
await page.getByRole('button', { name: 'Remove' }).click();
const CART_BADGE = page.getByTestId('shopping-cart-badge');
await expect(CART_BADGE).not.toBeVisible();
});