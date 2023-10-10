import React from "react";
import { Blockquote, Avatar, Rating } from "flowbite-react";
import codegym from "../assets/img/codegym_logo.png";
import { BiSolidQuoteRight } from "react-icons/bi";

const UserReviewBlockquote = () => {
  return (
    <>
      <figure className="max-w-screen-md mx-auto text-center" id="user_review">
        <div className="flex items-center mb-4">
          <Rating size="md">
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
          </Rating>
        </div>
        <Blockquote>
          <BiSolidQuoteRight size={30} className="text-gray-900" />
          <p className="text-2xl font-semibold font-bold text-blue-800">
            <span className="font-extrabold text-left">
              Nhờ Khắc Kiến Thức, chúng tôi đã cùng nhau ôn tập các kiến thức
              Java, SQL, OCA,... cũng như ngoại ngữ một cách hiệu quả hơn.
            </span>
          </p>
        </Blockquote>
        <figcaption className="flex items-center mt-1 space-x-3">
          <Avatar alt="profile picture" img={codegym} rounded size="xs" />
          <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
            <cite className="pr-3 font-extrabold text-blue-800 dark:text-white">
              C0323G1
            </cite>
            <cite className="pl-3 text-lg font-extrabold text-blue-800 dark:text-gray-400">
              Codegym Đà Nẵng
            </cite>
          </div>
        </figcaption>
      </figure>
    </>
  );
};

export default UserReviewBlockquote;
