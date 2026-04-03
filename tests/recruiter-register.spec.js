const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8081/recruiter/register';

test.describe('Recruiter Registration', () => {

  // TC01 - Page loads successfully
  test('TC01 - Page loads successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.locator('h1')).toHaveText('Recruiter Register');
  });

  // TC02 - Page title is correct
  test('TC02 - Page title is correct', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Recruiter Register/i);
  });

  // TC03 - Register form is visible
  test('TC03 - Register form is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('form')).toBeVisible();
  });

  // TC04 - Name field is visible
  test('TC04 - Name field is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#name')).toBeVisible();
  });

  // TC05 - Email field is visible
  test('TC05 - Email field is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#email')).toBeVisible();
  });

  // TC06 - Mobile field is visible
  test('TC06 - Mobile field is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#mobile')).toBeVisible();
  });

  // TC07 - Company Name field is visible
  test('TC07 - Company Name field is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#companyName')).toBeVisible();
  });

  // TC08 - Password field is visible
  test('TC08 - Password field is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#password')).toBeVisible();
  });

  // TC09 - Confirm Password field is visible
  test('TC09 - Confirm Password field is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#confirmPassword')).toBeVisible();
  });

  // TC10 - Submit button is visible
  test('TC10 - Submit button is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  // TC11 - Navbar Login button is visible
  test('TC11 - Navbar Login button is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.login-btn')).toBeVisible();
  });

  // TC12 - Navbar Register button is visible
  test('TC12 - Navbar Register button is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('.register-btn')).toBeVisible();
  });

  // TC13 - Name field accepts text input
  test('TC13 - Name field accepts text input', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#name').fill('John Recruiter');
    await expect(page.locator('#name')).toHaveValue('John Recruiter');
  });

  // TC14 - Email field accepts email input
  test('TC14 - Email field accepts email input', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#email').fill('recruiter@company.com');
    await expect(page.locator('#email')).toHaveValue('recruiter@company.com');
  });

  // TC15 - Mobile field accepts numeric input
  test('TC15 - Mobile field accepts numeric input', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#mobile').fill('9876543210');
    await expect(page.locator('#mobile')).toHaveValue('9876543210');
  });

  // TC16 - Company Name field accepts text input
  test('TC16 - Company Name field accepts text input', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#companyName').fill('Acme Corp');
    await expect(page.locator('#companyName')).toHaveValue('Acme Corp');
  });

  // TC17 - Password field masks input
  test('TC17 - Password field masks input', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

  // TC18 - Confirm Password field masks input
  test('TC18 - Confirm Password field masks input', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#confirmPassword')).toHaveAttribute('type', 'password');
  });

  // TC19 - Form fields are empty on page load
  test('TC19 - Form fields are empty on page load', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('#name')).toBeEmpty();
    await expect(page.locator('#email')).toBeEmpty();
    await expect(page.locator('#mobile')).toBeEmpty();
    await expect(page.locator('#companyName')).toBeEmpty();
    await expect(page.locator('#password')).toBeEmpty();
    await expect(page.locator('#confirmPassword')).toBeEmpty();
  });

  // TC20 - Refresh clears the form
  test('TC20 - Refresh clears the form', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#name').fill('Test Recruiter');
    await page.reload();
    await expect(page.locator('#name')).toBeEmpty();
  });

  // TC21 - Empty form submission shows name validation error
  test('TC21 - Empty form shows name validation error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message').first()).toBeVisible();
    await expect(page.locator('.error-message').first()).toContainText('Enter between 3~30');
  });

  // TC22 - Empty form submission shows required field errors
  test('TC22 - Empty form shows required field errors', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('button[type="submit"]').click();
    const errors = page.locator('.error-message');
    await expect(errors).toHaveCount(6);
  });

  // TC23 - Short name shows validation error
  test('TC23 - Short name shows validation error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#name').fill('Jo');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message').first()).toContainText('Enter between 3~30');
  });

  // TC24 - Missing email shows required error
  test('TC24 - Missing email shows required error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#name').fill('John Recruiter');
    await page.locator('#mobile').fill('9876543210');
    await page.locator('#companyName').fill('Acme Corp');
    await page.locator('#password').fill('Pass@123');
    await page.locator('#confirmPassword').fill('Pass@123');
    await page.locator('button[type="submit"]').click();
    const errors = page.locator('.error-message');
    await expect(errors.first()).toBeVisible();
  });

  // TC25 - Password mismatch shows error
  test('TC25 - Password mismatch shows error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#name').fill('John Recruiter');
    await page.locator('#email').fill(`recruiter${Date.now()}@company.com`);
    await page.locator('#mobile').fill(`9${Date.now().toString().slice(-9)}`);
    await page.locator('#companyName').fill('Acme Corp');
    await page.locator('#password').fill('Pass@123');
    await page.locator('#confirmPassword').fill('Wrong@999');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message')).toContainText('Password Missmatch');
  });

  // TC26 - Weak password shows error
  test('TC26 - Weak password shows error', async ({ page }) => {
    const ts = Date.now();
    await page.goto(BASE_URL);
    await page.locator('#name').fill('John Recruiter');
    await page.locator('#email').fill(`recruiter${ts}@company.com`);
    await page.locator('#mobile').fill(`6${ts.toString().slice(-9)}`);
    await page.locator('#companyName').fill('Acme Corp');
    await page.locator('#password').fill('123');
    await page.locator('#confirmPassword').fill('123');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message')).toContainText('minimum 8 charecter');
  });

  // TC27 - Missing company name shows required error
  test('TC27 - Missing company name shows required error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#name').fill('John Recruiter');
    await page.locator('#email').fill(`recruiter${Date.now()}@company.com`);
    await page.locator('#mobile').fill(`9${Date.now().toString().slice(-9)}`);
    await page.locator('#password').fill('Pass@123');
    await page.locator('#confirmPassword').fill('Pass@123');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message')).toContainText('It is Required Field');
  });

  // TC28 - Navigate to Login via navbar
  test('TC28 - Navigate to Login via navbar', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('a:has(.login-btn)').click();
    await expect(page).toHaveURL(/login/);
  });

  // TC29 - Job Seeker register link is present
  test('TC29 - Job Seeker register link is present', async ({ page }) => {
    await page.goto(BASE_URL);
    const link = page.locator('a[href="/jobseeker/register"]').last();
    await expect(link).toBeVisible();
  });

  // TC30 - Successful registration stays on site (no crash)
  test('TC30 - Successful registration completes without error', async ({ page }) => {
    const ts = Date.now();
    await page.goto(BASE_URL);
    await page.locator('#name').fill('John Recruiter');
    await page.locator('#email').fill(`recruiter${ts}@company.com`);
    await page.locator('#mobile').fill(`9${ts.toString().slice(-9)}`);
    await page.locator('#companyName').fill('Acme Corp');
    await page.locator('#password').fill('Pass@123');
    await page.locator('#confirmPassword').fill('Pass@123');
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(2000);
    // No error messages should be present after successful registration
    await expect(page.locator('.error-message')).toHaveCount(0);
  });

});
