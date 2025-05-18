import SelectSize from "./SelectSize";
import Stars from "./Stars";
import AddToCartButton from "./AddToCartButton";
import { useSingleProduct } from "../../api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../spinner/Spinner";

const SingleProduct = () => {
  const { productId } = useParams();
  const { data: product, error } = useSingleProduct(productId as string);
  const [selectedSize, setSelectedSize] = useState<string>("Select size");
  const [isError, setIsError] = useState<boolean>(false);

  if (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return (
      <div className="text-rose-600 text-center bg-rose-300" role="alert">
        Error: {message}
      </div>
    );
  }

  if (!product) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-2 w-full items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-50 px-12 py-20 dark:from-gray-500 dark:via-gray-500 dark:to-gray-500">
      <div className="bg-white max-w-[80%] p-12 flex items-center justify-center rounded-lg shadow-sm h-full">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 items-start h-full">
        <h2 className="font-semibold text-2xl text-gray-800 dark:text-gray-100">
          {product.title}
        </h2>
        <p className="text-gray-600 dark:text-white">{product.description}</p>

        <Stars rating={product.rating.rate} />
        <span className="font-semibold text-xl text-gray-800 dark:text-white">
          ${product.price}
        </span>
        <SelectSize
          category={product.category}
          variant="primary"
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
          variant="primary"
          isError={isError}
          setIsError={setIsError}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
