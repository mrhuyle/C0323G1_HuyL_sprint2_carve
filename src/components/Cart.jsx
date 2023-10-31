import React, { useEffect, useState } from "react";
import MyFooter from "./MyFooter";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import * as cartServices from "../services/cartServices";
import * as orderServices from "../services/orderServices";
import { Link, useNavigate } from "react-router-dom";
import { BiCheckboxChecked, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import useCartContext from "../hooks/useCartContext";

const formatNumber = (number) => {
  const roundedNumber = Math.floor(number);
  const formattedNumber = roundedNumber.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return formattedNumber;
};

const Cart = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { cart, setCart } = useCartContext();
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
      setCart(response.data);
      setDiscount(response.data[0].discount);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialList = await getCartItems();
        console.log(initialList);
        setCheckItems(initialList);
        updateSum(initialList);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateSum(checkItems);
  }, [checkItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;

    setCheckItems((prevCheckItems) => {
      if (isChecked) {
        return [...prevCheckItems, item];
      } else {
        if (!Array.isArray(prevCheckItems) || prevCheckItems.length === 0) {
          return [item];
        }
        return prevCheckItems.filter(
          (checkItem) => checkItem.cartItemId !== item.cartItemId
        );
      }
    });
  };

  const getCartItemIds = () => {
    const listCartItemIds = checkItems.map((item) => item.cartItemId);
    return listCartItemIds;
  };

  const handleConfirmOrder = () => {
    const listCartItemIds = getCartItemIds();
    if (listCartItemIds.length == 0) {
      Swal.fire({
        title: "Bạn chưa chọn sản phẩm nào",
        icon: "warning",
        showCloseButton: true,
      });
      return;
    } else {
      Swal.fire({
        title: "Bạn có muốn tạo đơn hàng với các sản phẩm đã chọn?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Tạo đơn hàng",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = {
            discount: discount,
            total: Math.floor(sum * ((100 - discount) / 100)),
            cartId: cartItems[0].cartId,
            listCartItemIds: listCartItemIds,
          };
          console.log(data);
          try {
            const response = await orderServices.createOrder(
              auth?.accessToken,
              data
            );
            const orderId = response.data;
            console.log(orderId);
            if (response.status == 201) {
              Swal.fire({
                title: "Đã tạo đơn hàng thành công",
                icon: "success",
                showCloseButton: true,
              });
              getCartItems();
              navigate(`/confirm-order/${orderId}`);
            }
          } catch (err) {
            console.log(err);
            if (err.response?.status == 409) {
              Swal.fire({
                title: "Lỗi tạo đơn hàng",
                icon: "error",
                showCloseButton: true,
              });
            }
          }
        }
      });
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

  const handleDeleteCartItem = async (cartItem) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Bạn có muốn xoá sản phẩm?",
        text: cartItem.deckName,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Xoá",
      });

      if (confirmResult.isConfirmed) {
        console.log(auth?.accessToken);
        const response = await cartServices.deleteCartItemById(
          auth?.accessToken,
          cartItem.cartItemId
        );

        if (response?.status === 200) {
          Swal.fire({
            title: "Đã xoá sản phẩm khỏi giỏ hàng",
            icon: "success",
            timer: 1500,
          });

          // Update the checked items and recalculate the sum
          const updatedCheckItems = checkItems.filter(
            (checkItem) => checkItem.cartItemId !== cartItem.cartItemId
          );

          // Update the state
          setCheckItems(updatedCheckItems);

          // Recalculate the sum
          updateSum(updatedCheckItems);
          getCartItems();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

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

      {/* cart */}
      <div className="pt-20 pb-20 bg-gray-100">
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
                                onClick={() => {
                                  handleDeleteCartItem(item);
                                }}
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
                    onClick={handleConfirmOrder}
                    className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
                  >
                    Đặt hàng
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
