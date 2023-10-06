/* eslint-disable react/prop-types */
import React from "react";

import { Card } from "flowbite-react";

const Blog = ({ imgSrc, imgAlt, title, description }) => {
  return (
    <Card imgAlt={imgAlt} imgSrc={imgSrc}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{title}</p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <p>{description}</p>
      </p>
      <a
        href="#"
        className="inline-block px-4 py-2 space-y-2 font-bold text-center text-gray-900 bg-indigo-300 rounded hover:text-white hover:bg-blue-700"
      >
        Xem thêm
      </a>
    </Card>
  );
};

export default Blog;
