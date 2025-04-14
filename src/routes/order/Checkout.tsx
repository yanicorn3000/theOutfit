import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useSendCart, useUserData } from "../../api";
import { clearCart } from "../../redux/cartSlice";
import {
  setBuyerInfo,
  setPaymentMethod,
  setDeliveryMethod,
  nextStep,
  prevStep,
  addOrder,
} from "../../redux/orderSlice";
import UserInfoForm from "./UserInfoForm";
import PaymentForm from "./PaymentForm";
import DeliveryForm from "./DeliveryForm";
import StepNavigation from "./StepNavigation";
import OrderSummary from "./OrderSummary";
import { useState } from "react";

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const { data: user } = useUserData();
  const dispatch = useDispatch();
  const { mutate: sendCart } = useSendCart();
  const { step, buyerInfo, paymentMethod, deliveryMethod } = useSelector(
    (state: RootState) => state.checkout
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-600 flex flex-col items-center p-12 gap-10">
      <h2 className="text-3xl dark:text-gray-100 text-gray-800 font-semibold">
        Checkout
      </h2>
      <StepNavigation currentStep={step} />
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col gap-4">
        {step === 1 && (
          <UserInfoForm
            onSubmit={(data) => {
              dispatch(setBuyerInfo(data));
              dispatch(nextStep());
            }}
            user={user}
          />
        )}

        {step === 2 && (
          <PaymentForm
            onSubmit={(data) => {
              dispatch(setPaymentMethod(data.paymentMethod));
              dispatch(nextStep());
            }}
            onBack={() => dispatch(prevStep())}
          />
        )}
        {step === 3 && (
          <DeliveryForm
            onSubmit={(data) => {
              dispatch(setDeliveryMethod(data.deliveryMethod));
              dispatch(nextStep());
            }}
            onBack={() => dispatch(prevStep())}
          />
        )}

        {step === 4 && (
          <OrderSummary
            buyerInfo={buyerInfo}
            paymentMethod={paymentMethod}
            deliveryMethod={deliveryMethod}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onSubmit={() => {
              const newOrder = {
                cartItems,
                paymentMethod,
                deliveryMethod,
                date: new Date().toLocaleDateString(),
                status: "pending",
                total: subtotal,
              };
              sendCart(cartItems, {
                onSuccess: () => {
                  dispatch(clearCart());
                  dispatch(addOrder(newOrder));
                  setIsModalOpen(true);
                },
              });
            }}
            onBack={() => dispatch(prevStep())}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
