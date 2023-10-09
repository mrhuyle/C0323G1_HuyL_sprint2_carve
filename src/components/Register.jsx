import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/img/carve_logo_indigo.png";
import { Link } from "react-router-dom";
import successImg from "../assets/img/success.png";

import * as userServices from "../services/userServices";

import {
  AiOutlineInfoCircle,
  AiOutlineClose,
  AiOutlineCheck,
} from "react-icons/ai";

const FULLNAME_REGEX =
  /^(([A-ZĐ][a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ']{0,20})\s?)+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+.[a-zA-Z]{2,}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  // state for full name
  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  // state for username
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // state for email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // state for password
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // state for error message
  const [errMsg, setErrMsg] = useState("");
  // state for <success></success>
  const [success, setSuccess] = useState(false);

  // state for terms
  const [validTerms, setValidTerms] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = FULLNAME_REGEX.test(fullName);
    setValidFullName(result);
  }, [fullName]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd == matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, fullName, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Lỗi tạo tài khoản không theo quy trình");
      return;
    }
    const requestPayload = {
      name: fullName,
      email: email,
      username: user,
      password: pwd,
      roles: ["ROLE_USER"],
    };
    try {
      const response = await userServices.register(requestPayload);
      console.log(response);
      if (response.status == 200) {
        setSuccess(true);
      }
      // clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Đã có lỗi, server không phản hồi!");
      } else if (err.response.status == 409) {
        setErrMsg("Tên đăng nhập đã tồn tại, vui lòng nhập lại");
      } else {
        setErrMsg("Đã có lỗi trong quá trình đăng ký, vui lòng thử lại sau.");
      }
    }
  };

  return (
    <>
      {success ? (
        <section className="bg-gray-50 ">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link
              to="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
            >
              <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
              <span id="brand" className="text-4xl text-brandPrimary">
                Carve
              </span>
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-brandPrimary md:text-2xl ">
                  Chúc mừng đăng ký thành công!
                </h1>
                <img src={successImg} alt="success" />
                <div className="flex items-center justify-center">
                  <Link
                    to="/login"
                    className="text-xl font-bold text-primary-600 hover:underline text-brandPrimary "
                  >
                    <button
                      type="button"
                      className="text-xl focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
                    >
                      Đăng nhập
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-gray-50 ">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link
              to="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
            >
              <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
              <span id="brand" className="text-4xl text-brandPrimary">
                Carve
              </span>
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              {/* error message */}
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-brandPrimary md:text-2xl ">
                  Tạo tài khoản
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="fullName"
                      className="flex mb-2 text-base font-medium text-gray-900"
                    >
                      Họ và tên
                      <span className={validFullName ? "valid" : "hide"}>
                        <AiOutlineCheck />
                      </span>
                      <span
                        className={
                          validFullName || !fullName ? "hide" : "invalid"
                        }
                      >
                        <AiOutlineClose />
                      </span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="off"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      aria-invalid={validFullName ? "false" : "true"}
                      aria-describedby="fullNameNote"
                      onFocus={() => setFullNameFocus(true)}
                      onBlur={() => setFullNameFocus(false)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder=""
                    />
                    <p
                      id="fullNameNote"
                      className={
                        fullNameFocus && fullName && !validFullName
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <AiOutlineInfoCircle />
                      Mỗi từ bắt đầu bằng chữ in hoa
                      <br />
                      Không bao gồm số, gạch dưới, gạch ngang, ký tự đặc biệt.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="flex mb-2 text-base font-medium text-gray-900"
                    >
                      Tên đăng nhập
                      <span className={validName ? "valid" : "hide"}>
                        <AiOutlineCheck />
                      </span>
                      <span className={validName || !user ? "hide" : "invalid"}>
                        <AiOutlineClose />
                      </span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder=""
                    />
                    <p
                      id="uidnote"
                      className={
                        userFocus && user && !validName
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <AiOutlineInfoCircle />
                      4 - 24 ký tự <br />
                      Bắt đầu bằng chữ
                      <br />
                      Bao gồm chữ, số, gạch dưới, gạch ngang.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="flex mb-2 text-base font-medium text-gray-900 "
                    >
                      Email
                      <span className={validEmail ? "valid" : "hide"}>
                        <AiOutlineCheck />
                      </span>
                      <span
                        className={validEmail || !email ? "hide" : "invalid"}
                      >
                        <AiOutlineClose />
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="emailNote"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="your_email@abc.com"
                    />
                    <p
                      id="emailNote"
                      className={
                        emailFocus && email && !validEmail
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <AiOutlineInfoCircle />
                      Email chưa đúng định dạng.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="flex mb-2 text-base font-medium text-gray-900"
                    >
                      Password
                      <span className={validPwd ? "valid" : "hide"}>
                        <AiOutlineCheck />
                      </span>
                      <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <AiOutlineClose />
                      </span>
                    </label>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => {
                        setPwd(e.target.value);
                      }}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdNote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    />
                    <p
                      id="pwdNote"
                      className={
                        pwdFocus && !validPwd ? "instructions" : "offscreen"
                      }
                    >
                      <AiOutlineInfoCircle />
                      8 - 24 ký tự.
                      <br />
                      Bao gồm ký tự hoa và thường, số và ký tự đặc biệt.
                      <br />
                      Ký tự đặc biệt:
                      <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span>
                      <span aria-label="hashtag">#</span>
                      <span aria-label="dollar sign">$</span>
                      <span aria-label="percent">%</span>
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="flex mb-2 text-base font-medium text-gray-900 "
                    >
                      Nhập lại password
                      <span
                        className={validMatch && matchPwd ? "valid" : "hide"}
                      >
                        <AiOutlineCheck />
                      </span>
                      <span
                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                      >
                        <AiOutlineClose />
                      </span>
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      required
                      onChange={(e) => {
                        setMatchPwd(e.target.value);
                      }}
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => {
                        setMatchFocus(true);
                      }}
                      onBlur={() => {
                        setMatchFocus(false);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    />
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch ? "instructions" : "offscreen"
                      }
                    >
                      <AiOutlineInfoCircle />
                      Phải trùng với password đã nhập.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                        required
                        onChange={(e) => setValidTerms(e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-base">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 "
                      >
                        Tôi đồng ý{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline "
                          href="#"
                        >
                          với Điều khoản và Dịch vụ
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={
                      !validName ||
                      !validPwd ||
                      !validEmail ||
                      !validMatch ||
                      !validTerms
                        ? true
                        : false
                    }
                    className="w-full text-white bg-brandPrimary hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center "
                  >
                    Tạo tài khoản
                  </button>
                  <p className="text-sm font-light text-gray-500 ">
                    Đã có tài khoản?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline text-brandPrimary "
                    >
                      Đăng nhập
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
