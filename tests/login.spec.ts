import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('valid credentials land on the inventory page', async ({ page }) => {
    //successful login:
await login(page);
await expect(page).toHaveURL('/inventory.html');
await expect(page.getByTestId('title')).toHaveText('Products');
await expect(page.getByTestId('title')).toBeVisible();
});

test('invalid username shows an error', async ({ page }) => {
    //wrong username shows an error
await login(page, 'wrong_user');
await expect(page.getByRole('alert')).toContainText('Username and password do not match');
await expect(page).not.toHaveURL('/inventory.html');
});

test('invalid password shows an error', async ({ page }) => {
    //wrong password shows an error
await login(page, 'standard_user', 'wrong_password');
await expect(page.getByRole('alert')).toContainText('Username and password do not match');
await expect(page).not.toHaveURL('/inventory.html');
});

test('locked out user shows an error', async ({ page }) => {
    //locked out user is refused
await login(page, 'locked_out_user');
await expect(page.getByRole('alert')).toContainText('Sorry, this user has been locked out.');
await expect(page).not.toHaveURL('/inventory.html');
});

test('empty fields validation', async ({ page }) => {
    //empty username field show an error
await login(page, '', '');
await expect(page.getByRole('alert')).toContainText('Username is required');
await login(page, 'standard_user', '');
await expect(page.getByRole('alert')).toContainText('Password is required');
});

test('logging out returns to login page', async ({ page }) => {
    //logging out returns to login page 
await login(page);
await page.getByRole('button', { name: 'Open Menu' }).click();
await page.getByTestId('logout-sidebar-link').click();
await expect(page).toHaveURL('/');
});

test('inventory page is unreachable when logged out', async ({ page }) => {
    //inventory page is unreachable when logged out
await login(page);
await page.getByRole('button', { name: 'Open Menu' }).click();
await page.getByTestId('logout-sidebar-link').click();
await page.goto('/inventory.html');
await expect(page.getByRole('alert')).toContainText('You can only access \'/inventory.html\' when you are logged in');
});

test('cart page is unreachable when logged in', async ({ page }) => {
    //cart page is unreachable when logged out
await login(page);
await page.getByRole('button', { name: 'Open Menu' }).click();
await page.getByTestId('logout-sidebar-link').click();
await page.goto('/cart.html');
await expect(page.getByRole('alert')).toContainText('You can only access \'/cart.html\' when you are logged in');
});