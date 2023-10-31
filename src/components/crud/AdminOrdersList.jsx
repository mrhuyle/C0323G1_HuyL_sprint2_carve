import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { BsSearch } from "react-icons/bs";
import {
  AiOutlineLeftCircle,
  AiOutlineRightCircle,
  AiOutlineEye,
} from "react-icons/ai";
import * as orderServices from "../../services/orderServices";
import Swal from "sweetalert2";

const formatNumber = (number) => {
  const roundedNumber = Math.floor(number);
  const formattedNumber = roundedNumber.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return formattedNumber;
};

const formatDate = (inputDateString) => {
  const inputDate = new Date(inputDateString);
  const day = String(inputDate.getDate()).padStart(2, "0");
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const year = inputDate.getFullYear();

  return `${day}/${month}/${year}`;
};

const AdminOrdersList = () => {
  const { auth } = useAuth();
  console.log(auth?.accessToken);
  const [ordersList, setOrdersList] = useState([]);

  const getOrders = async () => {
    try {
      console.log(auth?.accessToken);
      const response = await orderServices.getOrders(auth?.accessToken);
      console.log(response.data);
      setOrdersList(response.data);
    } catch (err) {
      console.log(err);
      if (err.response?.status == 404) {
        Swal.fire("Không tìm thấy dữ liệu", "", "error");
      }
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <section className="relative w-full p-5 shadow-md sm:rounded-lg">
        <h1 className="text-center capitalize">ĐƠN HÀNG</h1>
        <hr className="my-4 h-0.5 border-t-0 bg-neutral-200 opacity-100" />
        <div className="flex items-center justify-between pb-2 mx-4">
          <div className="relative flex items-center justify-start w-1/6 text-gray-600">
            <form className="flex items-center">
              <input
                className="h-10 pr-6 text-sm bg-white border-2 border-gray-400 rounded-lg px-9 w-26 focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />
              <div className="absolute opacity-70 left-3">
                <BsSearch className="cursor-pointer" size={15} />
              </div>
            </form>
          </div>
        </div>

        <table className="min-w-full text-sm text-left text-gray-800 divide-y divide-gray-200 rounded">
          <thead className="text-sm text-center text-gray-900 uppercase bg-gray-50 dark:bg-green-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Mã HĐ
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày HĐ
              </th>
              <th scope="col" className="px-6 py-3">
                Người mua
              </th>
              <th scope="col" className="px-6 py-3">
                Tổng
              </th>
              <th scope="col" className="px-6 py-3">
                Tình trạng
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Xem HĐ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordersList?.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50 dark:hover:bg-green-100"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-{{ .id }}"
                      aria-describedby="checkbox-1"
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-3 font-semibold text-center text-gray-800 whitespace-nowrap dark:text-gray-400"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-3 font-semibold text-center text-gray-800 whitespace-nowrap dark:text-gray-400"
                >
                  {item.code}
                </th>
                <td className="px-6 py-3 text-center">
                  {formatDate(item.createdTime)}
                </td>
                <td className="px-6 py-3 text-center">{item.username}</td>
                <td className="px-6 py-3 text-right">
                  {formatNumber(item.total)}
                </td>
                <td className="px-6 py-3 ">
                  <div className="flex justify-center">
                    {item.paid ? (
                      <div className="inline px-5 py-1 text-sm font-medium text-white bg-blue-500 border border-white rounded-lg w-fit">
                        Đã thanh toán
                      </div>
                    ) : (
                      <div className="px-5 py-1 text-sm font-medium text-white bg-red-500 border border-white rounded-lg w-fit">
                        Chưa thanh toán
                      </div>
                    )}
                  </div>
                </td>
                <td className="flex items-center justify-around gap-4 px-6 py-3">
                  <button
                    type="button"
                    className="flex items-center justify-between gap-1 px-5 py-1 text-sm font-medium text-center text-green-800 border border-green-800 rounded-lg hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    <AiOutlineEye />
                    Xem HĐ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="absolute flex items-center justify-between w-full px-10 pb-2 bottom-1"
          aria-label="Table navigation"
        >
          <span className="flex gap-2 ml-6 text-sm font-normal text-gray-900 dark:text-gray-900">
            <span className="font-semibold text-gray-900 dark:text-gray-900">
              1
            </span>
            /
            <span className="font-semibold text-gray-900 dark:text-gray-900">
              10
            </span>
          </span>
          <ul className="inline-flex h-8 mr-6 -space-x-px text-sm">
            <li className={`w-20`}>
              <div className="flex items-center justify-center h-8 px-3 ml-0 leading-tight text-gray-600 bg-white border border-gray-900 rounded-l-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white">
                <AiOutlineLeftCircle size={23} />
              </div>
            </li>
            <li className={`w-20 `}>
              <div className="flex items-center justify-center h-8 px-3 leading-tight text-gray-600 bg-white border border-gray-900 rounded-r-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-white">
                <AiOutlineRightCircle size={23} />
              </div>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default AdminOrdersList;
