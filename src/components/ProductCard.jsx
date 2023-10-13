import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const formatNumber = (number) => {
  return number.toLocaleString("vi", { style: "currency", currency: "VND" });
};
const cardStyle = {
  objectFit: "cover", // This will make the image fit within the Card
  width: "100%", // Ensure the image takes the full width of the Card
  height: "140px", // Ensure the image takes the full height of the Card
};

const ProductCard = ({ product }) => {
  const actualPriceFormatted = formatNumber(
    product.price * ((100 - product.promoPercent) / 100)
  );
  const priceFormatted = formatNumber(product.price);
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
          <a
            className="rounded-lg bg-buttonColor px-3 py-2.5 text-center text-base font-medium text-blue-800 hover:bg-brandPrimary hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
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
