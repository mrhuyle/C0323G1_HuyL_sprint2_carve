import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { BsCardList } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";

const DashboardAdmin = () => {
  const menus = [
    {
      name: "Báo cáo",
      link: "/admin/dashboard/report",
      icon: TbReportAnalytics,
    },
    { name: "Bộ thẻ", link: "/admin/dashboard/product", icon: BsCardList },
    { name: "Customers", link: "/dashboard/customers", icon: AiOutlineUser },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex">
      <div
        className={`bg-brandPrimary min-h-screen ${
          open ? "w-60" : "w-20"
        } duration-500 text-gray-100 px-4 relative`}
      >
        <div className="flex gap-3.5 py-3">
          <div className={`${open ? "w-7" : "w-20"}`}>
            <HiMenuAlt3
              size={`${open ? "25" : "25"}`}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <h2 className={`${!open && "hidden"} transition-transform`}>Menu</h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-500 group-hover:w-fit z-10`}
          >
            Menu
          </h2>
        </div>
        <div className="relative flex flex-col gap-4 mt-4">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-500 group-hover:w-fit z-10`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-2 flex gap-3.5 py-3 items-center">
          <div className={`${open ? "w-7" : "w-20"} h-auto`}>
            <Link to="/">
              <AiOutlineHome size={25} className="cursor-pointer" />
            </Link>
          </div>
          <h2 className={`${!open && "opacity-0"} transition-transform`}>
            Username
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-500 group-hover:w-fit z-10`}
          >
            Username
          </h2>
        </div>
      </div>
      <div className="flex justify-center w-full pt-8 text-xl font-semibold text-gray-900 bg-gray-100">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardAdmin;
