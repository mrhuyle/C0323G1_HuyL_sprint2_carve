import React from "react";
import MyFooter from "./MyFooter";
import Navbar from "./Navbar";
import java from "../assets/img/java_cards.jpeg";

const ProductDetail = () => {
  return (
    <>
      <Navbar />

      <section className="mt-5 text-gray-700 bg-gray-100 overflow-hidivide-none body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <img
              alt="ecommerce"
              className="object-cover object-center w-full border border-gray-200 rounded lg:w-1/2"
              src={java}
            />
            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="text-sm tracking-widest text-gray-500 title-font">
                Bộ thẻ
              </h2>
              <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
                Ôn tập Java Core
              </h1>
              <div>
                <p className="leading-relaxed">
                  Bộ thẻ Flashcards học Java Core 500 thẻ là một tài liệu học
                  tập chất lượng, được thiết kế đặc biệt để giúp bạn nâng cao kỹ
                  năng lập trình Java cơ bản.
                </p>
                <p className="leading-relaxed">
                  Với 500 thẻ Flashcards, bạn sẽ tiếp cận một cách chi tiết và
                  toàn diện vào các khái niệm quan trọng, cú pháp, và lời giải
                  trong Java Core.
                </p>
              </div>

              <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-200"></div>
              <div className="flex">
                <span className="text-2xl font-medium text-gray-900 title-font">
                  20.000 đ
                </span>
                <button className="flex px-6 py-2 ml-auto text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600">
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
