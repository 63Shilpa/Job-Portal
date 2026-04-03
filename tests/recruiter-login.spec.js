const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8081/recruiter/register';

test.describe('Recruiter Page - Navbar Module', () => {

  // TC01 - Navbar is visible on the page
  test('TC01 - Navbar is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.navbar')).toBeVisible();
  });

  // TC02 - Navbar is fixed at the top (position: fixed)
  test('TC02 - Navbar is fixed positioned', async ({ page }) => {
    await page.goto(BASE_URL);
    const position = await page.locator('.navbar').evaluate(
      el => window.getComputedStyle(el).position
    );
    expect(position).toBe('fixed');
  });

  // TC03 - Logo text displays "Job Portal"
  test('TC03 - Logo displays Job Portal text', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.logo')).toContainText('Job Portal');
  });

  // TC04 - Logo image is visible
  test('TC04 - Logo image is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.logo img')).toBeVisible();
  });

  // TC05 - Logo image has correct src
  test('TC05 - Logo image has correct src', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.logo img')).toHaveAttribute('src', '/assets/favicon.png');
  });

  // TC06 - Logo image has alt text for accessibility
  test('TC06 - Logo image has alt text', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.logo img')).toHaveAttribute('alt', 'Job Portal Logo');
  });

  // TC07 - Logo links to homepage
  test('TC07 - Logo links to homepage', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.logo a')).toHaveAttribute('href', '/');
  });

  // TC08 - Clicking logo navigates to homepage
  test('TC08 - Clicking logo navigates to homepage', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.logo a').click();
    await expect(page).toHaveURL('http://localhost:8081/');
  });

  // TC09 - Login button is visible in navbar
  test('TC09 - Login button is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.login-btn')).toBeVisible();
  });

  // TC10 - Login button displays correct text
  test('TC10 - Login button has correct text', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.login-btn')).toHaveText('Login');
  });

  // TC11 - Login button links to /login
  test('TC11 - Login button links to /login', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('a:has(.login-btn)')).toHaveAttribute('href', '/login');
  });

  // TC12 - Clicking Login button navigates to login page
  test('TC12 - Clicking Login navigates to login page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.login-btn').click();
    await expect(page).toHaveURL(/\/login/);
  });

  // TC13 - Register button is visible in navbar
  test('TC13 - Register button is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.register-btn')).toBeVisible();
  });

  // TC14 - Register button displays correct text
  test('TC14 - Register button has correct text', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.register-btn')).toHaveText('Register');
  });

  // TC15 - Clicking Register button navigates to jobseeker register page
  test('TC15 - Clicking Register navigates to jobseeker register', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.register-btn').click();
    await expect(page).toHaveURL(/\/jobseeker\/register/);
  });

});
