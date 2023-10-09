import React from "react";
import { Carousel } from "flowbite-react";
import brain from "../assets/img/brain_background.png";
import thinking from "../assets/img/thinking_bg.png";
import cards1 from "../assets/img/paper1.png";
import cards2 from "../assets/img/paper2.png";
import c03 from "../assets/img/c0323G1.jpeg";
import UserReviewBlockQuote from "../components/UserReviewBlockquote";
import { Link } from "react-router-dom";

const WelcomeBanner = () => {
  return (
    <div className="bg-gray-100">
      <div className="h-screen min-h-screen px-4 mx-auto lg:px-14 max-w-screen-2xl">
        <Carousel
          // slideInterval={5000}
          slide={false}
          className="w-full min-h-full py-20 my-10"
        >
          {/* Slide 1 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <img src={cards1} alt="" className="object-scale-down" />
            <div className="absolute top-0 w-full text-4xl font-bold text-center text-red-900 animate-pulse">
              Ở đây chúng tôi có bán bộ thẻ ghi nhớ mọi thứ trên đời!
            </div>
            <div className="absolute top-11">
              <button
                type="button"
                className="text-lg focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
              >
                Xem ngay
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <img src={c03} alt="" className="object-scale-down" />
            <div className="absolute top-0 w-full text-2xl font-bold text-center left-10">
              <UserReviewBlockQuote />
            </div>
          </div>

          {/* Slide 3 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <div className="relative">
              <img src={brain} alt="" className="object-scale-down" />
              <div className="absolute inline-block top-1/2 right-20">
                Free Spaced Repetition Scheduling Algorithm
              </div>
            </div>
          </div>

          {/* Slide 1 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <img src={cards2} alt="" className="object-scale-down" />
            <div className="absolute top-0 w-full text-4xl font-bold text-center text-red-800 animate-pulse ">
              Bạn có tự tạo bộ thẻ và bắt đầu học ngay trên Carve?
            </div>
            <Link to="/register">
              <span className="absolute text-2xl font-bold text-center text-red-700 underline cursor-pointer animate-pulse right-1/4 top-20">
                Đăng ký liền tay bắt ngay ưu đãi!
              </span>
            </Link>
          </div>

          {/* Slide 4 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <div className="relative">
              <img src={thinking} alt="" className="object-scale-down" />
              <div className="absolute inline-block top-1/2 right-20 paragraph1">
                <span className="">Carve - Khắc Kiến Thức</span>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default WelcomeBanner;
