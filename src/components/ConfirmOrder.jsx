import React, { useEffect, useState } from "react";
import MyFooter from "./MyFooter";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import useCartContext from "../hooks/useCartContext";
import * as cartServices from "../services/cartServices";
import { Link, useParams, useNavigate } from "react-router-dom";
import vnpay from "../assets/img/vnpay.webp";
import Swal from "sweetalert2";
import { createVNPay } from "../services/paymentServices";

const formatNumber = (number) => {
  const roundedNumber = Math.floor(number);
  const formattedNumber = roundedNumber.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return formattedNumber;
};

const ConfirmOrder = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useCartContext();
  const [orderItems, setOrderItems] = useState();
  const [discount, setDiscount] = useState("");
  const [sum, setSum] = useState(0);

  const getCartItems = async () => {
    try {
      const response = await cartServices.getCartItems(
        auth?.accessToken,
        auth?.username
      );
      console.log(response.data);
      setCart(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getOrderItems = async () => {
    console.log(auth.accessToken);
    console.log(id);
    try {
      const response = await cartServices.getCartItemsByOrder(
        auth?.accessToken,
        id
      );
      console.log(response);
      setOrderItems(response.data);
      setDiscount(response.data[0].discount);
      updateSum(response.data);
    } catch (err) {
      if (err.response?.status == 404) {
        Swal.fire({
          title: "Lỗi không kết nối được dữ liệu",
          icon: "error",
          timer: 2000,
        });
      }
    }
  };

  const updateSum = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      console.log("return update");
      setSum(0);
      return;
    }
    let totalSum = 0;
    items.forEach((item) => {
      totalSum += item.deckPrice * ((100 - item.promoPercent) / 100);
    });
    setSum(totalSum);
  };

  useEffect(() => {
    getCartItems();
    getOrderItems();
  }, []);

  const handlePay = async () => {
    const payment = Math.floor(sum * ((100 - discount) / 100));
    try {
      const response = await createVNPay(auth?.accessToken, payment, id);
      console.log(response.data);
      window.location.href = response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {/* cart */}
      <div className="pt-20 pb-20 bg-gray-100">
        <div className="container px-4 mx-auto">
          <div className="pt-3 pb-2 mx-auto mt-6 mb-5 italic font-extrabold leading-relaxed text-center rounded-2xl md:w-1/2">
            <h2 className="mb-3 text-4xl font-semibold text-brandPrimary head-title">
              THÔNG TIN ĐƠN HÀNG
            </h2>
          </div>
          {orderItems == [] ? (
            <>
              <div className="flex flex-col items-center justify-center gap-5">
                <div className="text-2xl italic leading-relaxed text-brandPrimary">
                  Không có sản phẩm trong giỏ hàng
                </div>
                <Link to="/">
                  <button
                    type="button"
                    className="text-lg focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
                  >
                    Mua hàng
                  </button>
                </Link>
                <img
                  src="https://www.shutterstock.com/image-vector/supermarket-shopping-cart-delivery-store-260nw-2172709421.jpg"
                  alt="no-items"
                  className="object-fill w-1/2 opacity-50"
                  style={{ height: "400px" }}
                />
              </div>
            </>
          ) : (
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
                      {/* Cart items */}
                      {orderItems?.map((item, index) => {
                        const actualPriceFormatted = formatNumber(
                          item?.deckPrice * ((100 - item?.promoPercent) / 100)
                        );
                        const priceFormatted = formatNumber(item?.deckPrice);
                        return (
                          <tr key={index}>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  className="w-16 h-16 mr-4"
                                  src={item?.deckImg}
                                  alt="Product image"
                                />
                                <span className="font-semibold">
                                  {item?.deckName}
                                </span>
                              </div>
                            </td>
                            <td className="py-4">{priceFormatted}</td>
                            <td className="py-4">- {item?.promoPercent} %</td>
                            <td className="py-4">{actualPriceFormatted}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="relative md:w-1/4">
                <div className="sticky p-6 bg-white rounded-lg shadow-md top-20">
                  <h2 className="mb-4 text-lg font-semibold">Tổng hợp</h2>
                  <div className="flex justify-between mb-2">
                    <span>Tạm tính</span>
                    <span>{formatNumber(sum)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-yellow-400">
                    <span>Ưu đãi</span>
                    <span>-{discount} %</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Tổng cộng</span>
                    {sum && (
                      <span className="font-semibold">
                        {formatNumber(sum * ((100 - discount) / 100))}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handlePay}
                    className="flex flex-col items-center w-full px-4 py-2 mt-4 text-blue-800 bg-yellow-300 rounded-lg hover:bg-blue-300 hover:text-red-500"
                  >
                    Thanh toán
                    <img src={vnpay} alt="vnpay" style={{ width: "100px" }} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default ConfirmOrder;
