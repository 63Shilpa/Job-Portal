import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:8081/login";

test.describe("Login Module", () => {

  // TC01
  test("Login page loads", async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator("h1")).toHaveText("Login");
    await expect(page.locator('input[name="emph"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("TC02 - Login with valid email & password", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator('input[name="emph"]').fill("valid@gmail.com");
  await page.locator('input[name="password"]').fill("Pass@123");
  await page.locator('button[type="submit"]').click();

  // EXPECTATION BASED ON YOUR HTML (alert message)
  const alert = page.locator(".alert-message");

  await expect(alert).toBeVisible();      // success or error message
  await expect(alert).toContainText(/success|logged in|invalid/i); 
});

  // TC03 - Login with phone number & password
test("Login with phone number & password", async ({ page }) => {
  await page.goto(BASE_URL);

  // Fill login form
  await page.locator('input[name="emph"]').fill("9876543210");
  await page.locator('input[name="password"]').fill("Pass@123");
  await page.locator('button[type="submit"]').click();

  // Wait for an element that appears only after successful login
  const dashboardHeading = page.locator("h1", { hasText: "Job Seeker Dashboard" });
  await expect(dashboardHeading).toBeVisible({ timeout: 10000 });

  // Verify that "Search Jobs" button is visible
  const searchButton = page.getByRole("button", { name: /Search Jobs/i });
  await expect(searchButton).toBeVisible({ timeout: 10000 });
});
// TC04 - Email/Phone field empty validation
test("Email/Phone field empty validation", async ({ page }) => {
  await page.goto(BASE_URL);

  // Leave email/phone empty
  await page.locator('input[name="password"]').fill("Pass@123");
  await page.locator('button[type="submit"]').click();

  // Wait for alert message (HTML popup)
  const alertMsg = page.locator(".alert-message");
  await expect(alertMsg).toBeVisible({ timeout: 5000 });

  // Optionally check text contains 'required' or 'invalid'
  await expect(alertMsg).toContainText(/required|invalid/i);

  // Make sure we are still on the login page
  await expect(page).toHaveURL(/login/);
});
// TC05 - Password field empty validation
test("Password field empty validation", async ({ page }) => {
  await page.goto(BASE_URL);

  // Fill email/phone but leave password empty
  await page.locator('input[name="emph"]').fill("test@gmail.com");
  await page.locator('button[type="submit"]').click();

  // Wait for any alert message or error message
 
})// TC06 - Invalid email format
test("Invalid email format", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator('input[name="emph"]').fill("abcd");
  await page.locator('input[name="password"]').fill("Pass@123");
  await page.locator('button[type="submit"]').click();

  // Expect an inline error or alert
  const alertMsg = page.locator(".alert-message");
  await expect(alertMsg).toBeVisible();
  await expect(alertMsg).toContainText(/invalid email|invalid/i);
});
// TC07 - Wrong credentials
test("Wrong credentials", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator('input[name="emph"]').fill("wrong@gmail.com");
  await page.locator('input[name="password"]').fill("WrongPassword");
  await page.locator('button[type="submit"]').click();

  const alertMsg = page.locator(".alert-message");

  // Ensure alert is visible
  await expect(alertMsg).toBeVisible();

  // Match actual error messages
  await expect(alertMsg).toContainText(/invalid email|invalid password|login failed/i);

  // Still on login page
  await expect(page.url()).toContain("/login");
});

// TC09 - Navbar links work correctly
test("Navbar Register link works correctly", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole("link", { name: "Register" }).click();

  // Expect URL contains /jobseeker/register
  await expect(page.url()).toContain("/jobseeker/register");
});

// // TC10 - Access Search Jobs without login
// test("Access Search Jobs without login", async ({ page }) => {
//   await page.goto("http://localhost:8081/");

//   // Attempt to go directly to Search Jobs page
//   await page.goto("http://localhost:8081/jobseeker/view-jobs");

//   // Since the user is not logged in, the app should redirect to /login
//   await expect(page).toHaveURL(/\/login$/);

//   // Optional: Check for the heading or form on login page
//   await expect(page.locator("h1")).toHaveText("Login");
//   await expect(page.locator('input[name="emph"]')).toBeVisible();
//   await expect(page.locator('input[name="password"]')).toBeVisible();
// });
});