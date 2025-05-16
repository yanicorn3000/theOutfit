import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { renderWithProviders } from "./test-utils";
import { store } from "../redux/store";
import { loginSuccess } from "../redux/authSlice";
import Login from "../routes/user/Login";
import { useIsAuthenticated } from "../redux/authHook";
import userEvent from "@testing-library/user-event";
import { useLogin } from "../api";

vi.mock("../redux/authHook", () => ({
  useIsAuthenticated: vi.fn(),
}));

vi.mock("../api", () => ({
  useLogin: vi.fn().mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
    isError: false,
  }),

  useUserData: vi.fn().mockReturnValue({
    data: {
      username: "Admin",
      email: "admin@example.com",
      name: {
        firstname: "John",
        lastname: "Doe",
      },
      address: {
        street: "123 Main St",
        city: "Somewhere",
        zipcode: "12345",
        geolocation: {
          lat: "37.7749",
          long: "122.4194",
        },
      },
      phone: "+1 123-456-7890",
    },
    isPending: false,
    isError: false,
  }),
}));

describe("Login component", () => {
  it("should render <Profile /> when user is authenticated", async () => {
    (useIsAuthenticated as Mock).mockReturnValue({
      id: 1,
      username: "Admin",
    });

    store.dispatch(loginSuccess({ id: 1, username: "Admin" }));

    renderWithProviders(<Login />);
    const profileText = await screen.findByText(/Your Orders/i);

    expect(profileText).toBeInTheDocument();
  });

  it("should render login form when user is not authenticated", async () => {
    (useIsAuthenticated as Mock).mockReturnValue(null);

    renderWithProviders(<Login />);

    await waitFor(() => {
      const login = screen.getByRole("button", { name: /Login/i });
      expect(login).toBeInTheDocument();
    });
  });

  it("should show validation errors when submitting empty form", async () => {
    const mutateMock = vi.fn();
    (useLogin as Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useIsAuthenticated as Mock).mockReturnValue(null);

    renderWithProviders(<Login />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });

    await userEvent.clear(usernameInput);
    await userEvent.clear(passwordInput);
    await userEvent.click(submitButton);

    await waitFor(() => {
      const usernameError = screen.getByText(/Username is required/i);
      const passwordError = screen.getByText(/Password is required/i);
      expect(usernameError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();

      expect(mutateMock).not.toHaveBeenCalled();
    });
  });

  it("should call mutate with correct data on valid submit", async () => {
    const mutateMock = vi.fn();
    (useLogin as Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useIsAuthenticated as Mock).mockReturnValue(null);

    renderWithProviders(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });
    await userEvent.type(usernameInput, "admin");
    await userEvent.type(passwordInput, "admin");

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        username: "admin",
        password: "admin",
      });
      expect(mutateMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should disable submit button when isPending is true", () => {
    const mutateMock = vi.fn();

    (useLogin as Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
      isError: false,
    });

    renderWithProviders(<Login />);
    const button = screen.getByRole("button", { name: /Logging in.../i });

    expect(button).toBeDisabled();
  });

  it("should display error messages under inputs if validation fails", async () => {
    const mutateMock = vi.fn();
    const resetMock = vi.fn();
    (useLogin as Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: true,
      reset: resetMock,
    });
    (useIsAuthenticated as Mock).mockReturnValue(null);

    renderWithProviders(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(usernameInput, "wronguser");
    await userEvent.type(passwordInput, "wrongpassword");
    await userEvent.click(submitButton);

    await waitFor(() => {
      const validationError = screen.getByText(/Invalid username or password/i);
      expect(validationError).toBeInTheDocument();
    });
  });
});
