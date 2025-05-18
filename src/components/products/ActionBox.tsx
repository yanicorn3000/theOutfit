import { Product } from "../../types";
import SelectSize from "./SelectSize";
import AddToCartButton from "./AddToCartButton";

const ActionBox = ({
  selectedSize,
  setSelectedSize,
  isError,
  setIsError,
  product,
  onSuccess,
  className,
}: {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  isError: boolean;
  setIsError: (val: boolean) => void;
  product: Product;
  onSuccess: () => void;
  className?: string;
}) => {
  return (
    <div className={className}>
      <SelectSize
        category={product.category}
        variant="secondary"
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        isError={isError}
        setIsError={setIsError}
      />
      <AddToCartButton
        selectedSize={selectedSize}
        id={product.id}
        title={product.title}
        price={product.price}
        image={product.image}
        variant="secondary"
        isError={isError}
        setIsError={setIsError}
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default ActionBox;
