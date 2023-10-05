import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product_detail" element={<ProductDetail />}></Route>
      </Routes>
    </>
  );
}

export default App;
