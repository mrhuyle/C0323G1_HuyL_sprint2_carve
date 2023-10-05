import React from "react";
import { Card } from "flowbite-react";
import java from "../assets/img/java_cards.jpeg";

const ProductCard = () => {
  return (
    <div>
      <Card
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc={java}
      >
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            <span className="rounded bg-cyan-100 p-2 py-0.5 text-base font-semibold text-cyan-800 dark:bg-cyan-200">
              Bộ thẻ
            </span>
            <p>Ôn tập kiến thức JavaCore</p>
          </h5>
        </a>
        <div className="mb-5 mt-2.5 flex items-center"></div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $599
          </span>
          <a
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
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