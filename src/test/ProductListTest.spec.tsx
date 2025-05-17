import { renderWithProviders } from "./test-utils";
import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductList from "../components/products/ProductList";
import * as api from "../api";
import { Product } from "../types";
import type { UseQueryResult } from "@tanstack/react-query";

const createErrorMock = (
  errorMessage: string
): UseQueryResult<Product[], Error> =>
  ({
    data: undefined,
    error: new Error(errorMessage),
    isLoading: false,
    isError: true,
    isSuccess: false,
    status: "error",
    refetch: vi.fn(),
  } as unknown as UseQueryResult<Product[], Error>);

describe("ProductList Component", () => {
  it("renders product list with fetched data", async () => {
    vi.spyOn(api, "useProducts").mockReturnValue({
      data: [
        {
          id: 1,
          title: "Mock product",
          price: 19.99,
          description: "Sample product",
          category: "electronics",
          image: "https://via.placeholder.com/150",
          rating: { rate: 4.5, count: 200 },
        },
      ],
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: true,
      refetch: vi.fn(),
      status: "success",
    } as unknown as UseQueryResult<Product[], Error>);

    renderWithProviders(<ProductList />);

    expect(screen.getByText(/Trending now/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Mock product/i)).toBeInTheDocument();
    });
  });

  it("renders error message when fetch fails", async () => {
    vi.spyOn(api, "useProducts").mockReturnValue(
      createErrorMock("Failed to fetch")
    );

    renderWithProviders(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});
