import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliverySchema } from "./schems";
import { DeliveryFormData, DeliveryFormProps } from "../../types";
import Button from "../../components/buttons/Button";
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
      <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">
        Delivery Method
      </h2>
      <div className="flex gap-4 w-full flex-col max-w-xs mb-6">
        {deliveryMethods.map((el, index) => {
          const id = `delivery-${index}`;

          return (
            <div key={id}>
              <input
                id={id}
                type="radio"
                value={el.method}
                {...register("deliveryMethod")}
                className="hidden"
              />
              <label
                htmlFor={id}
                className={clsx(
                  "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition text-gray-800 dark:text-gray-100",
                  {
                    "border-gray-300 dark:border-gray-400 hover:border-gray-400":
                      selectedMethod !== el.method,
                    "border-emerald-400 bg-emerald-50 dark:bg-emerald-100 dark:text-gray-800":
                      selectedMethod === el.method,
                  }
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{el.method}</span>
                </div>
                <span className="font-semibold text-gray-600 ml-5">
                  ${el.cost}
                </span>
              </label>
            </div>
          );
        })}

        {errors.deliveryMethod && (
          <span className="text-rose-500">{errors.deliveryMethod.message}</span>
        )}
      </div>

      <div className="flex gap-4 w-full">
        <Button type="button" onClick={onBack} variant="outline" fullWidth>
          Previous Step
        </Button>
        <Button type="submit" variant="primary" fullWidth>
          Next Step
        </Button>
      </div>
    </form>
  );
};

export default DeliveryForm;
