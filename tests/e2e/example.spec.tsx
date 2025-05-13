import { test, expect } from "@playwright/test";

test("strona główna ma poprawny tytuł", async ({ page }) => {
  await page.goto("http://localhost:5173/outfit");
  await expect(page).toHaveTitle(/the Outfit/i);
});

test("strona główna ma poprawny tytuł", async ({ page }) => {
  await page.goto("http://localhost:5173/outfit");
  await expect(page).toHaveTitle(/the Outfit/i);
});
