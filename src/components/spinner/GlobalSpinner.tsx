import { useIsFetching } from "@tanstack/react-query";
import Spinner from "./Spinner";

const GlobalSpinner = () => {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-60 flex items-center justify-center z-50">
      <Spinner />
    </div>
  );
};
export default GlobalSpinner;
