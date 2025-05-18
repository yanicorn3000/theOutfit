import { Link } from "react-router-dom";
import Stars from "./Stars";
import { Product } from "../../types";
import { useState } from "react";
import AddToCartModal from "./AddToCartModal";
import ActionBox from "./ActionBox";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>("Select size");
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="group relative overflow-hidden shadow-md rounded-lg box-border">
        <Link
          to={`/outfit/${product.id}`}
          className="border flex flex-col items-center gap-4 overflow-hidden border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-800 h-full"
        >
          <div className=" bg-white border-box w-full flex items-center justify-center h-60">
            <img
              src={product.image}
              alt={product.title}
              className="h-60 w-52 object-contain p-4"
            />
          </div>

          <div className="flex flex-col items-center gap-4 flex-grow px-4 py-6">
            <span className="px-2 py-1 bg-gray-200 text-gray-800 dark:text-gray-100 dark:bg-gray-600 rounded-lg text-sm">
              {product.category}
            </span>
            <h2 className="font-semibold text-lg text-center text-gray-500 dark:text-gray-100">
              {product.title}
            </h2>
            <Stars rating={product.rating.rate} />

            <span className="text-gray-600 font-bold text-lg dark:text-white">
              ${product.price}
            </span>
          </div>
        </Link>
        <ActionBox
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          isError={isError}
          setIsError={setIsError}
          product={product}
          onSuccess={() => setIsModalOpen(true)}
          className="hidden md:block absolute px-2 bottom-0 rounded-b-lg left-0 right-0 bg-white dark:bg-gray-800 text-center py-4 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 border-r border-l border-gray-100 dark:border-gray-500"
        />
      </div>
    </>
  );
};

export default ProductCard;
