const { test, expect } = require('@playwright/test');

const LOGIN_URL = 'http://localhost:8081/login';
const DASHBOARD_URL = 'http://localhost:8081/recruiter/home';

// Shared login helper
async function loginAsRecruiter(page) {
  // Register a fresh recruiter account
  const ts = Date.now();
  const email = `recruiter${ts}@company.com`;
  const mobile = `9${ts.toString().slice(-9)}`;

  await page.goto('http://localhost:8081/recruiter/register');
  await page.locator('#name').fill('Test Recruiter');
  await page.locator('#email').fill(email);
  await page.locator('#mobile').fill(mobile);
  await page.locator('#companyName').fill('Acme Corp');
  await page.locator('#password').fill('Pass@123');
  await page.locator('#confirmPassword').fill('Pass@123');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(1000);

  // Login with the registered account
  await page.goto(LOGIN_URL);
  await page.locator('input[name="emph"]').fill(email);
  await page.locator('input[name="password"]').fill('Pass@123');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(DASHBOARD_URL, { timeout: 8000 });
}

test.describe('Recruiter Dashboard', () => {

  // TC01 - Dashboard loads after login
  test('TC01 - Dashboard loads after login', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page).toHaveURL(DASHBOARD_URL);
  });

  // TC02 - Dashboard heading is visible
  test('TC02 - Dashboard heading is correct', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('.dashboard-title')).toHaveText('Recruiter Dashboard');
  });

  // TC03 - Navbar logo is visible
  test('TC03 - Navbar logo is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('.logo')).toBeVisible();
  });

  // TC04 - Navbar logo links to dashboard
  test('TC04 - Navbar logo links to recruiter home', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('.logo a')).toHaveAttribute('href', '/recruiter/home');
  });

  // TC05 - Logout button is visible
  test('TC05 - Logout button is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('.logout-btn')).toBeVisible();
  });

  // TC06 - Logout button has correct text
  test('TC06 - Logout button has correct text', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('.logout-btn')).toContainText('Logout');
  });

  // TC07 - Post New Job card is visible
  test('TC07 - Post New Job card is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('.card-title', { hasText: 'Post New Job' })).toBeVisible();
  });

  // TC08 - Create Job button is visible
  test('TC08 - Create Job button is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('a.card-btn', { hasText: 'Create Job' })).toBeVisible();
  });

  // TC09 - Manage Jobs card is visible
  test('TC09 - Manage Jobs card is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('.card-title', { hasText: 'Manage Jobs' })).toBeVisible();
  });

  // TC10 - View Jobs button is visible
  test('TC10 - View Jobs button is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('a.card-btn', { hasText: 'View Jobs' })).toBeVisible();
  });

  // TC11 - View Applications card is visible
  test('TC11 - View Applications card is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('.card-title', { hasText: 'View Applications' })).toBeVisible();
  });

  // TC12 - View Applications button is visible
  test('TC12 - View Applications button is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('a.card-btn', { hasText: 'View Applications' })).toBeVisible();
  });

  // TC13 - Create Job button links to post-job page
  test('TC13 - Create Job button links to correct URL', async ({ page }) => {
    await loginAsRecruiter(page);
    await expect(page.locator('a.card-btn', { hasText: 'Create Job' }))
      .toHaveAttribute('href', '/recruiter/post-job');
  });

  // TC14 - Clicking Logout redirects away from dashboard
  test('TC14 - Logout redirects away from dashboard', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.locator('.logout-btn').click();
    await page.waitForTimeout(1500);
    await expect(page).not.toHaveURL(DASHBOARD_URL);
  });

  // TC15 - Unauthenticated access to dashboard redirects to login
  test('TC15 - Unauthenticated access redirects to login', async ({ page }) => {
    await page.goto(DASHBOARD_URL);
    await page.waitForTimeout(1500);
    await expect(page).not.toHaveURL(DASHBOARD_URL);
  });

});
