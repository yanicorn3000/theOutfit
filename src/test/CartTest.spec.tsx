import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi, beforeEach, afterEach, Mock } from "vitest";
import { renderWithCustomStore } from "./test-utils";
import Cart from "../routes/cart/Cart";
import * as authHook from "../redux/authHook";

vi.mock("../redux/authHook", () => ({
  useIsAuthenticated: vi.fn(),
}));

describe("Cart Component", () => {
  beforeEach(() => {
    (authHook.useIsAuthenticated as Mock).mockReturnValue({
      id: 1,
      email: "admin@example.com",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows empty cart message", () => {
    renderWithCustomStore(<Cart />, {
      preloadedState: {
        cart: {
          items: [],
          subtotal: 0,
        },
      },
    });

    expect(
      screen.getByText("There’s nothing in your cart yet...")
    ).toBeInTheDocument();
  });

  it("renders cart items and subtotal", () => {
    renderWithCustomStore(<Cart />, {
      preloadedState: {
        cart: {
          items: [
            {
              id: 1,
              title: "Mock product",
              price: 19.99,
              image: "https://via.placeholder.com/150",
              size: "L",
              quantity: 2,
            },
          ],
          subtotal: 39.98,
        },
      },
    });

    expect(screen.getByText("Mock product")).toBeInTheDocument();
    expect(screen.getByText("Size:")).toBeInTheDocument();
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("$39.98")).toBeInTheDocument();
  });

  it("increases quantity when '+' is clicked", async () => {
    const user = userEvent.setup();

    const { store } = renderWithCustomStore(<Cart />, {
      preloadedState: {
        cart: {
          items: [
            {
              id: 1,
              title: "Mock product",
              price: 19.99,
              image: "https://via.placeholder.com/150",
              size: "L",
              quantity: 1,
            },
          ],
          subtotal: 19.99,
        },
      },
    });

    const plusButton = screen.getByRole("button", { name: "+" });
    await user.click(plusButton);

    const state = store.getState().cart;
    expect(state.items[0].quantity).toBe(2);
    expect(state.subtotal).toBe(39.98);
  });

  it("decreases quantity when '-' is clicked", async () => {
    const user = userEvent.setup();

    const { store } = renderWithCustomStore(<Cart />, {
      preloadedState: {
        cart: {
          items: [
            {
              id: 1,
              title: "Mock product",
              price: 19.99,
              image: "https://via.placeholder.com/150",
              size: "L",
              quantity: 2,
            },
          ],
          subtotal: 39.98,
        },
      },
    });

    const minusButton = screen.getByRole("button", { name: "-" });
    await user.click(minusButton);

    const state = store.getState().cart;
    expect(state.items[0].quantity).toBe(1);
    expect(state.subtotal).toBe(19.99);
  });

  it("removes item when remove icon is clicked", async () => {
    const user = userEvent.setup();

    const { store } = renderWithCustomStore(<Cart />, {
      preloadedState: {
        cart: {
          items: [
            {
              id: 1,
              title: "Mock product",
              price: 19.99,
              image: "https://via.placeholder.com/150",
              size: "L",
              quantity: 1,
            },
          ],
          subtotal: 19.99,
        },
      },
    });

    const removeButton = screen.getByLabelText(/remove item/i);
    await user.click(removeButton);

    const state = store.getState().cart;
    expect(state.items.length).toBe(0);
    expect(state.subtotal).toBe(0);
  });
});
