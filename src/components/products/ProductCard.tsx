import SelectSize from "./SelectSize";
import AddToCartButton from "./AddToCartButton";
import { Link } from "react-router-dom";
import Stars from "./Stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Product } from "./ProductList";
import { useState } from "react";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>("Select size");

  return (
    <div className="group relative overflow-hidden">
      <Link
        to={`/outfit/${product.id}`}
        className="border flex flex-col items-center rounded-lg overflow-hidden border-gray-100 p-4 shadow-md bg-white h-full"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-60 w-52 object-contain p-4 "
        />
        <button
          className="absolute right-10 top-10 focus:outline-none"
          aria-label="Add to favorites"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className="text-gray-300 text-2xl hover:text-red-300 cursor-pointer"
          />
        </button>
        <div className="flex flex-col items-center gap-5 flex-grow">
          <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm">
            {product.category}
          </span>
          <h2 className="font-semibold text-lg text-center text-gray-500">
            {product.title}
          </h2>
          <div className="flex flex-col items-center mt-auto gap-3">
            <Stars rating={product.rating.rate} />
            <div>
              <span className="text-gray-600 font-bold text-lg">
                ${product.price}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 border rounded-lg left-0 right-0 bg-white text-white text-center py-3 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <SelectSize
          category={product.category}
          variant="secondary"
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <AddToCartButton
          selectedSize={selectedSize}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default ProductCard;
