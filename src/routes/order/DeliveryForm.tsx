import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliverySchema } from "./schems";
import { DeliveryFormData, DeliveryFormProps } from "../../types";
import clsx from "clsx";

const deliveryMethods = [
  { method: "Standard shipping", cost: 5 },
  { method: "Express shipping", cost: 15 },
  { method: "Pickup", cost: 0 },
];

const DeliveryForm = ({ onSubmit, onBack }: DeliveryFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryMethod: "",
    },
  });

  const selectedMethod = watch("deliveryMethod");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-3xl w-full items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Delivery Method</h2>
      <div className="flex gap-4 w-full flex-col max-w-xs mb-6">
        {deliveryMethods.map((el, index) => (
          <label
            key={index}
            className={clsx(
              "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition",
              {
                "border-gray-300 hover:border-gray-400":
                  selectedMethod !== el.method,
                "border-emerald-400 bg-emerald-50 ":
                  selectedMethod === el.method,
              }
            )}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                value={el.method}
                {...register("deliveryMethod")}
                className="cursor-pointer mr-5 focus:outline-none accent-gray-700"
              />
              <span className="font-medium">{el.method}</span>
            </div>

            <span className="font-semibold text-gray-700 ml-5">${el.cost}</span>
          </label>
        ))}
        {errors.deliveryMethod && (
          <span className="text-rose-500">{errors.deliveryMethod.message}</span>
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
          className="w-full p-3 bg-gray-700 text-white rounded-md cursor-pointer"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default DeliveryForm;
