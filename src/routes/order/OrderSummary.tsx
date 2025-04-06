import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getShippingCost } from "../../utils";
import { OrderSummaryProps } from "../../types";

const OrderSummary = ({
  buyerInfo,
  paymentMethod,
  deliveryMethod,
  onSubmit,
  onBack,
  isLoading,
}: OrderSummaryProps) => {
  const { items, subtotal } = useSelector((state: RootState) => state.cart);
  const shippingCost = deliveryMethod
    ? getShippingCost(deliveryMethod, subtotal)
    : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grd-cols-1 items-center justify-center lg:grid-cols-4 w-full lg:justify-between gap-6 text-gray-600"
            >
              <div className="col-span-1 flex justify-center ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="col-span-2">
                <span>{item.title}</span>
              </div>
              <div>
                <span className="text-gray-600 col-span-1 text-right">
                  {item.quantity} x ${item.price}
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center border-t border-t-gray-300 pt-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact Data</h3>
          <p>
            {buyerInfo?.name.lastname} {buyerInfo?.name.firstname}
          </p>
          <p>{buyerInfo?.email}</p>
          <p>{buyerInfo?.phone}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Address</h3>
          <p>
            {buyerInfo?.address.street} {buyerInfo?.address.number}
          </p>
          <p>
            {buyerInfo?.address.zipcode} {buyerInfo?.address.city}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Delivery Method</h3>
          <p>{deliveryMethod}</p>
          <span>${shippingCost.toFixed(2)}</span>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <p>{paymentMethod}</p>
        </div>
        <div className="flex justify-between items-center border-t border-t-gray-300 pt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button
          type="button"
          onClick={onBack}
          className="w-full p-3 bg-gray-400 text-white rounded-md cursor-pointer"
        >
          Previous Step
        </button>
        <button
          type="submit"
          className="w-full p-3 bg-emerald-500 text-white rounded-md cursor-pointer"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
