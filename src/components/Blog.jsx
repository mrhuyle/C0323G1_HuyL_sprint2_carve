import React from "react";

const Blog = () => {
  return (
    <div className="max-w-lg mx-auto">
      <div className="max-w-sm mb-5 bg-white border border-gray-200 rounded-lg shadow-md">
        <a href="#">
          <img
            className="rounded-t-lg"
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            alt
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            href="#"
          >
            Read more
          </a>
        </div>
      </div>
      <p>
        This card component is part of a larger, open-source library of Tailwind
        CSS components. Learn more by going to the official{" "}
        <a className="text-blue-600 hover:underline" href="#" target="_blank">
          Flowbite Documentation
        </a>
        .
      </p>
    </div>
  );
};

export default Blog;
