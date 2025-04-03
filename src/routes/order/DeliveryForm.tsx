import { CheckoutFormData } from "./Checkout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliverySchema } from "./schems";

type DeliveryFormData = Pick<CheckoutFormData, "deliveryMethod">;

type DeliveryFormProps = {
  onSubmit: (data: DeliveryFormData) => void;
  isLoading: boolean;
};

const deliveryMethods = ["Courier", "Pickup", "Inpost"];

const DeliveryForm = ({ onSubmit, isLoading }: DeliveryFormProps) => {
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
      className="flex flex-col gap-4 max-w-3xl mx-auto"
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
        <span className="text-red-500">{errors.deliveryMethod.message}</span>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-3 bg-blue-500 text-white rounded-md"
      >
        {isLoading ? "Submitting..." : "Place Order"}
      </button>
    </form>
  );
};

export default DeliveryForm;
