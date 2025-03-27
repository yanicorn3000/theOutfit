import { fetchProducts } from "../../api";
import { useQuery } from "@tanstack/react-query";
import List from "./List";

type Rating = {
  rate: number;
  count: number;
};

export type Product = {
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
  if (error instanceof Error)
    return (
      <div className="text-red-600 text-center bg-red-300">
        Error: {error.message}
      </div>
    );

  return <List data={data ?? []} title={"Trending now"} />;
};

export default ProductList;
