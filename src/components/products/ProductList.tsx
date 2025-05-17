import { useProducts } from "../../api";
import List from "./List";

const ProductList: React.FC = () => {
  const { data, error } = useProducts();

  if (error instanceof Error)
    return (
      <div className="text-rose-600 text-center bg-rose-300">
        Error: {error.message}
      </div>
    );

  return <List data={data ?? []} title={"Trending now"} />;
};

export default ProductList;
