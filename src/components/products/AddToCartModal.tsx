import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import clsx from "clsx";
import { AddToCartModalProps } from "../../types";

const AddToCartModal: React.FC<AddToCartModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out"
      )}
    >
      <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl max-w-sm w-full text-center">
        <h3 className="text-xl font-semibold text-emerald-500 dark:text-emerald-400">
          Product added to Cart!
        </h3>
        <p className="text-gray-600 dark:text-white mt-4">
          Product was successfully added to Your Cart!{" "}
        </p>
        <div className="flex flex-col gap-3 mt-6">
          <Button variant="success" onClick={() => navigate("/outfit/cart")}>
            Go To Cart
          </Button>
          <Button onClick={onClose}>Back to Shopping</Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
