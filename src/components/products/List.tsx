import { Product } from "./ProductList";
import ProductCard from "./ProductCard";

type ListProps = {
  data: Product[];
  title: string;
};

const List: React.FC<ListProps> = ({ data, title }) => {
  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-b from-white via-gray-50 to-gray-50 p-12 gap-10 ">
      <h2 className="font-semibold text-3xl text-gray-700">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full h-full">
        {data?.map((product: Product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};

export default List;
