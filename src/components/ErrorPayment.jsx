import React, { useEffect } from "react";
import MyFooter from "./MyFooter";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import errPayment from "../assets/img/error_payment.webp";
const ErrorPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    Swal.fire(
      "Thanh toán không thể hoàn thành",
      "Quý khách có thể chọn thanh toán lại tại mục lưu hoá đơn",
      "info"
    );
  }, []);

  const handleSearch = (searchInput) => {
    let result = searchInput.trim().replace(/" "/g, "");
    if (result === "") {
      navigate(`/search/ `);
    } else {
      navigate(`/search/${result}`);
    }
  };
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="pt-20 pb-20 bg-gray-100">
        <div className="container px-4 mx-auto">
          <div className="pt-3 pb-2 mx-auto mt-6 mb-5 italic font-extrabold leading-relaxed text-center rounded-2xl md:w-1/2">
            <h2 className="mb-3 text-4xl font-semibold text-brandPrimary head-title">
              THANH TOÁN CHƯA HOÀN THÀNH
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center">
              <Link to="/">
                <button
                  type="button"
                  className="text-lg focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
                >
                  Trang chủ
                </button>
              </Link>
              <Link to="/">
                <button
                  type="button"
                  className="text-lg focus:outline-none text-white bg-blue-800 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
                >
                  Danh mục hóa đơn
                </button>
              </Link>
            </div>

            <img
              src={errPayment}
              alt="no-items"
              className="object-fill w-1/2 opacity-50"
              style={{ height: "400px" }}
            />
          </div>
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default ErrorPayment;
