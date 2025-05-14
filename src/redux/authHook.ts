import type { RootState } from "./store";
import { useSelector } from "react-redux";

export const useIsAuthenticated = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  return isAuthenticated;
};
