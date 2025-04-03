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
import StepNavigation from "./SlepNavigation";
import { useUserData } from "../../api";

export type CheckoutFormData = {
  name: {
    firstname: string;
    lastname: string;
  };

  phone: string;

  address: {
    city: string;
    zipcode: string;
    street: string;
    number: number;
  };

  email: string;
  paymentMethod: string;
  deliveryMethod: string;
};

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data: user } = useUserData();
  const dispatch = useDispatch();
  const { mutate: sendCart, isPending } = useSendCart();

  const { step, buyerInfo, paymentMethod, deliveryMethod } = useSelector(
    (state: RootState) => state.order
  );

  return (
    <div className="w-full mx-auto bg-gray-50 flex flex-col items-center p-12 gap-6">
      <h2 className="text-3xl font-semibold">Checkout</h2>
      <div className="w-full max-w-2xl">
        <StepNavigation currentStep={step} />
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
          />
        )}
        {step === 3 && (
          <DeliveryForm
            onSubmit={(data) => {
              dispatch(setDeliveryMethod(data.deliveryMethod));
              sendCart(cartItems, {
                onSuccess: () => {
                  dispatch(clearCart());
                  console.log(buyerInfo, paymentMethod, deliveryMethod);
                },
              });
            }}
            isLoading={isPending}
          />
        )}
      </div>
      <div className="mt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={() => dispatch(prevStep())}
            className="p-3 bg-gray-500 text-white rounded-md"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
