const { test, expect } = require('@playwright/test');

const BASE_URL = "http://localhost:8081/jobseeker/register";

test.describe("Job Seeker Registration", () => {

  // TC01
  test("Page loads successfully", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator("h1")).toHaveText("Job Seeker Register");
  });

  // TC02
  test("Register with valid details", async ({ page }) => {
    await page.goto(BASE_URL);
    const ts = Date.now();
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill(`shilpa${ts}@gmail.com`);
    await page.locator("#mobile").fill(`7${ts.toString().slice(-9)}`);
    await page.locator("#password").fill("Pass@123");
    await page.locator("#confirmPassword").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('.error-message')).toHaveCount(0);
  });

  // TC03
  test("Missing Name", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
    await page.locator("#mobile").fill("9876543210");
    await page.locator("#password").fill("Pass@123");
    await page.locator("#confirmPassword").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("text=Name")).toBeVisible();
  });

  // TC04
  test("Missing Email", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#mobile").fill("9876543210");
    await page.locator("#password").fill("Pass@123");
    await page.locator("#confirmPassword").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("text=Email")).toBeVisible();
  });

  // TC05
  test("Missing Mobile", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
    await page.locator("#password").fill("Pass@123");
    await page.locator("#confirmPassword").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("text=Mobile")).toBeVisible();
  });

  // TC06
  test("Missing Password", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
    await page.locator("#mobile").fill(`9${Date.now().toString().slice(-9)}`);
    await page.locator("#confirmPassword").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message').first()).toBeVisible();
  });

  // TC07
  test("Missing Confirm Password", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
    await page.locator("#mobile").fill("9876543210");
    await page.locator("#password").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("text=Confirm Password")).toBeVisible();
  });

  // TC08
  test("Password mismatch", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
    await page.locator("#mobile").fill(`9${Date.now().toString().slice(-9)}`);
    await page.locator("#password").fill("Pass@123");
    await page.locator("#confirmPassword").fill("Wrong123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message')).toContainText('Password Missmatch');
  });

  // TC09
  test("Invalid email format", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill("invalid-email");
    await page.locator("#mobile").fill(`9${Date.now().toString().slice(-9)}`);
    await page.locator("#password").fill("Pass@123");
    await page.locator("#confirmPassword").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message')).toContainText('Enter Proper Email');
  });

  // TC10
  test("Invalid mobile number", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
    await page.locator("#mobile").fill("123");
    await page.locator("#password").fill("Pass@123");
    await page.locator("#confirmPassword").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message')).toBeVisible();
  });

  // TC11
  test("Weak password", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
    await page.locator("#mobile").fill(`9${Date.now().toString().slice(-9)}`);
    await page.locator("#password").fill("123");
    await page.locator("#confirmPassword").fill("123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message')).toContainText('minimum 8 charecter');
  });

  // TC12
  test("Duplicate email registration", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.locator("#email").fill("existing@gmail.com");
    await page.locator("#mobile").fill(`9${Date.now().toString().slice(-9)}`);
    await page.locator("#password").fill("Pass@123");
    await page.locator("#confirmPassword").fill("Pass@123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.error-message')).toBeVisible();
  });

  // TC13
  test("Only spaces in fields", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("   ");
    await page.locator("#email").fill("   ");
    await page.locator("#mobile").fill("   ");
    await page.locator("#password").fill("   ");
    await page.locator("#confirmPassword").fill("   ");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("form")).toBeVisible();
  });

  // TC14
  test("Refresh clears form", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator("#name").fill("Shilpa");
    await page.reload();
    await expect(page.locator("#name")).toBeEmpty();
  });

  // TC15
  test("Navigate to Login page", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('.login-btn').click();
    await expect(page).toHaveURL(/login/);
  });

});
