import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Newsletter from "../components/newsletter/Newsletter";
import userEvent from "@testing-library/user-event";

describe("Newsletter component", () => {
  it("renders newsletter form", () => {
    render(<Newsletter />);
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("displays message for invalid e-mail", async () => {
    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText("Your email");
    const submitButton = screen.getByText("Subscribe");

    await userEvent.clear(emailInput);

    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Email is required/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
