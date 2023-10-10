/* eslint-disable react/prop-types */
import React from "react";

import { Card } from "flowbite-react";

const Blog = ({ imgSrc, imgAlt, title, description }) => {
  return (
    <Card imgAlt={imgAlt} imgSrc={imgSrc}>
      <h5 className="text-2xl font-bold tracking-tight text-blue-800">
        <span>{title}</span>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <span>{description}</span>
      </p>
      <a
        href="#"
        className="inline-block px-4 py-2 space-y-2 font-bold text-center text-blue-800 bg-indigo-300 rounded hover:text-white hover:bg-blue-700"
      >
        Xem thêm
      </a>
    </Card>
  );
};

export default Blog;
