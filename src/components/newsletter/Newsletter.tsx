import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import clsx from "clsx";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please, provide a valid email"),
});

type FormData = z.infer<typeof schema>;

const Newsletter: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      console.log("Data sent:", data);

      // Symulacja opóźnienia (np. oczekiwanie na odpowiedź serwera)
      setTimeout(() => {
        setMessage({
          text: "You have successfully subscribed to our newsletter!",
          type: "success",
        });
        reset(); // Resetuje formularz po "udanym zapisie"
        setIsLoading(false);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({ text: `Error: ${error.message}`, type: "error" });
      } else {
        setMessage({ text: "Please, try again later", type: "error" });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 gap-4 bg-gray-50 dark:bg-gray-500 ">
      <h2 className="text-3xl font-semibold mt-4 text-gray-800 dark:text-white">
        Subscribe to our newsletter
      </h2>
      <p className="text-gray-500 dark:text-white text-center">
        Sign up for promotions, tailored new arrivals, stock updates and more –
        straight to your inbox
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
        <input
          type="email"
          {...register("email")}
          className="p-2 border-1 border-gray-400 border-r-transparent rounded-l-md w-64 focus:outline-none  bg-white dark:bg-gray-700 dark:text-white"
          placeholder="Your email"
        />

        <button
          type="submit"
          className="py-2 px-3 border-1 border-gray-700 bg-gray-700 text-white rounded-r-md hover:bg-gray-500 dark:hover:bg-gray-800 hover:border-gray-500 dark:hover:border-gray-400 dark:border-gray-400 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {errors.email && (
        <p className="text-rose-500 bg-red-100 text-center font-semibold px-2 py-1 rounded-md text-sm">
          {errors.email.message}
        </p>
      )}

      {message && (
        <div
          className={clsx(
            "mt-1 px-2 py-1 text-center rounded-md text-sm font-semibold",
            message.type === "success"
              ? "bg-emerald-100 text-emerald-500"
              : "bg-red-100 text-rose-500"
          )}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};
export default Newsletter;
