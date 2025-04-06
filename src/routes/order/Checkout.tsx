import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useSendCart } from "../../api";
import { clearCart } from "../../redux/cartSlice";
import {
  setBuyerInfo,
  setPaymentMethod,
  setDeliveryMethod,
  nextStep,
  prevStep,
} from "../../redux/orderSlice";
import UserInfoForm from "./UserInfoForm";
import PaymentForm from "./PaymentForm";
import DeliveryForm from "./DeliveryForm";
import StepNavigation from "./StepNavigation";
import OrderSummary from "./OrderSummary";
import { useUserData } from "../../api";

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data: user } = useUserData();
  const dispatch = useDispatch();
  const { mutate: sendCart, isPending } = useSendCart();

  const { step, buyerInfo, paymentMethod, deliveryMethod } = useSelector(
    (state: RootState) => state.order
  );

  return (
    <div className="w-full bg-gray-50 flex flex-col items-center p-12 gap-10">
      <h2 className="text-3xl font-semibold">Checkout</h2>
      <StepNavigation currentStep={step} />
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
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
            onSubmit={() => {
              sendCart(cartItems, {
                onSuccess: () => {
                  dispatch(clearCart());
                  console.log(buyerInfo, paymentMethod, deliveryMethod);
                },
              });
            }}
            onBack={() => dispatch(prevStep())}
            isLoading={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
