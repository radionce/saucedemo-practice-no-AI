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