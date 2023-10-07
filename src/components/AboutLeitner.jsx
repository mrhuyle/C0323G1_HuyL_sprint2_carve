import React from "react";
import img2 from "../assets/img/Leitner-Alternative-5boxes.png";

const AboutLeitner = () => {
  return (
    <div className="px-4 py-16 mx-auto bg-gray-100 md:px-14 max-w-screen-2xl">
      <div className="pt-3 pb-2 mx-auto mt-10 mb-5 italic font-extrabold leading-relaxed text-center bg-indigo-100 rounded-2xl md:w-1/2">
        <h2 className="px-1 mb-3 text-4xl font-semibold text-brandPrimary head-title">
          VỀ HỘP LEITNER - LEITNER&apos;S BOXS
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-0 mx-auto lg:grid-cols-2 mt-14 md:grid-cols-2 md:w-11/12">
        <div className="flex items-center lg:px-14">
          <div className="max-w-screen-lg space-y-2 text-lg text-justify text-gray-900">
            <p>
              Những chiếc hộp Leitner - Cách thức giúp bạn hấp &quot;thụ&quot;
              50% kiến thức một cách nhanh chóng
            </p>
            <a
              href="#"
              className="inline-block px-4 py-2 space-y-2 font-bold text-blue-800 bg-indigo-300 rounded hover:text-white hover:bg-blue-700"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center h-full px-4 mx-auto w-fit lg:block">
          <img
            src={img2}
            alt=""
            className="object-contain w-5/6 h-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutLeitner;
