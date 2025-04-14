import { ButtonProps } from "../../types";
import clsx from "clsx";

const Button = ({
  variant = "primary",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "py-3 px-4 rounded-md cursor-pointer transition duration-300 font-medium";
  const variants = {
    primary:
      "bg-gray-700 text-white hover:bg-gray-600 border border-gray-700 dark:border-gray-500",
    success: "bg-emerald-500 text-white hover:bg-emerald-600",
    outline:
      "text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white dark:bg-gray-800 dark:border-gray-500 dark:text-gray-300",
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        { "w-full": fullWidth },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
