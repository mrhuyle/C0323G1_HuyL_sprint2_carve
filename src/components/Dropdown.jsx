import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import * as userServices from "../services/userServices";
import UserAvatar from "./UserAvatar";

const Dropdown = ({ username }) => {
  const { auth, setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const roles = auth?.role;

  const logOut = () => {
    try {
      Swal.fire({
        title: "Bạn có muốn đăng xuất?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Đăng xuất",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const accessToken = auth?.accessToken;
          const response = await userServices.logout(accessToken);
          if (response.status === 200) {
            Swal.fire({
              title: "Đăng xuất thành công",
              icon: "success",
              timer: 1500,
            });
          }
          setAuth({});
          setPersist(false);
          navigate("/");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block w-40 text-left min-w-min">
        <div className="flex items-center justify-between">
          <Menu.Button className="items-center justify-start hidden w-full gap-2 px-4 py-2 border-2 border-gray-300 rounded lg:flex text-brandPrimary hover:bg-brandPrimary hover:text-gray-100 hover:cursor-pointer">
            <UserAvatar />
            {username}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {roles.some((role) => role.authority === "ROLE_ADMIN") ? (
                <Link to="/admin/dashboard">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-brandPrimary text-white"
                            : "text-brandPrimary"
                        } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                      >
                        {active ? (
                          <DuplicateActiveIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <DuplicateInactiveIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Chức năng
                      </button>
                    )}
                  </Menu.Item>
                </Link>
              ) : (
                <Link to="/user/dashboard/setting">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-brandPrimary text-white"
                            : "text-brandPrimary"
                        } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                      >
                        {active ? (
                          <DuplicateActiveIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <DuplicateInactiveIcon
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Chức năng
                      </button>
                    )}
                  </Menu.Item>
                </Link>
              )}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-brandPrimary text-white"
                        : "text-brandPrimary"
                    } group flex w-full items-center rounded-md gap-1 px-2 py-2 text-base`}
                    onClick={logOut}
                  >
                    {active ? (
                      <MoveActiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveInactiveIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Đăng xuất
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;

function DuplicateInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#6499E9"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#6499E9"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#6499E9"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#6499E9"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#6499E9" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#6499E9" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#6499E9" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}
