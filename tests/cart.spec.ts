import {test, expect} from '@playwright/test';
import { login } from './helpers';

test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/inventory.html');
})

test('inventory lists all six products', async ({ page }) => {
    //inventory lists all six products
const PRODUCTS = page.getByTestId('inventory-item');
await expect(PRODUCTS).toHaveCount(6);
});

test('adding an item bumps the cart badge to 1', async ({ page }) => {
    //adding an item bumps the cart badge to 1
await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
const CART_BADGE = page.getByTestId('shopping-cart-badge');
await expect(CART_BADGE).toHaveText('1');
});

test('removing an item removes the cart badge', async ({ page }) => {
    //removing an item removes the cart badge
await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
await page.getByRole('button', { name: 'Remove' }).click();
const CART_BADGE = page.getByTestId('shopping-cart-badge');
await expect(CART_BADGE).not.toBeVisible();
});

test('cart page shows the item that was added', async ({ page }) => {
    //cart page shows the item that was added
await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
await page.getByTestId('shopping-cart-link').click();
await expect(page).toHaveURL('/cart.html');
await expect(page.getByTestId('inventory-item-name')).toBeVisible();
await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
});

test('a fresh session starts with an empty cart', async ({ page }) => {
    //a fresh session starts with an empty cart
await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
await page.getByTestId('shopping-cart-link').click();
await expect(page).toHaveURL('/cart.html');
const CART_ITEMS = page.getByTestId('inventory-item');
await expect(CART_ITEMS).toHaveCount(0);
});

test('removing the item from the cart page leaves it empty', async ({ page }) => {
    //removing the item from the cart page leaves it empty
await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
await page.getByTestId('shopping-cart-link').click();
await expect(page).toHaveURL('/cart.html');
await page.getByRole('button', { name: 'Remove' }).click();
const CART_ITEMS = page.getByTestId('inventory-item');
await expect(CART_ITEMS).toHaveCount(0);
});