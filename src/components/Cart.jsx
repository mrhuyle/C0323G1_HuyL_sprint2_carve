import React from "react";
import MyFooter from "./MyFooter";
import Navbar from "./Navbar";

const Cart = () => {
  return (
    <>
      <Navbar />

      {/* cart */}
      <div className="h-screen py-20 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h1 className="mb-4 text-2xl font-semibold">Giỏ hàng</h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-3/4">
              <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="font-semibold text-left">Sản phẩm</th>
                      <th className="font-semibold text-left">Giá</th>
                      <th className="font-semibold text-left">Khuyến mãi</th>
                      <th className="font-semibold text-left">Tổng cộng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="w-16 h-16 mr-4"
                            src="https://via.placeholder.com/150"
                            alt="Product image"
                          />
                          <span className="font-semibold">
                            Bộ thẻ Java Core
                          </span>
                        </div>
                      </td>
                      <td className="py-4">20.000 đ</td>
                      <td className="py-4">10%</td>
                      <td className="py-4">18.000 đ</td>
                    </tr>
                    {/* More product rows */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-lg font-semibold">Tổng hợp</h2>
                <div className="flex justify-between mb-2">
                  <span>Tạm tính</span>
                  <span>18.000 đ</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Ưu đãi hạng</span>
                  <span>-10%</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Tổng cộng</span>
                  <span className="font-semibold">16.000 đ</span>
                </div>
                <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default Cart;
