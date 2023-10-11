import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1/auth";

export const register = async (requestPayload) => {
  const response = await axios.post(`${baseUrl}/register`, requestPayload, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const login = async (requestPayload) => {
  const response = await axios.post(`${baseUrl}/authenticate`, requestPayload, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response;
};

export const refreshToken = async (refreshToken) => {
  const authorization = "Bearer " + refreshToken;
  const response = await axios.post(
    `${baseUrl}/refresh-token`,
    {},
    {
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return response;
};

export const getToken = () => {
  return window.localStorage.getItem("token");
};

export const setToken = (token) => {
  return window.localStorage.setItem("token", token);
};
