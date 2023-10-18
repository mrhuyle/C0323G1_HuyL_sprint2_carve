import React, { useContext, useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import * as cartServices from "../services/cartServices";
import Swal from "sweetalert2";
import useCartContext from "../hooks/useCartContext";

const formatNumber = (number) => {
  const formattedNumber = number || 0;
  return formattedNumber.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};

const cardStyle = {
  objectFit: "cover",
  width: "100%",
  height: "140px",
};

const ProductCard = ({ product }) => {
  const { cart, setCart } = useCartContext();

  const { auth } = useAuth();
  const [cartId, setCartId] = useState("");

  const getCartIdByUsername = async () => {
    try {
      const response = await cartServices.getCartIdByUsername(
        auth?.accessToken,
        auth?.username
      );
      console.log(response.data);
      setCartId(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartIdByUsername();
  }, []);

  const actualPriceFormatted = formatNumber(
    product.price * ((100 - product.promoPercent) / 100)
  );
  const priceFormatted = formatNumber(product.price);

  const handleBuyProduct = async () => {
    try {
      const data = {
        cartId: cartId,
        deckId: product.id,
      };
      const response = await cartServices.addCartItem(auth?.accessToken, data);
      console.log(response);
      if (response.status == 200) {
        Swal.fire({
          title: "Đã thêm vào giỏ hàng",
          text: product.name,
          icon: "success",
          timer: 1500,
        });
        setCart([...cart, product]);
      }
    } catch (err) {
      console.log(err);
      if (err?.response.status == 409) {
        Swal.fire({
          title: "Sản phẩm đã có trong giỏ hàng",
          text: product.name,
          showCloseButton: "true",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "Lỗi kết nối trong lúc mua hàng",
          text: product.name,
          icon: "warning",
          timer: 1500,
        });
      }
    }
  };
  return (
    <div className="hover:scale-95 hover:transition-transform">
      <Card imgAlt="product">
        <img src={product.img} alt="product" style={cardStyle} />
        <Link to="/product_detail">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            <div className="flex items-center justify-between mb-2">
              <span className="rounded bg-indigo-300 p-2 py-0.5 text-base font-semibold text-cyan-800 dark:bg-cyan-200">
                Bộ thẻ
              </span>
              <span className="bg-red-100 text-red-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded border border-red-400">
                - {product.promoPercent} %
              </span>{" "}
            </div>
            <p className="h-20 text-justify">{product.name}</p>
          </h5>
        </Link>
        <div className="mb-5 mt-2.5 flex items-center"></div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="text-base font-bold text-gray-900 dark:text-white">
              {actualPriceFormatted}
            </span>
            <span className="text-base font-bold text-gray-400 line-through dark:text-white">
              {priceFormatted}
            </span>
          </div>
          <button
            onClick={() => handleBuyProduct()}
            className="rounded-lg bg-buttonColor px-3 py-2.5 text-center text-base font-medium text-blue-800 hover:bg-brandPrimary hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Mua
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
