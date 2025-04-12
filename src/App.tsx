import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./routes/layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./utils";
import { setUser } from "./redux/authSlice";
import GlobalSpinner from "./components/spinner/GlobalSpinner";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getUser();
    if (user) {
      dispatch(setUser(user)); // Przywracamy stan użytkownika po odświeżeniu
    }
  }, [dispatch]);
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
