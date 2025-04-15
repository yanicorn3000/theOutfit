import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faCircleUser,
  faShoppingCart,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Topbar from "./Topbar";

const navItems: { id: string; title: string; link: string }[] = [
  { id: "category-1", title: "Womenswear", link: "/outfit/women" },
  { id: "category-2", title: "Menswear", link: "/outfit/men" },
  { id: "category-3", title: "Jewellery", link: "/outfit/accessories" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`outfit/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <Topbar />
      <nav className="bg-white dark:bg-gray-700 md:shadow-md p-6 sticky">
        <div className="container mx-auto flex flex-col items-center">
          <Link
            to="/outfit"
            className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
          >
            THE OUTFIT
          </Link>

          <div className="w-full flex justify-between items-center">
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.link;
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    className={clsx(
                      "hover:text-gray-600 dark:hover:text-white text-lg",
                      isActive
                        ? "font-bold text-gray-800 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-200"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center md:space-x-4 justify-between flex-row-reverse w-full">
              <div className="flex gap-5 flex-row-reverse items-center">
                <Link to="/outfit/cart" className="relative">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-gray-400 dark:text-gray-200 text-2xl hover:text-gray-500 hover:dark:text-white transition duration-300"
                  />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-400 text-white font-semibold text-xs rounded-[2.5rem] min-w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <Link to="/outfit/login" className="relative">
                  {isAuthenticated ? (
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-3xl text-emerald-400   hover:text-emerald-500 dark:hover:text-emerald-300 transition duration-300"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-2xl text-gray-400  dark:text-gray-200  hover:text-gray-500 hover:dark:text-white transition duration-300"
                    />
                  )}
                </Link>

                <form onSubmit={handleSearch} className="hidden md:flex mr-5">
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search..."
                    className="border-1 border-gray-300 dark:border-gray-500 text-gray-500 dark:text-gray-100 rounded-l-md px-3 py-1 focus:outline-none border-r-0 focus:ring-gray-400 dark:bg-gray-700"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-gray-400 text-gray-700 border-1 dark:bg-gray-700 dark:border-gray-500 border-gray-400 rounded-r-md px-3 py-1 cursor-pointer hover:bg-gray-500 hover:dark:bg-gray-600 hover:dark:border-gray-400  hover:border-gray-500 transition duration-300 ease-in-out"
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-gray-100 dark:text-gray-300 text-lg"
                    />
                  </button>
                </form>
              </div>
              <button
                className="md:hidden p-2 flex justify-center items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FontAwesomeIcon
                  icon={isOpen ? faXmark : faBars}
                  className="text-gray-800 text-2xl ml-4"
                />
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 p-4 bg-white shadow-md">
            {navItems.map((item) => {
              return (
                <Link to={item.link} className="hover:text-gray-600">
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
