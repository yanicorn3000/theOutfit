import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Carousel from "./components/carousel/Carousel";
import ProductList from "./components/products/ProductList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Newsletter from "./components/newsletter/Newsletter";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Carousel />
        <ProductList />
        <Newsletter />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
