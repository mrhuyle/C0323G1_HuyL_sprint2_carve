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
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardUser from "./components/DashboardUser";
import ProductsList from "./components/crud/ProductsList";
import UserSetting from "./components/crud/UserSetting";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
            <Route path="/admin/dashboard" element={<DashboardAdmin />}>
              <Route
                path="/admin/dashboard/product"
                element={<ProductsList />}
              />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
            <Route path="/user/dashboard" element={<DashboardUser />}>
              <Route path="/user/dashboard/setting" element={<UserSetting />} />
            </Route>
          </Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product_detail" element={<ProductDetail />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
          <Route
            element={<RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_USER"]} />}
          >
            <Route path="/cart" element={<Cart />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
