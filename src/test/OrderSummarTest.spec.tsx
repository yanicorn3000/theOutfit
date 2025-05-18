import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import OrderSummary from "../routes/order/OrderSummary";
import { renderWithCustomStore } from "./test-utils";

const buyerInfoMock = {
  name: { firstname: "John", lastname: "Doe" },
  email: "john@example.com",
  phone: "123-456-7890",
  address: {
    street: "Main St",
    number: 10,
    zipcode: "12345",
    city: "Sample City",
  },
};

const paymentMethodMock = "Credit Card";
const deliveryMethodMock = "Express Shipping";

const preloadedState = {
  cart: {
    items: [
      {
        id: 1,
        title: "Test Product",
        price: 20,
        quantity: 2,
        image: "https://via.placeholder.com/150",
        size: "M",
      },
    ],
    subtotal: 40,
  },
};

vi.mock("../utils", () => ({
  getShippingCost: (method: string, subtotal: number) => {
    if (method.toLowerCase() === "express shipping" && subtotal === 40)
      return 15;
    return 0;
  },
}));

describe("OrderSummary component", () => {
  it("renders correctly with given props and redux state", async () => {
    const onBack = vi.fn();
    const onSubmit = vi.fn();
    const setIsModalOpen = vi.fn();

    const user = userEvent.setup();

    renderWithCustomStore(
      <OrderSummary
        buyerInfo={buyerInfoMock}
        paymentMethod={paymentMethodMock}
        deliveryMethod={deliveryMethodMock}
        isModalOpen={false}
        setIsModalOpen={setIsModalOpen}
        onSubmit={onSubmit}
        onBack={onBack}
        isLoading={false}
      />,
      { preloadedState }
    );

    expect(
      screen.getByRole("heading", { name: "Order Summary" })
    ).toBeInTheDocument();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("2 x $20")).toBeInTheDocument();
    const subtotalLabel = screen.getByText("Subtotal");
    expect(subtotalLabel.nextSibling).toHaveTextContent("$40.00");

    expect(screen.getByText("Doe John")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();

    expect(screen.getByText("Main St 10")).toBeInTheDocument();
    expect(screen.getByText("12345 Sample City")).toBeInTheDocument();

    expect(screen.getByText(deliveryMethodMock)).toBeInTheDocument();
    expect(screen.getByText(/\$15\.00/)).toBeInTheDocument();

    expect(screen.getByText(paymentMethodMock)).toBeInTheDocument();

    const totalLabel = screen.getByText("Total");

    expect(totalLabel.nextSibling).toHaveTextContent("$55.00");

    const backButton = screen.getByRole("button", { name: /previous step/i });
    const placeOrderButton = screen.getByRole("button", {
      name: /place order/i,
    });

    expect(backButton).toBeInTheDocument();
    expect(placeOrderButton).toBeInTheDocument();

    await user.click(backButton);
    expect(onBack).toHaveBeenCalled();

    await user.click(placeOrderButton);
    expect(onSubmit).toHaveBeenCalled();
  });

  it("shows loading state on submit button", () => {
    renderWithCustomStore(
      <OrderSummary
        buyerInfo={buyerInfoMock}
        paymentMethod={paymentMethodMock}
        deliveryMethod={deliveryMethodMock}
        isModalOpen={false}
        setIsModalOpen={() => {}}
        onSubmit={() => {}}
        onBack={() => {}}
        isLoading={true}
      />,
      { preloadedState }
    );

    const placeOrderButton = screen.getByRole("button", {
      name: /submitting.../i,
    });
    expect(placeOrderButton).toBeDisabled();
  });

  it("renders and closes modal", async () => {
    const setIsModalOpen = vi.fn();

    renderWithCustomStore(
      <OrderSummary
        buyerInfo={buyerInfoMock}
        paymentMethod={paymentMethodMock}
        deliveryMethod={deliveryMethodMock}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpen}
        onSubmit={() => {}}
        onBack={() => {}}
        isLoading={false}
      />,
      { preloadedState }
    );

    expect(screen.getByText(/order submitted!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/your order has been placed successfully./i)
    ).toBeInTheDocument();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
