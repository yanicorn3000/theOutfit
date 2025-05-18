import { test, expect } from "@playwright/test";

test.describe("Order Form fill in", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ id: 1, username: "testuser" })
      );
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXIiOiJ0ZXN0dXNlciIsImlhdCI6MTY4NDAwMDAwMH0.fake_signature"
      );
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            id: 1,
            title: "Mock Product 1",
            price: 19.99,
            image: "https://via.placeholder.com/150",
            size: "M",
            quantity: 1,
          },
        ])
      );
    });

    await page.route("**/users/1**", async (route) => {
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
            zipcode: "12926-3874",
            geolocation: {
              lat: "37.7749",
              long: "122.4194",
            },
          },
          phone: "1-570-236-7033",
        }),
      });
    });
  });

  test("UserInfoForm shows correct initial user data, user clicks Next Button and fill in following form steps", async ({
    page,
  }) => {
    await page.goto("/outfit/checkout", { waitUntil: "domcontentloaded" });

    await expect(page.locator('input[name="email"]')).toHaveValue(
      "test@example.com"
    );
    await expect(page.locator('input[name="name.firstname"]')).toHaveValue(
      "Mike"
    );
    await expect(page.locator('input[name="name.lastname"]')).toHaveValue(
      "Doe"
    );
    await expect(page.locator('input[name="address.city"]')).toHaveValue(
      "Somewhere"
    );
    await expect(page.locator('input[name="address.street"]')).toHaveValue(
      "123 Main St"
    );
    await expect(page.locator('input[name="address.number"]')).toHaveValue(
      "42"
    );
    await expect(page.locator('input[name="address.zipcode"]')).toHaveValue(
      "12926-3874"
    );
    await expect(page.locator('input[name="phone"]')).toHaveValue(
      "1-570-236-7033"
    );

    // Przechodzimy do Payment Method
    await page.getByRole("button", { name: "Next Step" }).click();
    await expect(
      page.getByRole("heading", { name: "Payment Method", level: 2 })
    ).toBeVisible({ timeout: 10000 });

    await page.getByRole("radio", { name: "Credit Card" }).check();
    await expect(
      page.getByRole("radio", { name: "Credit Card" })
    ).toBeChecked();

    await page.getByRole("button", { name: "Next Step" }).click();
    await expect(
      page.getByRole("heading", { name: "Delivery Method", level: 2 })
    ).toBeVisible({ timeout: 10000 });

    await page.getByText("Standard shipping").click();

    await page.getByRole("button", { name: "Next Step" }).click();
    await expect(
      page.getByRole("heading", { name: "Order Summary", level: 2 })
    ).toBeVisible({ timeout: 10000 });

    await expect(
      page.getByRole("heading", { name: "Order Summary", level: 2 })
    ).toBeVisible();
    await expect(page.locator("text=Mike")).toBeVisible();
    await expect(page.locator("text=Doe")).toBeVisible();
    await expect(page.locator("text=test@example.com")).toBeVisible();
    await expect(page.locator("text=1-570-236-7033")).toBeVisible();
    await expect(page.locator("text=123 Main St 42")).toBeVisible();
    await expect(page.locator("text=12926-3874 Somewhere")).toBeVisible();
    await expect(page.locator("text=Standard shipping")).toBeVisible();
    await expect(page.locator("text=Credit Card")).toBeVisible();

    await expect(page.getByText("Total", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Place Order" }).click();
    await expect(page.locator("text=Order Submitted!")).toBeVisible({
      timeout: 10000,
    });
    await page.locator("button", { hasText: "Close" }).click();
    await expect(page.locator("text=Order Submitted!")).toBeHidden({
      timeout: 10000,
    });
  });
});
