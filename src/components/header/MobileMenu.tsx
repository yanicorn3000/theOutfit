import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MobileMenuProps } from "../../types";

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  items,
}) => {
  return isOpen ? (
    <div className="fixed inset-0 overflow-y-auto z-50 h-screen bg-white dark:bg-gray-800 flex flex-col space-y-6 p-8 md:hidden ">
      <button
        className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-gray-300"
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="mt-12 flex flex-col space-y-8">
        {items.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.link}
              onClick={() => setIsOpen(false)}
              className="text-2xl text-gray-800 dark:text-white transition"
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default MobileMenu;
