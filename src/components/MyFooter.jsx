import React from "react";
import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../assets/img/carve_logo_svg.svg";
import { AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

const MyFooter = () => {
  return (
    <Footer container>
      <div className="w-full h-30">
        <div className="relative grid justify-between w-full sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="relative flex items-center justify-start w-1/2 overflow-hidden rounded">
            <div className="absolute flex items-center justify-start top-5 left-5">
              <Footer.Brand alt="Carve Logo" href="#" src={logo} />
              <span id="brand" className="text-[#330099] text-3xl">
                Carve - Khắc Kiến Thức
              </span>
            </div>
            <div className="absolute flex flex-col items-start ps-5 bottom-2">
              <div className="flex items-center justify-end gap-2 text-xl font-medium text-brandPrimary">
                <AiOutlineHome />
                <span>209 Văn Tiến Dũng - Đà Nẵng - Việt Nam</span>
              </div>
              <div className="flex items-center justify-end gap-2 text-xl font-medium text-brandPrimary">
                <AiOutlineMail />
                <span>mrhuyle@gmail.com</span>
              </div>
              <div className="flex items-center justify-end gap-2 text-xl font-medium text-brandPrimary">
                <AiOutlinePhone />
                <span>(084) 905 169 777</span>
              </div>
            </div>
          </div>
          <div className="grid w-1/2 grid-cols-2 gap-8 mb-2 sm:mt-4 sm:grid-cols-3 sm:gap-6 ms-5">
            <div>
              <Footer.Title title="Về chúng tôi" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Carve - Khắc Kiến Thức</Footer.Link>
                <Footer.Link href="#">Hệ thống SRS</Footer.Link>
                <Footer.Link href="#">Câu chuyện</Footer.Link>
                <Footer.Link href="#">Đồng hành cùng bạn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Chính sách" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Chính sách sản phẩm</Footer.Link>
                <Footer.Link href="#">Quyền lợi khách hàng</Footer.Link>
                <Footer.Link href="#">Liên hệ với chúng tôi</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Tìm hiểu thêm" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Thuật toán nền tảng</Footer.Link>
                <Footer.Link href="#">Vì cộng đồng</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="Carve by MrLouis" href="#" year={2023} />
          <div className="flex mt-4 space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
export default MyFooter;
