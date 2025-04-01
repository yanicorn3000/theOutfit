import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const clothingSizes = ["S", "M", "L", "XL"];
const jewelrySizes = ["One Size"];

type SizeProps = {
  category: string;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  variant?: "primary" | "secondary";
  isError: boolean;
  setIsError: (isError: boolean) => void;
};

const SelectSize: React.FC<SizeProps> = ({
  category,
  selectedSize,
  setSelectedSize,
  isError,
  variant = "primary",
  setIsError,
}) => {
  const getSizes = (category: string) => {
    return category === "jewelery" ? jewelrySizes : clothingSizes;
  };

  return (
    <>
      <div
        className={clsx(
          "relative w-full",

          {
            "max-w-3xl ": variant === "primary",
            "max-w-xs justify-self-center ": variant === "secondary",
          }
        )}
      >
        <select
          value={selectedSize || ""}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setIsError(false);
          }}
          className={clsx(
            "transition duration-300 w-full appearance-none cursor-pointer bg-white  text-gray-700 focus:outline-none focus:ring-2  focus:ring-blue-400 focus:border-blue-400 border rounded-md px-4 py-2",
            {
              "border-gray-300": !isError,
              "border-rose-500 animate-shake text-rose-500": isError,
            }
          )}
        >
          <option value="Select size" disabled>
            --Select size--
          </option>
          {getSizes(category).map((size) => {
            return (
              <option key={size} value={size} className="text-gray-600">
                {size}
              </option>
            );
          })}
        </select>
        <div
          className={clsx(
            "absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none  text-gray-500",
            {
              "text-base ": variant === "primary",
              "text-sm": variant === "secondary",
            }
          )}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className={clsx(" text-gray-500", {
              "text-gray-500": !isError,
              " animate-shake text-rose-500": isError,
            })}
          />
        </div>
      </div>
    </>
  );
};

export default SelectSize;
