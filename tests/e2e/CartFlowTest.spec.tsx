import { test, expect } from "@playwright/test";

test.describe("Cart Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/outfit");
    await page.evaluate(() => localStorage.clear());
  });
  test("shows empty cart message", async ({ page }) => {
    await page.goto("/outfit/cart");

    await expect(
      page.getByText("There’s nothing in your cart yet...")
    ).toBeVisible();
  });

  test("adds product to cart and shows it", async ({ page }) => {
    await page.route("**/products/1", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          title: "Mock Product 1",
          description: "Test description",
          price: 19.99,
          image: "https://via.placeholder.com/150",
          category: "tshirts",
          rating: { rate: 4.2, count: 50 },
        }),
      });
    });
    await page.goto("/outfit/1");

    await page.getByTestId("size-select").selectOption("M");

    await page.getByRole("button", { name: "Add to cart" }).click();

    await page.goto("/outfit/cart");

    await expect(page.getByText("Mock Product 1")).toBeVisible();
    await expect(page.getByText("Size: M")).toBeVisible();
    await expect(page.getByTestId("product-price")).toHaveText("$19.99");
  });

  test("increments product quantity", async ({ page }) => {
    await page.evaluate(() => {
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
    await page.goto("/outfit/cart");

    const plusButton = page.locator('button:has-text("+")');

    await expect(plusButton).toBeVisible({ timeout: 10000 });
    await plusButton.click();
    await expect(page.getByTestId("item-quantity")).toHaveText("2");
  });

  test("removes product from cart", async ({ page }) => {
    await page.evaluate(() => {
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
    await page.goto("/outfit/cart");

    const removeBtn = page.locator('[aria-label="Remove item"]');
    await expect(removeBtn).toBeVisible({ timeout: 5000 });
    await removeBtn.click();
    await expect(
      page.getByText("There’s nothing in your cart yet...")
    ).toBeVisible();
  });
});
