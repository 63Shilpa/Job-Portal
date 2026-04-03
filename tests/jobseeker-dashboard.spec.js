const { test, expect } = require('@playwright/test');

const DASHBOARD_URL = 'http://localhost:8081/jobseeker/home';
const PROFILE_URL   = 'http://localhost:8081/jobseeker/complete-profile';

async function loginAsJobseeker(page) {
  const ts = Date.now();
  const email  = `jobseeker${ts}@gmail.com`;
  const mobile = `8${ts.toString().slice(-9)}`;

  await page.goto('http://localhost:8081/jobseeker/register');
  await page.locator('#name').fill('Test Seeker');
  await page.locator('#email').fill(email);
  await page.locator('#mobile').fill(mobile);
  await page.locator('#password').fill('Pass@123');
  await page.locator('#confirmPassword').fill('Pass@123');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(1000);

  await page.goto('http://localhost:8081/login');
  await page.locator('input[name="emph"]').fill(email);
  await page.locator('input[name="password"]').fill('Pass@123');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(DASHBOARD_URL, { timeout: 8000 });
}

test.describe('Job Seeker Dashboard', () => {

  // TC01 - Dashboard loads after login
  test('TC01 - Dashboard loads after login', async ({ page }) => {
    await loginAsJobseeker(page);
    await expect(page).toHaveURL(DASHBOARD_URL);
  });

  // TC02 - Dashboard heading is correct
  test('TC02 - Dashboard heading is correct', async ({ page }) => {
    await loginAsJobseeker(page);
    await expect(page.locator('.dashboard-title')).toHaveText('Job Seeker Dashboard');
  });

  // TC03 - Unauthenticated access redirects away from dashboard
  test('TC03 - Unauthenticated access redirects away', async ({ page }) => {
    await page.goto(DASHBOARD_URL);
    await page.waitForTimeout(1500);
    await expect(page).not.toHaveURL(DASHBOARD_URL);
  });

  // TC04 - Logout redirects away from dashboard
  test('TC04 - Logout redirects away from dashboard', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.locator('.logout-btn').click();
    await page.waitForTimeout(1500);
    await expect(page).not.toHaveURL(DASHBOARD_URL);
  });

  // TC05 - Search input is visible with correct placeholder
  test('TC05 - Search input is visible with correct placeholder', async ({ page }) => {
    await loginAsJobseeker(page);
    await expect(page.locator('input[name="query"]'))
      .toHaveAttribute('placeholder', 'Search jobs by title, skills, or location...');
  });

  // TC06 - Search Jobs button is visible
  test('TC06 - Search Jobs button is visible', async ({ page }) => {
    await loginAsJobseeker(page);
    await expect(page.locator('.search-form button[type="submit"]')).toContainText('Search Jobs');
  });

  // TC07 - Search input accepts text
  test('TC07 - Search input accepts text', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.locator('input[name="query"]').fill('Java Developer');
    await expect(page.locator('input[name="query"]')).toHaveValue('Java Developer');
  });

  // TC08 - Update Profile button links to complete-profile
  test('TC08 - Update Profile button links to correct URL', async ({ page }) => {
    await loginAsJobseeker(page);
    await expect(page.locator('a.card-btn', { hasText: 'Update Profile' }))
      .toHaveAttribute('href', '/jobseeker/complete-profile');
  });

  // TC09 - View All Jobs button links to view-jobs
  test('TC09 - View All Jobs button links to correct URL', async ({ page }) => {
    await loginAsJobseeker(page);
    await expect(page.locator('a.card-btn', { hasText: 'View All Jobs' }))
      .toHaveAttribute('href', '/jobseeker/view-jobs');
  });

  // TC10 - View Applications button links to my-applications
  test('TC10 - View Applications button links to correct URL', async ({ page }) => {
    await loginAsJobseeker(page);
    await expect(page.locator('a.card-btn', { hasText: 'View Applications' }))
      .toHaveAttribute('href', '/jobseeker/my-applications');
  });

  // TC11 - All three action cards are visible
  test('TC11 - All three action cards are visible', async ({ page }) => {
    await loginAsJobseeker(page);
    await expect(page.locator('.card-title', { hasText: 'Complete Your Profile' })).toBeVisible();
    await expect(page.locator('.card-title', { hasText: 'Browse Jobs' })).toBeVisible();
    await expect(page.locator('.card-title', { hasText: 'My Applications' })).toBeVisible();
  });

  // TC12 - Clicking Update Profile navigates to profile page
  test('TC12 - Clicking Update Profile navigates to profile page', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.locator('a.card-btn', { hasText: 'Update Profile' }).click();
    await expect(page).toHaveURL(PROFILE_URL);
  });

  // TC13 - Complete Profile page heading is correct
  test('TC13 - Complete Profile page heading is correct', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.goto(PROFILE_URL);
    await expect(page.locator('.page-title')).toHaveText('Complete Your Profile');
  });

  // TC14 - Education Details fields are visible
  test('TC14 - Education Details fields are visible', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.goto(PROFILE_URL);
    await expect(page.locator('input[name="degree"]')).toBeVisible();
    await expect(page.locator('input[name="institution"]')).toBeVisible();
    await expect(page.locator('input[name="eduStartDate"]')).toBeVisible();
    await expect(page.locator('input[name="eduEndDate"]')).toBeVisible();
  });

  // TC15 - Work Experience section is visible
  test('TC15 - Work Experience section is visible', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.goto(PROFILE_URL);
    await expect(page.locator('.section-title', { hasText: 'Work Experience' })).toBeVisible();
  });

  // TC16 - Fresher checkbox is unchecked by default
  test('TC16 - Fresher checkbox is unchecked by default', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.goto(PROFILE_URL);
    await expect(page.locator('#isFresher')).not.toBeChecked();
  });

  // TC17 - Fresher checkbox can be checked
  test('TC17 - Fresher checkbox can be checked', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.goto(PROFILE_URL);
    await page.locator('#isFresher').check();
    await expect(page.locator('#isFresher')).toBeChecked();
  });

  // TC18 - Resume upload accepts PDF only
  test('TC18 - Resume upload accepts PDF only', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.goto(PROFILE_URL);
    await expect(page.locator('input[name="resume"]')).toHaveAttribute('accept', '.pdf');
  });

  // TC19 - Profile image upload accepts JPG/PNG only
  test('TC19 - Profile image upload accepts JPG/PNG only', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.goto(PROFILE_URL);
    await expect(page.locator('input[name="profilePic"]')).toHaveAttribute('accept', '.jpg,.jpeg,.png');
  });

  // TC20 - Complete Profile submit button is visible
  test('TC20 - Complete Profile submit button is visible', async ({ page }) => {
    await loginAsJobseeker(page);
    await page.goto(PROFILE_URL);
    await expect(page.locator('button.submit-btn')).toContainText('Complete Profile');
  });

});
