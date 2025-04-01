import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { AddToCartProps } from "../../types";

const AddToCartButton: React.FC<AddToCartProps> = ({
  id,
  title,
  price,
  image,
  selectedSize,
  setIsError,
  variant = "primary",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (selectedSize === "Select size") {
      return setIsError(true);
    }

    setIsError(false);

    const productToAdd = {
      id,
      title,
      price,
      image,
      size: selectedSize,
      quantity: 1,
    };

    console.log(productToAdd);

    dispatch(addToCart(productToAdd));
    navigate("/outfit/cart");
  };
  return (
    <button
      onClick={handleAddToCart}
      className={clsx(
        "flex items-center justify-center gap-2 bg-gray-700 text-white cursor-pointer rounded hover:bg-gray-500 px-4 py-2 transition duration-300 w-full",
        {
          "max-w-3xl text-lg mt-4": variant === "primary",
          "justify-self-center max-w-xs text-md mt-3": variant === "secondary",
        }
      )}
    >
      Add to cart
      <FontAwesomeIcon icon={faCartPlus} className="text-gray-200 " />
    </button>
  );
};

export default AddToCartButton;
