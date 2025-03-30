import { useProductsByCategory } from "../../api";
import List from "../../components/products/List";

const WomensCategory: React.FC = () => {
  const { data, isLoading, error } = useProductsByCategory("women's clothing");

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
