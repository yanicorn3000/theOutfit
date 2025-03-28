import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  email: z
    .string()
    .email("Please, provide a valid email")
    .min(1, "Email is required"),
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
    <div className="w-full flex flex-col items-center justify-center py-10 gap-4 bg-gray-50 ">
      <h2 className="text-3xl font-semibold mt-4">
        Subscribe to our newsletter
      </h2>
      <p className="text-gray-500">
        Sign up for promotions, tailored new arrivals, stock updates and more –
        straight to your inbox
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
        <input
          type="email"
          {...register("email")}
          className="p-2 border border-gray-300 rounded-l-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-white"
          placeholder="Your email"
        />

        <button
          type="submit"
          className="p-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-500 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      {message && (
        <div
          className={`mt-1 p-3 text-center rounded-md text-sm font-semibold transition-opacity duration-500 ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};
export default Newsletter;
