import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSingleProduct } from "../../api";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, error } = useSingleProduct(productId);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<null>(null);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error instanceof Error)
    return (
      <div className="text-red-600 text-center bg-red-300">
        Error: {error.message}
      </div>
    );

  return (
    <div>
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-cover"
      />
      <p>{product.description}</p>
      <span>${product.price}</span>
    </div>
  );
};

export default SingleProduct;
