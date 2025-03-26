import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  email: z
    .string()
    .email("Nieprawidłowy format emaila")
    .min(1, "Email jest wymagany"),
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

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setMessage("");

    try {
      console.log("Data sent:", data);

      // Symulacja opóźnienia (np. oczekiwanie na odpowiedź serwera)
      setTimeout(() => {
        setMessage("You have successfully subscribed to our newsletter!");
        reset(); // Resetuje formularz po "udanym zapisie"
        setIsLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 4000);
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Unknown error");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="newsletter flex flex-col items-center justify-center py-10 gap-4 bg-gray-50">
      <h2 className="text-3xl font-semibold mt-4">
        Subscribe to our newsletter
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
        <input
          type="email"
          {...register("email")}
          className="p-2 border border-gray-300 rounded-l-md w-64"
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
        <p className="text-red-500 text-center mt-2">{errors.email.message}</p>
      )}

      {message && <p className="text-center mt-2">{message}</p>}
    </div>
  );
};
export default Newsletter;
