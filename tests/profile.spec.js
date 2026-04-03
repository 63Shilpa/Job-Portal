const { test, expect } = require('@playwright/test');

const LOGIN_URL    = 'http://localhost:8081/login';
const DASHBOARD_URL = 'http://localhost:8081/jobseeker/home';

async function login(page) {
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

  await page.goto(LOGIN_URL);
  await page.locator('input[name="emph"]').fill(email);
  await page.locator('input[name="password"]').fill('Pass@123');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(DASHBOARD_URL, { timeout: 8000 });
}

test.describe("Job Seeker Dashboard", () => {

  // TC01
  test("Dashboard loads", async ({ page }) => {
    await login(page);
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  // TC02
  test("Search input visible", async ({ page }) => {
    await login(page);
    await expect(page.locator('input[name="query"]')).toBeVisible();
  });

  // TC03
  test("Search button visible", async ({ page }) => {
    await login(page);
    await expect(page.locator('.search-form button[type="submit"]')).toBeVisible();
  });

  // TC04
  test("Complete profile link visible", async ({ page }) => {
    await login(page);
    await expect(page.locator('a[href="/jobseeker/complete-profile"]')).toBeVisible();
  });

  // TC05
  test("Browse jobs link visible", async ({ page }) => {
    await login(page);
    await expect(page.locator('a[href="/jobseeker/view-jobs"]')).toBeVisible();
  });

  // TC06
  test("View applications link visible", async ({ page }) => {
    await login(page);
    await expect(page.locator('a[href="/jobseeker/my-applications"]')).toBeVisible();
  });

  // TC07
  test("Search field accepts text", async ({ page }) => {
    await login(page);
    await page.locator('input[name="query"]').fill("java");
    await expect(page.locator('input[name="query"]')).toHaveValue("java");
  });

  // TC08
  test("Navigate to Complete Profile", async ({ page }) => {
    await login(page);
    await page.locator('a[href="/jobseeker/complete-profile"]').click();
    await expect(page).toHaveURL(/complete-profile/);
  });

  // TC09
  test("Navigate to Browse Jobs", async ({ page }) => {
    await login(page);
    await page.locator('a[href="/jobseeker/view-jobs"]').click();
    await expect(page).toHaveURL(/view-jobs/);
  });

  // TC10
  test("Navigate to Applications", async ({ page }) => {
    await login(page);
    await page.locator('a[href="/jobseeker/my-applications"]').click();
    await expect(page).toHaveURL(/my-applications/);
  });

  // TC11
  test("Logout button visible", async ({ page }) => {
    await login(page);
    await expect(page.locator(".logout-btn")).toBeVisible();
  });

  // TC12
  test("Logout works", async ({ page }) => {
    await login(page);
    await page.locator(".logout-btn").click();
    await page.waitForTimeout(1500);
    await expect(page).not.toHaveURL(DASHBOARD_URL);
  });

  // TC13
  test("Refresh keeps dashboard", async ({ page }) => {
    await login(page);
    await page.reload();
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  // TC14
  test("Footer links visible", async ({ page }) => {
    await login(page);
    await expect(page.locator("text=About")).toBeVisible();
  });

  // TC15
  test("All main links enabled", async ({ page }) => {
    await login(page);
    await expect(page.locator('a[href="/jobseeker/complete-profile"]')).toBeEnabled();
    await expect(page.locator('a[href="/jobseeker/view-jobs"]')).toBeEnabled();
  });

});
