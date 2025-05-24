import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./routes/layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./utils";
import { setUser } from "./redux/authSlice";
import GlobalSpinner from "./components/spinner/GlobalSpinner";
import { RootState } from "./redux/store";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const user = getUser();
    if (user) {
      dispatch(setUser(user)); // Przywracamy stan użytkownika po odświeżeniu
    }
  }, [dispatch]); //efekt odpala się tylko raz (bo dispatch jest stabilny)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <RoutesComponent />
          <GlobalSpinner />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
