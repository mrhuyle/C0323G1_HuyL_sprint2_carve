import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import MyFooter from "./MyFooter";
import logo from "../assets/img/carve_logo_indigo.png";
import signature from "../assets/img/signature.png";
import useAuth from "../hooks/useAuth";
import * as cartServices from "../services/cartServices";
import useCartContext from "../hooks/useCartContext";
import Swal from "sweetalert2";
import { useParams, useLocation } from "react-router-dom";

const formatNumber = (number) => {
  const roundedNumber = Math.floor(number);
  const formattedNumber = roundedNumber.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return formattedNumber;
};

const result = formatNumber(48212.5);
console.log(result);

const Invoice = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { cart, setCart } = useCartContext([]);
  const [orderItems, setOrderItems] = useState([]);
  const [username, setUsername] = useState("");
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

  const getOrderItems = async (orderId) => {
    console.log(auth.accessToken);
    console.log(orderId);
    try {
      const response = await cartServices.getCartItemsByOrder(
        auth?.accessToken,
        orderId
      );
      console.log(response);
      setOrderItems(response.data);
      setDiscount(response.data[0].discount);
      updateSum(response.data);
      setUsername(response.data[0].username);
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
    const orderId = queryParams.get("orderId");
    console.log(orderId);
    getOrderItems(orderId);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-20 bg-gray-100">
        <div className="container px-4 mx-auto">
          <div className="pt-3 pb-2 mx-auto mt-6 mb-5 italic font-extrabold leading-relaxed text-center rounded-2xl md:w-1/2">
            <h2 className="mb-3 text-4xl font-semibold text-brandPrimary head-title">
              THÔNG TIN HOÁ ĐƠN
            </h2>
          </div>
          <div className="h-[297mm] w-[210mm] p-12 pl-32 border border-gray-900 mx-auto">
            <div className="flex justify-between">
              <div>
                <p className="pb-2 text-4xl">Carve - Khắc Kiến Thức</p>
                <p className="text-sm text-gray-400">
                  209 Văn Tiến Dũng - Đà Nẵng - Việt Nam
                </p>
                <p className="text-sm text-gray-400">mrhuyleCarve@gmail.com</p>
              </div>
              <div>
                <img className="w-20 h-20" src={logo} />
              </div>
            </div>
            <div className="flex justify-between pt-16">
              <div>
                <p className="pb-3 text-4xl font-bold">HÓA ĐƠN</p>
                <p className="text-sm font-bold">
                  SỐ HĐ: <span className="pl-1 font-normal">0001</span>
                </p>
                <p className="text-sm font-bold">
                  NGÀY HĐ: <span className="pl-1 font-normal">02/15/2002</span>
                </p>
              </div>
              <div className="pl-2 text-right">
                <p className="text-gray-400">KHÁCH HÀNG</p>
                <p className="font-bold">{username}</p>
              </div>
            </div>
            <div className="pt-16">
              <table className="w-full text-sm table-auto">
                <thead className="border-b-2">
                  <tr className="h-10 text-left">
                    <th>BỘ THẺ</th>
                    <th>GIÁ</th>
                    <th>KHUYẾN MÃI</th>
                    <th className="text-right">TỔNG CỘNG</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => {
                    const actualPriceFormatted = formatNumber(
                      item?.deckPrice * ((100 - item?.promoPercent) / 100)
                    );
                    const priceFormatted = formatNumber(item?.deckPrice);
                    return (
                      <tr key={index} className="h-10">
                        <td>{item.deckName}</td>
                        <td>{priceFormatted}</td>
                        <td className="text-center">{item.promoPercent} %</td>
                        <td className="text-right">{actualPriceFormatted}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="relative flex flex-col items-end w-1/3 mt-10 space-y-2 left-2/3">
              <div className="flex items-center justify-between w-full gap-5 text-xl font-bold text-gray-500">
                <span>Tạm tính</span>
                <span>{formatNumber(sum)}</span>
              </div>
              <div className="flex items-center justify-between w-full gap-5 text-xl font-bold text-red-500">
                <span>Ưu đãi</span>
                <span>- {discount} %</span>
              </div>
              <div className="flex items-center justify-between w-full gap-5 text-xl font-bold text-black">
                <span>TỔNG</span>
                <span>{formatNumber(sum * ((100 - discount) / 100))}</span>
              </div>
            </div>
            <div className="text-sm italic text-left text-red-500">
              * Hóa đơn điện tử đã được gửi về email của quý khách
            </div>
            <div className="flex flex-col items-center justify-center pt-16 text-base">
              <p className="font-bold">Chân thành cảm ơn!</p>
              <p>Chúc quý khách gặt hái được những thành quả học tập tốt.</p>
              <p>Chúng tôi hân hạnh được đồng hành</p>
              <img className="h-30 w-50" src={signature} alt="signature" />
              <p>Mr Louis from Carve</p>
            </div>
          </div>
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default Invoice;
