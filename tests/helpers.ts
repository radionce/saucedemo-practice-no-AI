import {Page} from '@playwright/test';
export const PASSWORD = process.env.SAUCE_PASSWORD;
export async function login(page: Page, user='standard_user') {
    await page.goto('/');
    await page.getByTestId('username').fill(user);
    await page.getByTestId('password').fill(PASSWORD);
    await page.getByTestId('login-button').click();
    if (!PASSWORD) {
        throw new Error('SAUCE_PASSWORD environment variable is not set');
    }
}