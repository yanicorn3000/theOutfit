import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import PaymentForm from "../routes/order/PaymentForm";

describe("PaymentForm Component", () => {
  const paymentMethods = ["Credit Card", "PayPal", "Google Pay", "Apple Pay"];

  it("renders all payment method options", () => {
    renderWithProviders(<PaymentForm onSubmit={vi.fn()} onBack={vi.fn()} />);

    paymentMethods.forEach((method) => {
      expect(screen.getByText(method)).toBeInTheDocument();
    });
  });

  it("shows validation error when submitting without selecting a payment method", async () => {
    const onSubmit = vi.fn();

    renderWithProviders(<PaymentForm onSubmit={onSubmit} onBack={vi.fn()} />);

    const nextButton = screen.getByRole("button", { name: /next step/i });
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByText(/payment method is required/i)
      ).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with selected payment method", async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<PaymentForm onSubmit={onSubmit} onBack={vi.fn()} />);

    const option = screen.getByLabelText("PayPal");
    await userEvent.click(option);

    const nextButton = screen.getByRole("button", { name: /next step/i });
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { paymentMethod: "PayPal" },
        expect.any(Object) // react-hook-form submit event
      );
    });
  });

  it("calls onBack when 'Previous Step' is clicked", async () => {
    const onBack = vi.fn();
    renderWithProviders(<PaymentForm onSubmit={vi.fn()} onBack={onBack} />);

    const prevButton = screen.getByRole("button", { name: /previous step/i });
    await userEvent.click(prevButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
