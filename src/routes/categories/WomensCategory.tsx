import { fetchProductsByCategory } from "../../api";
import { useQuery } from "@tanstack/react-query";
import List from "../../components/products/List";
import { Product } from "../../components/products/ProductList";

const WomensCategory: React.FC = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["womens"],
    queryFn: () => fetchProductsByCategory("women's clothing"),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-red-600 text-center bg-red-300">
        Error: {error.message}
      </div>
    );

  return <List data={data ?? []} title={"Womenswear"} />;
};

export default WomensCategory;
