import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import * as userServices from "../../services/userServices";
import { BiBadgeCheck, BiSolidLike, BiUserCircle } from "react-icons/bi";

const UserSetting = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [enablePwd, setEnablePwd] = useState(false);

  useEffect(() => {
    const username = auth?.username;
    const accessToken = auth?.accessToken;

    const getUserInformation = async () => {
      try {
        const response = await userServices.getUserInformation(
          accessToken,
          username
        );
        setUser(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInformation();
  }, []);

  const handleEditInfo = (e) => {
    e.preventDefault();
    setEnableEdit(false);
  };

  const handleEditPwd = (e) => {
    e.preventDefault();
    setEnablePwd(false);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
          {/* Right Content */}
          <div className="col-span-full xl:col-auto">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                <div className="flex items-center justify-around">
                  <img
                    className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                    src={user?.img}
                    alt="User picture"
                  />
                  <div className="text-base italic text-brandPrimary">
                    <div className="flex items-center justify-start gap-1 text-xl leading-relaxed text-blue-800">
                      <BiUserCircle size={25} />
                      {user?.username}
                    </div>
                    <div className="flex items-center justify-start gap-2 text-orange-400">
                      Chinh phục 20 thẻ <BiBadgeCheck size={30} />
                    </div>
                    <div className="flex items-center justify-start gap-2 text-green-500">
                      Hạng {user?.rankName}
                      <BiSolidLike size={25} />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-gray-500">
                    Ảnh đại diện
                  </h3>
                  <div className="mb-4 text-sm text-gray-500">
                    JPG, GIF hoặc PNG. Tối đa 800K
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white bg-indigo-300 border border-gray-200 rounded-lg hover:bg-indigo-400 focus:ring-4 focus:ring-primary-300"
                    >
                      <svg
                        className="w-4 h-4 mr-2 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                      </svg>
                      Tải ảnh
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-red-400 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <div className="flow-root">
                <h3 className="text-xl font-semibold dark:text-white">
                  Tuỳ chỉnh
                </h3>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Bạn có thể tuỳ chỉnh những chức năng liên quan
                </p>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between py-4">
                    <div className="flex flex-col flex-grow">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        Nhận thông báo
                      </div>
                      <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Nhận thông báo từ chúng tôi
                      </div>
                    </div>
                    <label
                      htmlFor="company-news"
                      className="relative flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="company-news"
                        className="sr-only"
                      />
                      <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600" />
                    </label>
                  </div>

                  {/* Item 2 */}

                  <div className="flex items-center justify-between py-4">
                    <div className="flex flex-col flex-grow">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        Số thẻ một ngày
                      </div>
                      <div className="text-base font-normal text-gray-500 dark:text-gray-400"></div>
                    </div>
                    <div className="flex items-center cursor-pointer">
                      <input
                        type="number"
                        id="number-of-cards"
                        value={10}
                        className="w-16 h-10 p-2 text-gray-900 border rounded-md dark:text-white"
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Save all
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold dark:text-white">
                Thông tin
              </h3>
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên người dùng
                    </label>
                    <input
                      disabled={!enableEdit}
                      type="text"
                      name="name"
                      id="name"
                      value={user?.name}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên đăng nhập
                    </label>
                    <input
                      disabled={!enableEdit}
                      type="text"
                      name="username"
                      id="username"
                      value={user?.username}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      disabled={!enableEdit}
                      type="email"
                      name="email"
                      id="email"
                      value={user?.email}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="username@gmail.com"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-full">
                    {!enableEdit ? (
                      <button
                        onClick={() => setEnableEdit(true)}
                        className="text-gray-900 bg-indigo-300 hover:bg-indigo-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Chỉnh sửa
                      </button>
                    ) : (
                      <button
                        className="text-gray-900 bg-indigo-300 hover:bg-indigo-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={(e) => {
                          handleEditInfo(e);
                        }}
                      >
                        Lưu
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold dark:text-white">
                Thông tin mật khẩu (password)
              </h3>
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="current-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mật khẩu hiện tại
                    </label>
                    <input
                      disabled={!enablePwd}
                      type="text"
                      name="current-password"
                      id="current-password"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={
                        !enablePwd ? "<ẩn>" : "Nhập mật khẩu hiện tại"
                      }
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mật khẩu mới
                    </label>
                    <input
                      disabled={!enablePwd}
                      data-popover-target="popover-password"
                      data-popover-placement="bottom"
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={!enablePwd ? "<ẩn>" : "Nhập mật khẩu mới"}
                      required
                    />
                    <div
                      data-popover
                      id="popover-password"
                      role="tooltip"
                      className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                      <div className="p-3 space-y-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Must have at least 6 characters
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                          <div className="h-1 bg-orange-300 dark:bg-orange-400" />
                          <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                          <div className="h-1 bg-gray-200 dark:bg-gray-600" />
                        </div>
                        <p>It’s better to have:</p>
                        <ul>
                          <li className="flex items-center mb-1">
                            <svg
                              className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Upper &amp; lower case letters
                          </li>
                          <li className="flex items-center mb-1">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            A symbol (#$&amp;)
                          </li>
                          <li className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            A longer password (min. 12 chars.)
                          </li>
                        </ul>
                      </div>
                      <div data-popper-arrow />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      disabled={!enablePwd}
                      type="text"
                      name="confirm-password"
                      id="confirm-password"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={
                        !enablePwd ? "<ẩn>" : "Xác nhận mật khẩu mới"
                      }
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-full">
                    {!enablePwd ? (
                      <button
                        onClick={() => setEnablePwd(true)}
                        className="text-gray-900 bg-indigo-300 hover:bg-indigo-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Chỉnh sửa
                      </button>
                    ) : (
                      <button
                        className="text-gray-900 bg-indigo-300 hover:bg-indigo-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={(e) => {
                          handleEditPwd(e);
                        }}
                      >
                        Lưu
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSetting;
