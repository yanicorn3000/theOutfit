import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getShippingCost } from "../../utils";
import { OrderSummaryProps } from "../../types";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const OrderSummary = ({
  buyerInfo,
  paymentMethod,
  deliveryMethod,
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  onBack,
  isLoading,
}: OrderSummaryProps) => {
  const { items, subtotal } = useSelector((state: RootState) => state.cart);
  const shippingCost = deliveryMethod
    ? getShippingCost(deliveryMethod, subtotal)
    : 0;
  const total = subtotal + shippingCost;
  const navigate = useNavigate();

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/outfit/login");
  };

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
          className="bg-gray-white p-3 w-full text-gray-700 border border-gary-700 cursor-pointer rounded-md hover:bg-gray-700 hover:text-white transition duration-300"
        >
          Previous Step
        </button>
        <button
          type="submit"
          className="w-full p-3 bg-emerald-500 text-white rounded-md cursor-pointer hover:bg-emerald-600 transition duration-300"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Place Order"}
        </button>
      </div>

      {isModalOpen && (
        <div
          className={clsx(
            "fixed inset-0 flex items-center justify-center bg-gray-800 z-50 transition-opacity duration-300 ease-in-out",
            "modalBackground"
          )}
        >
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold text-green-500">
              Order Submitted!
            </h3>
            <p className="text-gray-600 mt-4">
              Your order has been placed successfully.
            </p>
            <button
              className="mt-6 w-full p-3 bg-emerald-500 text-white rounded-md cursor-pointer hover:bg-emerald-600 transition duration-300"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
