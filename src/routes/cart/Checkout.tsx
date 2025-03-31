import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { clearCart } from "../../redux/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return <div>Hi</div>;
};

export default Checkout;
