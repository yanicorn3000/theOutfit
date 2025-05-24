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

  if (isPending || !data) return <Spinner />;
  if (error) return <div>Something went wrong.</div>;

  return (
    <>
      {filtered?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-3 p-10 min-h-100 h-full dark:bg-gray-600 bg-gray-50">
          <p className="font-semibold text-xl text-gray-700 dark:text-white">
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
    </>
  );
};

export default Search;
