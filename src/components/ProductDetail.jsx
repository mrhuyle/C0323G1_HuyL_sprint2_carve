import React, { useEffect, useState } from "react";
import MyFooter from "./MyFooter";
import Navbar from "./Navbar";
import Tag from "../components/crud/Tag";
import { BsCardList } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import useCartContext from "../hooks/useCartContext";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as deckServices from "../services/deckServices";
import * as cartServices from "../services/cartServices";

const formatNumber = (number) => {
  const formattedNumber = number || 0;
  return formattedNumber.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};

const ProductDetail = () => {
  const { cart, setCart } = useCartContext();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [deck, setDeck] = useState({});
  const [cartId, setCartId] = useState("");
  const [tags, setTags] = useState([]);

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

  const getDeckDetail = async () => {
    try {
      const response = await deckServices.getDeckDetail(params.id);
      console.log(response);
      setDeck(response.data);
      setTags(JSON.parse(response.data.tagName));
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuyProduct = async () => {
    if (!auth?.accessToken) {
      Swal.fire({
        title: "Vui lòng đăng nhập",
        text: "Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng",
        icon: "question",
        showCloseButton: true,
        confirmButtonText: "Đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    } else {
      try {
        const data = {
          cartId: cartId,
          deckId: deck.id,
        };
        const response = await cartServices.addCartItem(
          auth?.accessToken,
          data
        );
        console.log(response);
        if (response.status == 200) {
          Swal.fire({
            title: "Đã thêm vào giỏ hàng",
            text: deck.name,
            icon: "success",
            timer: 1500,
          });
          setCart([...cart, deck]);
        }
      } catch (err) {
        console.log(err);
        if (err?.response.status == 409) {
          Swal.fire({
            title: "Sản phẩm đã có trong giỏ hàng",
            text: deck.name,
            showCloseButton: "true",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Lỗi kết nối trong lúc mua hàng",
            text: deck.name,
            icon: "warning",
            timer: 1500,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCartIdByUsername();
    getDeckDetail();
  }, []);

  const actualPriceFormatted = formatNumber(
    deck.price * ((100 - deck.promoPercent) / 100)
  );
  const priceFormatted = formatNumber(deck.price);

  return (
    <>
      <Navbar />
      <section className="mt-5 text-gray-700 bg-gray-100 overflow-hidivide-none body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            {/* img */}
            <div className="w-full border border-gray-200 rounded lg:w-1/2">
              <img
                alt="ecommerce"
                className="object-cover object-center w-11/12 mx-auto"
                src={deck.img}
              />
            </div>

            {/* content */}
            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <span className="p-2 py-1 text-base font-semibold bg-indigo-300 rounded text-cyan-800 dark:bg-cyan-200">
                Bộ thẻ
              </span>
              <h1 className="mt-5 mb-1 text-3xl font-extrabold text-brandPrimary">
                {deck.name}
              </h1>
              <div className="flex items-center justify-start gap-2 text-lg font-bold text-red-500">
                <span>500 thẻ</span>
                <BsCardList size={28} />
              </div>
              <div className="my-2">
                <p className="leading-relaxed">{deck.description}</p>
              </div>
              <div className="flex gap-1">
                {tags?.map((tag, index) => (
                  <Tag key={index} name={tag} showX={false} />
                ))}
              </div>

              <div className="flex items-center pb-5 my-3 border-b-2 border-gray-200"></div>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <span className="text-2xl font-medium text-gray-900 title-font">
                    {actualPriceFormatted}
                  </span>
                  <span className="text-2xl font-medium text-gray-400 line-through title-font">
                    {priceFormatted}
                  </span>
                </div>
                <button
                  onClick={handleBuyProduct}
                  className="flex px-6 py-2 ml-auto text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600"
                >
                  Mua
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MyFooter />
    </>
  );
};

export default ProductDetail;
