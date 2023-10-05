import React, { useEffect, useState } from "react";
import logo from "../assets/carve_logo_indigo.png";
import * as Scroll from "react-scroll";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  const LinkScroll = Scroll.Link;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // set toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const navItems = [
    { link: "Trang chủ", path: "home" },
    { link: "Về chúng tôi", path: "about" },
    { link: "Câu chuyện", path: "story" },
    { link: "Đồng hành", path: "product" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-gray-100 w-100">
        <nav
          className={`py-4 lg:px-14 px-4 ${
            isSticky
              ? "sticky top-0 left-0 right-0 border-b bg-white duration-300"
              : ""
          }`}
        >
          <div className="flex items-center justify-between gap-8 text-base">
            <a
              href=""
              className="flex items-center space-x-3 text-2xl font-semibold"
            >
              <img
                src={logo}
                alt=""
                className="items-center inline-block w-10"
              />
              <span id="brand" className="text-[#330099] text-3xl">
                Carve
              </span>
            </a>

            {/* nav-items for large devices*/}
            <ul className="hidden space-x-12 md:flex">
              {navItems.map((item, index) => (
                <LinkScroll
                  key={index}
                  to={item.path}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  className="block px-4 py-2 text-base rounded text-brandPrimary hover:bg-brandPrimary hover:text-gray-100 first:font-medium hover:cursor-pointer"
                >
                  {item.link}
                </LinkScroll>
              ))}
            </ul>

            {/* btn for large devices */}
            <div className="items-center hidden space-x-8 lg:flex">
              <a
                href=""
                className="items-center hidden px-4 py-2 rounded lg:flex text-brandPrimary hover:bg-brandPrimary hover:text-gray-100 hover:cursor-pointer"
              >
                Đăng nhập
              </a>
              <Link to="/login">
                <button className="px-4 py-2 text-white transition-all duration-100 duration-300 rounded bg-brandPrimary hover:bg-purpleTone">
                  Đăng ký
                </button>
              </Link>
            </div>

            {/* menu items for mobiles */}
            <div className="md:hidden">
              <button
                className="text-gray-900 focus:outline-none focus:text-gray-500"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <FaXmark className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6 " />
                )}
              </button>
            </div>
          </div>

          {/* nav-items for mobiles */}
          <div
            className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${
              isMenuOpen ? "block fixed top-0 right-0 left-0 " : "hidden"
            }`}
          >
            {navItems.map((item, index) => (
              <LinkScroll
                key={index}
                to={item.path}
                spy={true}
                smooth={true}
                offset={-100}
                className="block text-base text-gray-100 hover:text-brandPrimary first:font-medium hover:cursor-pointer"
              >
                {item.link}
              </LinkScroll>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
