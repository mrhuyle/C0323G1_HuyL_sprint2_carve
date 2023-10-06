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
    </Card>
  );
};

export default Blog;
