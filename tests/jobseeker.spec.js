// tests/jobSeeker.spec.js
// import { test, expect } from '@playwright/test';

// const BASE_URL = 'http://localhost:8081';

// test.describe('Job Seeker Registration ', () => {

//   // TC01: Registration page loads successfully
//   test('Registration page loads successfully', async ({ page }) => {
//     await page.goto(BASE_URL+ '/jobseeker/register');
//     await expect(page.getByRole("heading", { name: /Job Seeker Register/i })).toBeVisible();
//   });
 

//   test('Register with valid details', async ({ page }) => {
//     await page.goto(BASE_URL+ '/jobseeker/register');

//     // Use lowercase 'name' etc. as in HTML
//     await page.locator('input[name="name"]').fill('John Doe');
//     await page.locator('input[name="email"]').fill(`john${Date.now()}@gmail.com`);
//     await page.locator('input[name="mobile"]').fill('9876543210');
//     await page.locator('input[name="password"]').fill('Pass@123');
//     await page.locator('input[name="confirmPassword"]').fill('Pass@123');

//     await page.locator('button[type="submit"]').click();

//     // Check if redirected to login page
//     // await expect(page).toHaveURL(/login/);
//   });

//    test('Register with missing name', async ({ page }) => {
//     await page.goto(BASE_URL+ '/jobseeker/register');
//     await page.locator('input[name="email"]').fill('john@gmail.com');
//     await page.locator('input[name="mobile"]').fill('9876543210');
//     await page.locator('input[name="password"]').fill('Pass@123');
//     await page.locator('input[name="confirmPassword"]').fill('Pass@123');
//     await page.locator('button[type="submit"]').click();

//     await expect(page.locator('text=Name is required')).toBeVisible();
//   });

// });
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

  await page.locator("#name").fill("Shilpa");
  await page.locator("#email").fill(`shilpa${Date.now()}@gmail.com`);
  await page.locator("#mobile").fill("9876543210");
  await page.locator("#password").fill("Pass@123");
  await page.locator("#confirmPassword").fill("Pass@123");

  await page.locator('button[type="submit"]').click();

  // ✔ Your app stays on same page
  await expect(page).toHaveURL("http://localhost:8081/jobseeker/register");

  // ✔ Now user manually clicks Login button
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("http://localhost:8081/login");
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

  // Fill other fields
  await page.locator("#name").fill("Shilpa");
  await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
  await page.locator("#mobile").fill("9876543210");
  
  // Do NOT fill password → leave #password blank
  await page.locator("#confirmPassword").fill("Pass@123");

  // Submit
  await page.locator('button[type="submit"]').click();

  // EXPECT password validation rule message
  await expect(
    page.locator("text=* Enter minimum 8 charecter")
  ).toBeVisible();
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
  await page.locator("#mobile").fill("9876543210");
  await page.locator("#password").fill("Pass@123");
  await page.locator("#confirmPassword").fill("Wrong123");

  await page.locator('button[type="submit"]').click();

  // Correct error message according to your HTML
  await expect(
    page.locator("text=Comfirm Password Should be Matching")
  ).toBeVisible();
});
//   // TC09
//   test("Invalid email format", async ({ page }) => {
//     await page.goto(BASE_URL);

//     await page.locator("#name").fill("Shilpa");
//     await page.locator("#email").fill("invalid-email");
//     await page.locator("#mobile").fill("9876543210");
//     await page.locator("#password").fill("Pass@123");
//     await page.locator("#confirmPassword").fill("Pass@123");

//     await page.locator('button[type="submit"]').click();

//     await expect(page.locator("text=Enter Proper Email")).toBeVisible();
//   });

  // TC10
test("Invalid mobile number", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#name").fill("Shilpa");
  await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
  await page.locator("#mobile").fill("123"); // Invalid mobile number
  await page.locator("#password").fill("Pass@123");
  await page.locator("#confirmPassword").fill("Pass@123");

  await page.locator('button[type="submit"]').click();

  // Correct error message from your HTML
  await expect(
    page.locator("text=Enter Proper Mobile Number")
  ).toBeVisible();
});

  // TC11
  test("Weak password", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#name").fill("Shilpa");
  await page.locator("#email").fill(`test${Date.now()}@gmail.com`);
  await page.locator("#mobile").fill("9876543210");
  await page.locator("#password").fill("123"); // weak password
  await page.locator("#confirmPassword").fill("123");

  await page.locator('button[type="submit"]').click();

  // Expect the FIRST password validation error
  await expect(
    page.locator("text=Enter minimum 8").first()
  ).toBeVisible();
});

//   // TC12
test("Only spaces in all fields should show validation errors", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#name").fill("   ");
  await page.locator("#email").fill("   ");
  await page.locator("#mobile").fill("   ");
  await page.locator("#password").fill("   ");
  await page.locator("#confirmPassword").fill("   ");

  await page.locator('button[type="submit"]').click();

  
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

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/login/);
  });

});

