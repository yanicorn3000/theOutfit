import { CheckoutFormData } from "./Checkout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "./schems";

type PaymentFormData = Pick<CheckoutFormData, "paymentMethod">;

type PaymentFormProps = {
  onSubmit: (data: PaymentFormData) => void;
};

const paymentMethods = ["Credit Card", "PayPal", "Cash on Delivery", "Blik"];

const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "",
    },
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-3xl mx-auto"
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
        <span className="text-red-500">{errors.paymentMethod.message}</span>
      )}
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-md"
      >
        Next
      </button>
    </form>
  );
};

export default PaymentForm;
