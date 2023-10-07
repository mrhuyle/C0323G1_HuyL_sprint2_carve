import React from "react";
import { Card } from "flowbite-react";
import java from "../assets/img/java_cards.jpeg";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <div>
      <Card
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc={java}
      >
        <Link to="/product_detail">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            <span className="rounded bg-indigo-300 p-2 py-0.5 text-base font-semibold text-cyan-800 dark:bg-cyan-200">
              Bộ thẻ
            </span>
            <p>Ôn tập kiến thức JavaCore</p>
          </h5>
        </Link>
        <div className="mb-5 mt-2.5 flex items-center"></div>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            20.000 đ
          </span>
          <a
            className="rounded-lg bg-buttonColor px-5 py-2.5 text-center text-sm font-medium text-blue-800 hover:bg-brandPrimary hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            href="#"
          >
            <p>Mua</p>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
