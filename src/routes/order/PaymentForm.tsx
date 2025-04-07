import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "./schems";
import { PaymentFormData, PaymentFormProps } from "../../types";
import clsx from "clsx";

const paymentMethods = ["Credit Card", "PayPal", "Cash on Delivery", "Blik"];

const PaymentForm = ({ onSubmit, onBack }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: undefined,
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-3xl w-full items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      <div className="flex gap-4 w-full flex-col max-w-xs mb-6">
        {paymentMethods.map((method, index) => (
          <label
            key={index}
            className={clsx(
              "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition",
              {
                "border-gray-300 hover:border-gray-400":
                  selectedPaymentMethod !== method,
                "border-emerald-400 bg-emerald-50 ":
                  selectedPaymentMethod === method,
              }
            )}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                value={method}
                {...register("paymentMethod")}
                className="cursor-pointer mr-5 focus:outline-none accent-gray-700"
              />
              <span className="font-medium">{method}</span>
            </div>
          </label>
        ))}
        {errors.paymentMethod && (
          <span className="text-rose-500">{errors.paymentMethod.message}</span>
        )}
      </div>
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
