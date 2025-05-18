import clsx from "clsx";
import { StepNavigationProps } from "../../types";

const steps = [
  { num: 1, label: "User Data" },
  { num: 2, label: "Payment" },
  { num: 3, label: "Delivery" },
  { num: 4, label: "Summary" },
];

const StepNavigation = ({ currentStep }: StepNavigationProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between ">
        {steps.map(({ num, label }) => {
          const isActive = currentStep === num;

          return (
            <div
              key={num}
              className={clsx(
                "flex-1 text-center pb-2 transition-colors duration-200",
                {
                  "text-emerald-500 dark:text-emerald-400 font-semibold border-b-2 border-emerald-500":
                    isActive,
                  "text-gray-400 dark:text-gray-200 border-b-2 border-transparent":
                    !isActive,
                }
              )}
            >
              <div className="text-sm uppercase tracking-wide">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepNavigation;
