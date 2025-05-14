import { useLogin } from "../../api";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../../redux/authHook";
import Profile from "./Profile";
import Button from "../../components/buttons/Button";
import { loginSchema, LoginData } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const Login = () => {
  const { mutate, isPending, isError, reset: resetMutation } = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isAuthenticated = useIsAuthenticated();

  const username = watch("username");
  const password = watch("password");

  useEffect(() => {
    if (isError && (username || password)) {
      resetMutation();
    }
  }, [username, password, isError, resetMutation]);

  const onSubmit = (data: LoginData) => {
    mutate(data);

    const redirectUrl = searchParams.get("redirect");
    if (redirectUrl) {
      navigate(redirectUrl);
    }
  };

  return isAuthenticated ? (
    <Profile />
  ) : (
    <div className="flex flex-col items-center justify-center bg-gray-50 py-15 px-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 font-semibold text-gray-800 dark:text-gray-200">
        Login
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 flex flex-col gap-2"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 dark:text-gray-100"
          >
            Username
          </label>
          <input
            {...register("username")}
            className="w-full p-2 border border-gray-300 mt-2 dark:border-gray-500 focus:outline-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md"
            placeholder="Enter your username"
            id="username"
            name="username"
          />
          {errors.username && (
            <p className="text-rose-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-100"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-white focus:outline-0 dark:border-gray-500 dark:bg-gray-800 dark:text-white"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-rose-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {isError && (
          <p className="text-rose-500 text-sm mt-1">
            Invalid username or password
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          variant="primary"
          className="mt-4"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
