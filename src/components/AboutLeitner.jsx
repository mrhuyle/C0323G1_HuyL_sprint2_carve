import React from "react";
import img2 from "../assets/img/Leitner-Alternative-5boxes.png";

const AboutLeitner = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 px-4 mx-auto bg-gray-100 lg:grid-cols-2 lg:px-14 max-w-screen-2xl">
      <div className="col-span-2 text-2xl font-extrabold text-center capitalize text-brandPrimary">
        Về hộp Leitner - Cảm hứng cho chúng tôi tạo ra sản phẩm
      </div>
      <div className="flex items-center lg:px-14">
        <div className="max-w-screen-lg space-y-2 text-lg text-justify text-gray-900">
          <p>
            Phương pháp Leitner - Cách thức giúp bạn hấp &quot;thụ&quot; 50%
            kiến thức một cách nhanh chóng
          </p>
          <a
            href="#"
            className="inline-block px-4 py-2 space-y-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
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
  );
};

export default AboutLeitner;
