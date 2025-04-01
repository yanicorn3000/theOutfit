import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faCircleUser,
  faHeart,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import clsx from "clsx";

const navItems: { id: string; title: string; link: string }[] = [
  { id: "category-1", title: "Womenswear", link: "/outfit/women" },
  { id: "category-2", title: "Menswear", link: "/outfit/men" },
  { id: "category-3", title: "Jewellery", link: "/outfit/accessories" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <nav className="bg-white md:shadow-md p-6 sticky">
      <div className="container mx-auto flex flex-col items-center">
        <Link to="/outfit" className="text-3xl font-bold text-gray-800 mb-2">
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
                    "hover:text-gray-600 text-lg",
                    isActive ? "font-bold text-gray-800" : "text-gray-600"
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
                  className="text-gray-400 text-2xl hover:text-gray-500"
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
                    className="text-3xl text-emerald-400  hover:text-emerald-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-2xl text-gray-400  hover:text-gray-500"
                  />
                )}
              </Link>

              <Link to="/outfit/favories">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-gray-400 text-2xl hover:text-gray-500"
                />
              </Link>
            </div>
            <button
              className="md:hidden p-2"
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
  );
};

export default Header;
