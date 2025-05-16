import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import UserInfoForm from "../routes/order/UserInfoForm";

const mockUser = {
  email: "admin@example.com",
  name: {
    firstname: "John",
    lastname: "Doe",
  },
  address: {
    city: "Somewhere",
    street: "123 Main St",
    number: 12,
    zipcode: "12926-3874",
  },
  phone: "1-570-236-7033",
};

describe("UserInfoForm Component", () => {
  it("renders form with prefilled user data", () => {
    renderWithProviders(<UserInfoForm user={mockUser} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Email/i)).toHaveValue(mockUser.email);
    expect(screen.getByLabelText(/First name/i)).toHaveValue(
      mockUser.name.firstname
    );
    expect(screen.getByLabelText(/Last name/i)).toHaveValue(
      mockUser.name.lastname
    );
    expect(screen.getByLabelText(/City/i)).toHaveValue(mockUser.address.city);
    expect(screen.getByLabelText(/Street/i)).toHaveValue(
      mockUser.address.street
    );
    expect(screen.getByLabelText(/House Number/i)).toHaveValue(
      mockUser.address.number
    );
    expect(screen.getByLabelText(/ZIP Code/i)).toHaveValue(
      mockUser.address.zipcode
    );
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue(mockUser.phone);
  });

  it("shows validation errors on empty submission", async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<UserInfoForm user={undefined} onSubmit={onSubmit} />);
    const submitButton = screen.getByRole("button", { name: /Next Step/i });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with form data when form is valid", async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<UserInfoForm user={mockUser} onSubmit={onSubmit} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/First name/i)).toHaveValue("John");
    });

    await userEvent.click(screen.getByRole("button", { name: /Next Step/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "admin@example.com",
        name: {
          firstname: "John",
          lastname: "Doe",
        },
        address: {
          city: "Somewhere",
          street: "123 Main St",
          number: 12,
          zipcode: "12926-3874",
        },
        phone: "1-570-236-7033",
      });
    });
  });
});
