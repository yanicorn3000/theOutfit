const Spinner: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center py-10"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
