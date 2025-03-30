import List from "../../components/products/List";
import { useProductsByCategory } from "../../api";

const JewelleryCategory: React.FC = () => {
  const { data, isLoading, error } = useProductsByCategory("jewelery");

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-red-600 text-center bg-red-300">
        Error: {error.message}
      </div>
    );

  return <List data={data ?? []} title={"Accessories"} />;
};

export default JewelleryCategory;
