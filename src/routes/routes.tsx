import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import WomensCategory from "./categories/WomensCategory";
import MensCategory from "./categories/MensCategory";
import JewelleryCategory from "./categories/JewelleryCategory";
import SingleProduct from "../components/products/SingleProduct";
import Cart from "./cart/Cart";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/outfit" Component={Home} />
      <Route path="/outfit/women" Component={WomensCategory} />
      <Route path="/outfit/men" Component={MensCategory} />
      <Route path="/outfit/accessories" Component={JewelleryCategory} />
      <Route path="/outfit/:productId" Component={SingleProduct} />
      <Route path="/outfit/cart" Component={Cart} />
    </Routes>
  );
};

export default RoutesComponent;
