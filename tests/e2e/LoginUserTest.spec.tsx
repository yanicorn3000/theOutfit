import { test, expect } from "@playwright/test";

test.describe("Login Process", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      "https://fakestoreapi.com/auth/login",

      async (route, request) => {
        console.log("Intercepted auth/login", await request.postData());

        const body = await request.postDataJSON();

        if (
          body.username === "testuser" &&
          body.password === "correctpassword"
        ) {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIn0.s7FkpGZlLslrUCNAU3hYvzmUn8dLKoR-E0sHn1OR0Ps",
              user: { id: 1, username: "testuser" },
            }),
          });
        } else {
          await route.fulfill({
            status: 401,
            contentType: "application/json",
            body: JSON.stringify({ message: "Invalid username or password" }),
          });
        }
      }
    );
    await page.route("https://fakestoreapi.com/users/1", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          username: "testuser",
          email: "test@example.com",
          name: {
            firstname: "Mike",
            lastname: "Doe",
          },
          address: {
            city: "Somewhere",
            street: "123 Main St",
            number: 42,
            zipcode: "12345",
          },
          phone: "+1 123-456-7890",
        }),
      });
    });

    await page.goto("/outfit/login");
  });

  test("should render login form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should show validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("text=Username is required")).toBeVisible();
    await expect(page.locator("text=Password is required")).toBeVisible();
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.getByLabel("Username").fill("wronguser");
    await page.getByLabel("Password").fill("wrongpass");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid username or password")).toBeVisible({
      timeout: 7000,
    });
  });

  test("should login and redirect to /outfit/profile ans shows user data", async ({
    page,
  }) => {
    await page.getByLabel("Username").fill("testuser");
    await page.getByLabel("Password").fill("correctpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await page.evaluate(() => {
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
          "eyJzdWIiOjEsInVzZXIiOiJ0ZXN0dXNlciIsImlhdCI6MTY4NTAwMDAwMH0." +
          "signature-placeholder"
      );
    });
    await page.goto("/outfit/profile");

    await expect(page).toHaveURL(/.*\/outfit\/profile/);
    await expect(page.locator("text=Mike Doe")).toBeVisible();
    await expect(page.locator("text=test@example.com")).toBeVisible();
    await expect(page.locator("text=+1 123-456-7890")).toBeVisible();
  });
});
