import { describe, it, expect, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import SingleProduct from "../components/products/SingleProduct";
import { renderWithRouter } from "./test-utils";
import userEvent from "@testing-library/user-event";
import { server } from "./mocks/server";
import { http, HttpResponse } from "msw";

afterEach(() => {
  server.resetHandlers();
});

describe("SingleProduct component", () => {
  it("renders product details fetched via MSW", async () => {
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const title = await screen.findByText("Mock Product 1");
    const price = await screen.findByText("$29.99");
    const description = await screen.findByText(
      "This is a mocked product description."
    );

    const image = await screen.findByRole("img", { name: /Mock Product 1/i });

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/150");
  });

  it("displays a loading spinner while the product is loading", async () => {
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("updates selected size when a size is chosen", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const sizeSelect = await screen.findByDisplayValue("--Select size--");

    const button = await screen.findByText("Add to cart");

    await user.selectOptions(sizeSelect, "L");

    expect(sizeSelect).toHaveValue("L");

    expect(button).toBeInTheDocument();
  });

  it("shows an error message when the API returns a 500 status", async () => {
    server.use(
      http.get("https://fakestoreapi.com/products/:productId", () => {
        return new HttpResponse("Internal Server Error", { status: 500 });
      })
    );

    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const alert = await screen.findByRole("alert");

    await waitFor(() => expect(alert).toBeInTheDocument());
  });

  it("shows a validation error when trying to add to cart without selecting size", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    await screen.findByText("Mock Product 1");

    const button = screen.getByRole("button", { name: /add to cart/i });

    await user.click(button);

    const select = screen.getByTestId("size-select");
    expect(select).toHaveClass("border-rose-500");
  });

  it("allows adding to cart after selecting a size", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const sizeSelect = await screen.findByDisplayValue("--Select size--");
    const addToCartButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });

    await user.selectOptions(sizeSelect, "M");
    await user.click(addToCartButton);

    const modal = await screen.findByText(/Product added!/i);
    expect(modal).toBeInTheDocument();
  });
});
