import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import DeliveryForm from "../routes/order/DeliveryForm";

describe("DeliveryForm Component", () => {
  const deliveryMethods = ["Standard shipping", "Express shipping", "Pickup"];

  it("renders all delivery method options", () => {
    renderWithProviders(<DeliveryForm onSubmit={vi.fn()} onBack={vi.fn()} />);

    deliveryMethods.forEach((method) => {
      expect(screen.getByText(method)).toBeInTheDocument();
    });
  });

  it("shows validation error when submitting without selecting a delivery method", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<DeliveryForm onSubmit={onSubmit} onBack={vi.fn()} />);

    const nextButton = screen.getByRole("button", { name: /next step/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByText(/delivery method is required/i)
      ).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with selected delivery method", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<DeliveryForm onSubmit={onSubmit} onBack={vi.fn()} />);

    await userEvent.click(screen.getByDisplayValue("Pickup"));

    const nextButton = screen.getByRole("button", { name: /next step/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { deliveryMethod: "Pickup" },
        expect.any(Object)
      );
    });
  });

  it("calls onBack when 'Previous Step' is clicked", async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<DeliveryForm onSubmit={vi.fn()} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /previous step/i });
    await user.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
