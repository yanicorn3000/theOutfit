 

import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import Checkout from "../routes/order/Checkout";
import { SendCart } from "../types";
import * as api from "../api";
import * as authHook from "../redux/authHook";

vi.mock("../redux/authHook", () => ({
  useIsAuthenticated: vi.fn(),
}));

describe("Checkout Component", () => {
  beforeEach(() => {
    vi.spyOn(api, "useUserData").mockReturnValue({
      data: {
        email: "admin@example.com",
        name: { firstname: "John", lastname: "Doe" },
        address: {
          street: "123 Main St",
          city: "Somewhere",
          number: 12,
          zipcode: "12926-3874",
        },
        phone: "1-570-236-7033",
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as any);

    (authHook.useIsAuthenticated as Mock).mockReturnValue({
      id: 1,
      email: "admin@example.com",
    });

    vi.spyOn(api, "useSendCart").mockReturnValue({
      mutate: (data: SendCart, options?: any) => {
        options?.onSuccess?.(null, data, undefined);
      },
      data: null,
      error: null,
      isPending: false,
      isError: false,
      isSuccess: false,
      reset: vi.fn(),
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("goes through checkout steps and submits order", async () => {
    renderWithProviders(<Checkout />);

    const user = userEvent.setup();

    expect(await screen.findByLabelText(/First name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Last name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("admin@example.com");
    expect(screen.getByLabelText(/City/i)).toHaveValue("Somewhere");
    expect(screen.getByLabelText(/Street/i)).toHaveValue("123 Main St");
    expect(screen.getByLabelText(/House Number/i)).toHaveValue(12);
    expect(screen.getByLabelText(/ZIP Code/i)).toHaveValue("12926-3874");
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue(
      "1-570-236-7033"
    );
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await waitFor(() => {
      expect(screen.getByText(/Payment Method/i)).toBeInTheDocument();
    });
    await user.click(screen.getByLabelText(/Credit Card/i));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await waitFor(() => {
      expect(screen.getByText(/Delivery Method/i)).toBeInTheDocument();
    });
    await user.click(screen.getByLabelText(/Standard Shipping/i));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));

    await waitFor(() => {
      expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
    });
    await user.click(screen.getByRole("button", { name: /Place Order/i }));

    await waitFor(() => {
      expect(screen.getByText(/Order Submitted/i)).toBeInTheDocument();
    });
  });
});
