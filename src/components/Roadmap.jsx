import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { GiPodiumWinner, GiAbstract066 } from "react-icons/gi";

const Roadmap = () => {
  const periods = [
    {
      id: 1,
      title: "Chọn bộ thẻ kiến thức",
      description:
        "Chọn bộ thẻ do chúng tôi chọn lọc hoặc chính bạn tạo ra. Kiến thức đa dạng từ nhiều lĩnh vực khác nhau",
      img: FaRegLightbulb,
    },
    {
      id: 2,
      title: "Học tập thông minh",
      description:
        "Học tập và ghi nhớ dựa trên phương pháp lặp lại cách quãng (Spaced System Repetition). Hiệu quả hơn, lý thú hơn.",
      img: GiAbstract066,
    },
    {
      id: 3,
      title: "Áp dụng kết quả",
      description:
        "Khi kiến thức đã vào trí nhớ dài hạn. Bạn có thể kiểm nghiệm và tận hưởng thành quả từ nỗ lực của mình",
      img: GiPodiumWinner,
    },
  ];
  return (
    <div className="px-4 py-8 mx-auto bg-gray-100 md:px-14 max-w-screen-2xl">
      <div className="py-2 mx-auto mt-10 mb-5 italic leading-relaxed text-center bg-indigo-100 rounded-2xl md:w-1/2 text-brandPrimary head-title">
        <h2 className="mb-3 text-4xl font-semibold font-extrabold text-brandPrimary head-title">
          HÀNH TRÌNH GHI NHỚ
        </h2>
        <p>...cũng là hành trình khám phá não bộ và tri thức</p>
      </div>
      <div className="grid grid-cols-1 gap-0 mx-auto lg:grid-cols-3 mt-14 md:grid-cols-2 md:w-11/12 ">
        {periods.map((period) => (
          <div
            key={period.id}
            className="px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md shadow shadow-gray-400 cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-indigo-400 transition-all duration-300 flex items-center justify-center h-full"
          >
            <div>
              <div className="w-10 h-10 mx-auto mb-4">
                <span className="w-full h-full text-4xl text-indigo-600">
                  {period.id}
                </span>
              </div>
              <div className="w-20 h-20 mx-auto mb-4">
                <period.img className="w-full h-full text-indigo-600" />
              </div>
              <h4 className="px-2 mb-2 text-2xl font-bold text-brandPrimary">
                {period.title}
              </h4>
              <p className="text-sm text-gray-500">{period.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
