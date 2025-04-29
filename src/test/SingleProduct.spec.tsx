import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "../components/products/SingleProduct";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import "./setup";

const queryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderWithProviders = () => {
  window.history.pushState({}, "Test Page", "/product/1");

  return render(
    <QueryClientProvider client={queryClient()}>
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:productId" element={<SingleProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </QueryClientProvider>
  );
};

describe("SingleProduct component", () => {
  it("should render product fetched via MSW", async () => {
    renderWithProviders();

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

  it("should update selected size when a size is chosen", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const spinner = screen.queryByRole("status");
    expect(spinner).not.toBeInTheDocument();

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

    renderWithProviders();

    const alert = await screen.findByRole("alert");

    await waitFor(() => expect(alert).toBeInTheDocument());
  });
});
