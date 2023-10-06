import React from "react";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "../assets/css/Slide.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductCard from "./ProductCard";

const ProductsSlider = () => {
  return (
    <div className="relative px-4 py-8 mx-auto bg-gray-100 md:px-14 max-w-screen-2xl">
      <div className="py-2 mx-auto mt-10 mb-5 italic font-extrabold text-center bg-pink-100 md:w-1/2">
        <h2 className="mb-3 text-4xl font-semibold text-brandPrimary head-title">
          BỘ THẺ TRI THỨC
        </h2>
      </div>
      <div>
        <div>
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer btn-prev-1 group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-indigo-300 group-focus:ring-4 group-focus:ring-white ">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer btn-nxt-1 group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-indigo-300 group-focus:ring-4 group-focus:ring-white ">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>

      <div>
        <Swiper
          modules={[Navigation]}
          // navigation={true}
          navigation={{
            nextEl: ".btn-nxt-1",
            prevEl: ".btn-prev-1",
          }}
          slidesPerView={5}
          spaceBetween={10}
          loop={true}
          speed={500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="mySwiper"
        >
          <SwiperSlide>
            <ProductCard></ProductCard>
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard></ProductCard>
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard></ProductCard>
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard></ProductCard>
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard></ProductCard>
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard></ProductCard>
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard></ProductCard>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsSlider;
