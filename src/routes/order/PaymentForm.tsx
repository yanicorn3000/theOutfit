import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "./schems";
import { PaymentFormData, PaymentFormProps } from "../../types";

const paymentMethods = ["Credit Card", "PayPal", "Cash on Delivery", "Blik"];

const PaymentForm = ({ onSubmit, onBack }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: undefined,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-3xl"
    >
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      {paymentMethods.map((method) => (
        <label key={method} className="flex items-center gap-2">
          <input
            type="radio"
            value={method}
            {...register("paymentMethod")}
            className="cursor-pointer"
          />
          {method}
        </label>
      ))}
      {errors.paymentMethod && (
        <span className="text-rose-500">{errors.paymentMethod.message}</span>
      )}
      <div className="flex gap-4 w-full">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-white p-3 w-full text-gray-700 border border-gary-700 cursor-pointer rounded-md hover:bg-gray-700 hover:text-white transition duration-300"
        >
          Previous Step
        </button>
        <button
          type="submit"
          className="w-full p-3 bg-gray-800 text-white rounded-md cursor-pointer"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
