import clsx from "clsx";
import Button from "../buttons/Button";
import { GenericModalProps } from "../../types";

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  buttons,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out"
      )}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 dark:text-white mt-4">{description}</p>
        )}
        <div className="flex w-full gap-3 mt-6 justify-center">
          {buttons.map((btn, idx) => (
            <Button
              key={idx}
              variant={btn.variant || "primary"}
              onClick={btn.onClick}
              className="w-full text-nowrap"
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
