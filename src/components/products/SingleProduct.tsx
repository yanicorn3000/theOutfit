import SelectSize from "./SelectSize";
import Stars from "./Stars";
import AddToCartButton from "./AddToCartButton";
import { useSingleProduct } from "../../api";
import { useParams } from "react-router-dom";
import { useState } from "react";

const SingleProduct = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useSingleProduct(productId as string);
  const [selectedSize, setSelectedSize] = useState<string>("Select size");

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error instanceof Error)
    return (
      <div className="text-red-600 text-center bg-red-300">
        Error: {error.message}
      </div>
    );

  return (
    <div className="grid grid-cols-2 w-full items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-50 p-12 mt-12">
      <div className="bg-white max-w-[80%] p-12 flex items-center justify-center rounded-lg shadow-sm h-full">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 items-start h-full">
        <h2 className="font-semibold text-2xl text-gray-800">
          {product.title}
        </h2>
        <p className="text-gray-600">{product.description}</p>

        <Stars rating={product.rating.rate} />
        <span className="font-semibold text-xl">${product.price}</span>
        <SelectSize
          category={product.category}
          variant="primary"
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <AddToCartButton
          selectedSize={selectedSize}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default SingleProduct;
