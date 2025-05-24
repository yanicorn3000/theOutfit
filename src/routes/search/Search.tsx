import { useProducts } from "../../api";
import List from "../../components/products/List";
import { Product } from "../../types";
import { useLocation, Link } from "react-router-dom";
import { useMemo } from "react";
import Spinner from "../../components/spinner/Spinner";

const Search = () => {
  const location = useLocation();
  const query = useMemo(() => {
    return new URLSearchParams(location.search).get("q") || "";
  }, [location.search]);
  const { data, isPending, error } = useProducts();
  const filtered = useMemo(() => {
    return (data ?? []).filter((item: Product) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  if (isPending) return <Spinner />;
  if (error) return <div>Something went wrong.</div>;

  return (
    <div className="p-6 flex flex-col justify-center items-center bg-gradient-to-b from-white via-gray-50 to-gray-50 h-full">
      {filtered?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-3 p-10">
          <p className="font-semibold text-xl text-gray-700 ">
            No search results for "{query}"
          </p>
          <Link
            to="/outfit"
            className="bg-gray-700 text-white  border border-gary-700 cursor-pointer rounded hover:bg-gray-500 hover:text-white px-4 py-2 transition duration-300"
          >
            Back to main page
          </Link>
        </div>
      ) : (
        <List data={filtered} title={`Search results for "${query}"`} />
      )}
    </div>
  );
};

export default Search;
