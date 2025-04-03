type StepNavigationProps = {
  currentStep: number;
};

const StepNavigation = ({ currentStep }: StepNavigationProps) => {
  const steps = [1, 2, 3];
  return (
    <div className="flex justify-between items-center w-full max-w-md mx-auto mb-6">
      {steps.map((num) => (
        <div
          key={num}
          className={currentStep >= num ? "text-blue-500" : "text-gray-500"}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default StepNavigation;
