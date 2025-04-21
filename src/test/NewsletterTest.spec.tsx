import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Newsletter from "../components/newsletter/Newsletter";

describe("Newsletter component", () => {
  test("renders newsletter form", () => {
    render(<Newsletter />);
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  test("displays message for invalid e-mail", async () => {
    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText("Your email");
    const submitButton = screen.getByText("Subscribe");

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    screen.debug();

    await waitFor(() => {
      const errorMessage = screen.getByText(/Email is required/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
