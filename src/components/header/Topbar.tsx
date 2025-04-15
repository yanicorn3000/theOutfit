import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { toggleTheme } from "../../redux/themeSlice";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";

const Topbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div className="w-full bg-gray-800  dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-sm">
      <div className="container mx-auto flex justify-center items-center relative">
        <div className="text-center text-gray-100 dark:text-gray-200 h-5 overflow-hidden">
          <div className="transition-opacity duration-500 ease-in-out">
            Free Standard Delivery from 300$
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <label className="relative items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={() => dispatch(toggleTheme())}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none flex items-center rounded-full peer peer-checked:bg-gray-400 transition-colors duration-300"></div>
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="absolute text-[17px] h-6 w-5 left-0.5 top-1 transition-transform duration-300 peer-checked:translate-x-full dark:text-gray-100 text-gray-700"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
