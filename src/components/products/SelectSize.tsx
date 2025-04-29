import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { SizeProps } from "../../types";

const clothingSizes = ["S", "M", "L", "XL"];
const jewelrySizes = ["One Size"];

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

  console.log("jestem tutaj");

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
          data-testid="size-select"
          value={selectedSize || ""}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setIsError(false);
          }}
          className={clsx(
            "transition duration-300 w-full appearance-none cursor-pointer bg-white dark:bg-gray-700 dark:border-gray-500 focus:outline-none border rounded-md px-4 py-2",
            {
              "text-gray-700 dark:text-white border-gray-300": !isError,
              "border-rose-500 animate-shake text-rose-500 dark:text-rose-500":
                isError,
            }
          )}
        >
          <option value="Select size" disabled>
            --Select size--
          </option>
          {getSizes(category).map((size) => {
            return (
              <option key={size} value={size}>
                {size}
              </option>
            );
          })}
        </select>
        <div
          className={clsx(
            "absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none",
            {
              "text-base ": variant === "primary",
              "text-sm": variant === "secondary",
            }
          )}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className={clsx({
              "text-gray-500 dark:text-white": !isError,
              " animate-shake text-rose-500 dark:text-rose-500": isError,
            })}
          />
        </div>
      </div>
    </>
  );
};

export default SelectSize;
