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
import Invoice from "./components/Invoice";
import ConfirmOrder from "./components/ConfirmOrder";
import CreateProduct from "./components/crud/CreateProduct";
import AdminOrdersList from "./components/crud/AdminOrdersList";
import SearchPage from "./components/SearchPage";
import EditProduct from "./components/crud/EditProduct";
import ErrorPayment from "./components/ErrorPayment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route element={<PersistLogin />}>
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/search/" element={<SearchPage />} />
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
            <Route path="/admin/dashboard" element={<DashboardAdmin />}>
              <Route
                path="/admin/dashboard/product"
                element={<ProductsList />}
              />
              <Route
                path="/admin/dashboard/create-product"
                element={<CreateProduct />}
              />
              <Route
                path="/admin/dashboard/edit-product/:id"
                element={<EditProduct />}
              />
              <Route
                path="/admin/dashboard/orders"
                element={<AdminOrdersList />}
              />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
            <Route path="/user/dashboard" element={<DashboardUser />}>
              <Route path="/user/dashboard/setting" element={<UserSetting />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirm-order/:id" element={<ConfirmOrder />} />
            <Route path="/error-payment" element={<ErrorPayment />} />
          </Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            element={<RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_USER"]} />}
          >
            <Route path="/cart" element={<Cart />} />
            <Route path="/invoice" element={<Invoice />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
