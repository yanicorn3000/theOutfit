import { fetchProducts } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Stars from "./Stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type Rating = {
  rate: number;
  count: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

const ProductList: React.FC = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-red-600 text-center bg-red-300">
        Error: {error.message}
      </div>
    );

  return (
    <section className="w-full flex flex-col items-center bg-gradient-to-b from-white via-gray-50 to-gray-50 p-12 gap-10 ">
      <h2 className="font-semibold text-3xl text-gray-700">Trending now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full h-full">
        {data?.map((product: Product) => {
          return (
            <div
              key={product.id}
              className="relative border flex flex-col items-center rounded-lg overflow-hidden border-gray-100 p-6 shadow-md bg-white h-full"
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
                <Link
                  to="/"
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm"
                >
                  {product.category}
                </Link>
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductList;
