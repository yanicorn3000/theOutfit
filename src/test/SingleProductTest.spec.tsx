import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import SingleProduct from "../components/products/SingleProduct";
import { renderWithRouter } from "./test-utils";
import userEvent from "@testing-library/user-event";
import { server } from "./mocks/server";
import { http, HttpResponse } from "msw";

describe("SingleProduct component", () => {
  it("should render product fetched via MSW", async () => {
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const title = await screen.findByText("Mock Product 1");
    const price = screen.getByText("$29.99");
    const description = screen.getByText(
      "This is a mocked product description."
    );
    const image = screen.getByRole("img", { name: /Mock Product 1/i });

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/150");
  });

  it("should show loading spinner while product is loading", async () => {
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("should update selected size when a size is chosen", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const sizeSelect = await screen.findByDisplayValue("--Select size--");

    const button = await screen.findByText("Add to cart");

    await user.selectOptions(sizeSelect, "L");

    expect(sizeSelect).toHaveValue("L");

    expect(button).toBeInTheDocument();
  });

  it("should show error message when API fails", async () => {
    server.use(
      http.get("https://fakestoreapi.com/products/:productId", () => {
        return new HttpResponse("Internal Server Error", { status: 500 });
      })
    );

    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    const alert = await screen.findByRole("alert");

    await waitFor(() => expect(alert).toBeInTheDocument());
  });

  it("should show error when trying to add to cart without selecting size", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SingleProduct />, { route: "/products/1" });

    await screen.findByText("Mock Product 1");

    const button = screen.getByText("Add to cart");

    await user.click(button);

    const select = screen.getByTestId("size-select");
    expect(select).toHaveClass("border-rose-500");
  });
});
