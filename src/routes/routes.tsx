import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import WomensCategory from "./categories/WomensCategory";
import MensCategory from "./categories/MensCategory";
import JewelleryCategory from "./categories/JewelleryCategory";
import SingleProduct from "../components/products/SingleProduct";
import Cart from "./cart/Cart";
import Checkout from "./order/Checkout";
import Register from "./user/Register";
import Login from "./user/Login";
import Search from "./search/Search";
import Profile from "./user/Profile";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/outfit" Component={Home} />
      <Route path="/outfit/women" Component={WomensCategory} />
      <Route path="/outfit/men" Component={MensCategory} />
      <Route path="/outfit/accessories" Component={JewelleryCategory} />
      <Route path="/outfit/:productId" Component={SingleProduct} />
      <Route path="/outfit/cart" Component={Cart} />
      <Route path="/outfit/checkout" Component={Checkout} />
      <Route path="/outfit/register" Component={Register} />
      <Route path="/outfit/login" Component={Login} />
      <Route path="/outfit/search" Component={Search} />
      <Route path="/outfit/profile" Component={Profile} />
    </Routes>
  );
};

export default RoutesComponent;
