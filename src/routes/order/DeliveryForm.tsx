import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliverySchema } from "./schems";
import { DeliveryFormData, DeliveryFormProps } from "../../types";

const deliveryMethods = ["Standard shipping", "Express shipping", "Pickup"];

const DeliveryForm = ({ onSubmit, onBack }: DeliveryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryMethod: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-3xl"
    >
      <h2 className="text-2xl font-bold mb-4">Delivery Method</h2>
      {deliveryMethods.map((method) => (
        <label key={method} className="flex items-center gap-2">
          <input
            type="radio"
            value={method}
            {...register("deliveryMethod")}
            className="cursor-pointer"
          />
          {method}
        </label>
      ))}
      {errors.deliveryMethod && (
        <span className="text-rose-500">{errors.deliveryMethod.message}</span>
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
          className="w-full p-3 bg-gray-700 text-white rounded-md cursor-pointer"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default DeliveryForm;
