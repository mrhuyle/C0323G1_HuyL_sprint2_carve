import React, { useState, useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import logo from "../assets/img/carve_logo_indigo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import * as userServices from "../services/userServices";
import Swal from "sweetalert2";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPWd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestPayload = {
        username: user,
        password: pwd,
      };
      const response = await userServices.login(requestPayload);
      console.log(response?.data);
      const accessToken = response.data.access_token;
      const jwtDecoded = jwt_decode(accessToken);
      const username = jwtDecoded.sub;
      const role = jwtDecoded.role;
      console.log(role);
      setAuth({ username, pwd, role, accessToken });
      setUser("");
      setPWd("");
      Swal.fire({
        title: "Đăng nhập thành công",
        icon: "success",
        timer: 1500,
      }).then(() => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Đã có lỗi, server không phản hồi!");
      } else if (err.response?.status === 403) {
        setErrMsg("Thông tin đăng nhập không đúng/không tồn tại!");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
            <span id="brand" className="text-4xl text-brandPrimary">
              Carve
            </span>
          </Link>
          {/* error message */}
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-brandPrimary md:text-2xl dark:text-white">
                Đăng nhập
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPWd(e.target.value)}
                    value={pwd}
                    required
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                        onChange={togglePersist}
                        checked={persist}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Ghi nhớ phiên đăng nhập
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-brandPrimary hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-brandPrimary hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Đăng nhập
                </button>
                <p className="text-sm font-light text-gray-500">
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-brandPrimary hover:underline"
                  >
                    Đăng ký
                  </Link>
                  <span className="font-medium text-brandPrimary">
                    &nbsp; hoặc &nbsp;
                  </span>
                  <Link
                    to="/"
                    className="font-medium text-brandPrimary hover:underline"
                  >
                    Trở lại trang chủ
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
