import React from "react";
import bulb from "../assets/img/bulb.png";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Title 1",
      description: "Description Description Description Description",
      img: { bulb },
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description Description Description Description",
      img: { bulb },
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description Description Description Description",
      img: { bulb },
    },
  ];
  return (
    <div className="px-4 py-16 mx-auto bg-gray-100 md:px-14 max-w-screen-2xl">
      <div className="py-2 mx-auto mt-10 mb-5 italic font-extrabold text-center bg-pink-100 md:w-1/2">
        <h2 className="mb-3 text-4xl font-semibold text-brandPrimary head-title">
          BỘ THẺ TRI THỨC
        </h2>
        <p>Say something?</p>
      </div>
      <div className="grid grid-cols-1 gap-0 mx-auto lg:grid-cols-3 mt-14 md:grid-cols-2 md:w-11/12 ">
        {services.map((service) => (
          <div
            key={service.id}
            className="px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4 hover:border-indigo-400 transition-all duration-300 flex items-center justify-center h-full"
          >
            <div>
              <div className="mx-auto mb-4 bg-gray-100 h-14 w-14 rounded-tl-3xl rounded-br-3xl">
                <img src={service.img} alt="" className="-ml-5" />
              </div>
              <h4 className="px-2 mb-2 text-2xl font-bold text-gray-900">
                {service.title}
              </h4>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
