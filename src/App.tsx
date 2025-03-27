import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./routes/layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <RoutesComponent />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
