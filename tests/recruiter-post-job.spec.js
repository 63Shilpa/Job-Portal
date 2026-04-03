const { test, expect } = require('@playwright/test');

const POST_JOB_URL = 'http://localhost:8081/recruiter/post-job';
const DASHBOARD_URL = 'http://localhost:8081/recruiter/home';

async function loginAsRecruiter(page) {
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

  await page.goto('http://localhost:8081/login');
  await page.locator('input[name="emph"]').fill(email);
  await page.locator('input[name="password"]').fill('Pass@123');
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(DASHBOARD_URL, { timeout: 8000 });
}

async function fillValidJob(page) {
  await page.locator('#title').fill('Software Engineer');
  await page.locator('#description').fill('Looking for a skilled software engineer with strong problem-solving skills.');
  await page.locator('#skills').fill('Java, Spring Boot, REST API');
  await page.locator('#location').fill('Bangalore');
  await page.locator('#salary').fill('12');
  await page.locator('#experience').fill('6');
}

test.describe('Post New Job', () => {

  // TC01 - Post Job page loads after login
  test('TC01 - Post Job page loads after login', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page).toHaveURL(POST_JOB_URL);
  });

  // TC02 - Page heading is correct
  test('TC02 - Page heading is Post New Job', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('h1')).toHaveText('Post New Job');
  });

  // TC03 - Job Role field is visible
  test('TC03 - Job Role field is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#title')).toBeVisible();
  });

  // TC04 - Job Description field is visible
  test('TC04 - Job Description field is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#description')).toBeVisible();
  });

  // TC05 - Required Skills field is visible
  test('TC05 - Required Skills field is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#skills')).toBeVisible();
  });

  // TC06 - Location field is visible
  test('TC06 - Location field is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#location')).toBeVisible();
  });

  // TC07 - CTC field is visible
  test('TC07 - CTC field is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#salary')).toBeVisible();
  });

  // TC08 - Experience field is visible
  test('TC08 - Experience field is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#experience')).toBeVisible();
  });

  // TC09 - Submit button is visible
  test('TC09 - Submit button is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('button.submit-btn')).toBeVisible();
  });

  // TC10 - Submit button has correct label
  test('TC10 - Submit button has correct label', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('button.submit-btn')).toContainText('Post Job');
  });

  // TC11 - All fields are empty on page load
  test('TC11 - All fields are empty on page load', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#title')).toBeEmpty();
    await expect(page.locator('#description')).toBeEmpty();
    await expect(page.locator('#skills')).toBeEmpty();
    await expect(page.locator('#location')).toBeEmpty();
    await expect(page.locator('#salary')).toBeEmpty();
    await expect(page.locator('#experience')).toBeEmpty();
  });

  // TC12 - Job Role field accepts text input
  test('TC12 - Job Role field accepts text input', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await page.locator('#title').fill('Frontend Developer');
    await expect(page.locator('#title')).toHaveValue('Frontend Developer');
  });

  // TC13 - Job Description field accepts text input
  test('TC13 - Job Description field accepts text input', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await page.locator('#description').fill('Build and maintain web applications.');
    await expect(page.locator('#description')).toHaveValue('Build and maintain web applications.');
  });

  // TC14 - CTC field is of type number
  test('TC14 - CTC field is of type number', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#salary')).toHaveAttribute('type', 'number');
  });

  // TC15 - Experience field is of type number
  test('TC15 - Experience field is of type number', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#experience')).toHaveAttribute('type', 'number');
  });

  // TC16 - All fields have required attribute
  test('TC16 - All fields have required attribute', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('#title')).toHaveAttribute('required', '');
    await expect(page.locator('#description')).toHaveAttribute('required', '');
    await expect(page.locator('#skills')).toHaveAttribute('required', '');
    await expect(page.locator('#location')).toHaveAttribute('required', '');
    await expect(page.locator('#salary')).toHaveAttribute('required', '');
    await expect(page.locator('#experience')).toHaveAttribute('required', '');
  });

  // TC17 - Refresh clears all fields
  test('TC17 - Refresh clears all fields', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await page.locator('#title').fill('DevOps Engineer');
    await page.reload();
    await expect(page.locator('#title')).toBeEmpty();
  });

  // TC18 - Navbar logo is visible on post job page
  test('TC18 - Navbar logo is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('.logo')).toBeVisible();
  });

  // TC19 - Logout button is visible on post job page
  test('TC19 - Logout button is visible', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await expect(page.locator('.logout-btn')).toBeVisible();
  });

  // TC20 - Valid job submission redirects to dashboard
  test('TC20 - Valid job submission redirects to dashboard', async ({ page }) => {
    await loginAsRecruiter(page);
    await page.goto(POST_JOB_URL);
    await fillValidJob(page);
    await page.locator('button.submit-btn').click();
    await expect(page).toHaveURL(DASHBOARD_URL, { timeout: 8000 });
  });

});
