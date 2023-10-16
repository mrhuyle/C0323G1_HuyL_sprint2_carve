import React, { useEffect, useState } from "react";
import MyFooter from "./MyFooter";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import * as cartServices from "../services/cartServices";
import { Link } from "react-router-dom";
import { BiCheckboxChecked, BiTrash } from "react-icons/bi";

const formatNumber = (number) => {
  const formattedNumber = number || 0; // Use 0 if number is undefined or null
  return formattedNumber.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};

const Cart = () => {
  const { auth } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [discount, setDiscount] = useState("");
  const [sum, setSum] = useState(0);

  const getCartItems = async () => {
    try {
      const response = await cartServices.getCartItems(
        auth?.accessToken,
        auth?.username
      );
      console.log(response.data);
      setCartItems(response.data);
      setCheckItems(response.data);
      updateSum(response.data);
      setDiscount(response.data[0].discount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    updateSum(checkItems);
  }, [checkItems]);

  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckItems((prevCheckItems) => [...prevCheckItems, item]);
    } else {
      setCheckItems((prevCheckItems) =>
        prevCheckItems.filter(
          (checkItem) => checkItem.cartItemId !== item.cartItemId
        )
      );
    }
  };

  const updateSum = (items) => {
    if (items == []) {
      return;
    }
    let totalSum = 0;
    items.forEach((item) => {
      totalSum += item.deckPrice * ((100 - item.promoPercent) / 100);
    });
    setSum(totalSum);
  };

  return (
    <>
      <Navbar />

      {/* cart */}
      <div className="h-screen pt-20 pb-20 bg-gray-100">
        <div className="container px-4 mx-auto">
          <div className="pt-3 pb-2 mx-auto mt-6 mb-5 italic font-extrabold leading-relaxed text-center rounded-2xl md:w-1/2">
            <h2 className="mb-3 text-4xl font-semibold text-brandPrimary head-title">
              GIỎ HÀNG
            </h2>
          </div>
          {cartItems == [] ? (
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
                        <th className="flex items-center justify-center mr-2 font-semibold">
                          <BiCheckboxChecked size={25} />
                        </th>
                        <th className="font-semibold text-left">Sản phẩm</th>
                        <th className="font-semibold text-left">Giá</th>
                        <th className="font-semibold text-left">Khuyến mãi</th>
                        <th className="font-semibold text-left">Tổng cộng</th>
                        <th className="font-semibold text-left"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Cart items */}
                      {cartItems?.map((item, index) => {
                        const actualPriceFormatted = formatNumber(
                          item?.deckPrice * ((100 - item?.promoPercent) / 100)
                        );
                        const priceFormatted = formatNumber(item?.deckPrice);
                        return (
                          <tr key={index}>
                            <td>
                              <div className="flex items-center justify-center mr-2">
                                <input
                                  defaultChecked
                                  id="yellow-checkbox"
                                  type="checkbox"
                                  onChange={(e) =>
                                    handleCheckboxChange(e, item)
                                  }
                                  value={item}
                                  className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                            </td>
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
                            <td>
                              <button
                                type="button"
                                className="text-red-500 border border-red-500 hover:bg-red-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                              >
                                <BiTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Link to="/">
                  <div className="text-right text-blue-500 underline">
                    Chọn thêm sản phẩm?
                  </div>
                </Link>
              </div>
              <div className="md:w-1/4">
                <div className="p-6 bg-white rounded-lg shadow-md">
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
                  <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">
                    Thanh toán
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

export default Cart;
