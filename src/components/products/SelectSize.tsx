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
};

const SelectSize: React.FC<SizeProps> = ({
  category,
  selectedSize,
  setSelectedSize,
  variant = "primary",
}) => {
  const getSizes = (category: string) => {
    return category === "jewelery" ? jewelrySizes : clothingSizes;
  };

  return (
    <>
      <div className="relative w-full mt-2">
        <select
          value={selectedSize || ""}
          onChange={(e) => setSelectedSize(e.target.value)}
          className={clsx(
            " transition duration-300 w-full appearance-none cursor-pointer bg-white  text-gray-700 focus:outline-none focus:ring-2  focus:ring-blue-400 focus:border-blue-400 border border-gray-300 rounded-md ",

            {
              "p-3 text-base ": variant === "primary",
              "p-2 text-sm ": variant === "secondary",
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
          <FontAwesomeIcon icon={faChevronDown} className=" text-gray-500" />
        </div>
      </div>
    </>
  );
};

export default SelectSize;
