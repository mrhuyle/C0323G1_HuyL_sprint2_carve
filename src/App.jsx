import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product_detail" element={<ProductDetail />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
            <Route path="/cart" element={<Cart />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
