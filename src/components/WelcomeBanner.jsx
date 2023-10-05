import React from "react";
import { Carousel } from "flowbite-react";
import brain from "../assets/brain_background.png";
import thinking from "../assets/thinking_bg.png";
import cards1 from "../assets/paper1.png";
import cards2 from "../assets/paper2.png";

const WelcomeBanner = () => {
  return (
    <div className="bg-gray-100">
      <div className="h-screen min-h-screen px-4 mx-auto lg:px-14 max-w-screen-2xl">
        <Carousel
          slideInterval={5000}
          className="w-full min-h-full py-20 my-10"
        >
          {/* Slide 1 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <div className="relative">
              <img src={cards1} alt="" className="object-scale-down" />
              <div className="absolute inline-block top-1/2 right-20">
                Read something
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <div className="relative">
              <img src={cards2} alt="" className="object-scale-down" />
              <div className="absolute inline-block top-1/2 right-20">
                Read something
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <div className="relative">
              <img src={brain} alt="" className="object-scale-down" />
              <div className="absolute inline-block top-1/2 right-20">
                Read something
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="flex items-center justify-center h-full py-12 my-28 md:my-8">
            <div className="relative">
              <img src={thinking} alt="" className="object-scale-down" />
              <div className="absolute inline-block top-1/2 right-20">
                Read something
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default WelcomeBanner;
