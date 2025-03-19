import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Carousel from "./components/carousel/Carousel";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Carousel />
    </BrowserRouter>
  );
};

export default App;
