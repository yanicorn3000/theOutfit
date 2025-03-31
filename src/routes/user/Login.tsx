import { useLogin } from "../../api";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../../redux/store";
import Profile from "./Profile";
import { LoginData } from "../../types";

const Login = () => {
  const { mutate, isPending } = useLogin();

  const { register, handleSubmit } = useForm<LoginData>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isAuthenticated = useIsAuthenticated();

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
    <div className="flex flex-col items-center justify-center p-8 my-7">
      <h2 className="text-2xl mb-4 font-semibold">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 flex flex-col gap-4"
      >
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            {...register("username")}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full p-3 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-500"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
