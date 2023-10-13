import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiMessageAltAdd, BiEdit, BiTrash } from "react-icons/bi";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

const ProductsList = () => {
  return (
    <div className="relative w-full mr-8 -translate-x-1/2 shadow-md sm:rounded-lg left-1/2">
      <h1 className="text-center capitalize">BỘ THẺ</h1>
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
        <Link to="/dashboard/add_contract">
          <button className="flex items-center justify-between gap-1 px-5 py-1 text-sm font-medium text-blue-700 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white hover:border-transparent">
            <BiMessageAltAdd />
            Thêm
          </button>
        </Link>
      </div>

      <table className="min-w-full text-sm text-left text-gray-800 divide-y divide-gray-200 rounded">
        <thead className="text-sm text-gray-900 uppercase bg-gray-50 dark:bg-green-800 dark:text-gray-400">
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
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Deposit
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-green-100">
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
              className="px-6 py-3 font-semibold text-gray-800 whitespace-nowrap dark:text-gray-400"
            >
              1
            </th>
            <th
              scope="row"
              className="px-6 py-3 font-semibold text-gray-800 whitespace-nowrap dark:text-gray-400"
            >
              Code
            </th>
            <td className="px-6 py-3">StartDate</td>
            <td className="px-6 py-3">EndDate</td>
            <td className="px-6 py-3">Deposit</td>
            <td className="px-6 py-3">Total</td>
            <td className="flex items-center justify-around gap-4 px-6 py-3">
              <button
                type="button"
                className="flex items-center justify-between gap-1 px-5 py-1 text-sm font-medium text-center text-green-800 border border-green-800 rounded-lg hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              >
                <BiEdit />
                Sửa
              </button>
              <button
                type="button"
                className="flex items-center justify-between gap-1 px-5 py-1 text-sm font-medium text-center text-red-700 border border-red-700 rounded-lg hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <BiTrash />
                Xoá
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        className="absolute flex items-center justify-between w-full pb-2 bottom-1"
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
    </div>
  );
};

export default ProductsList;
