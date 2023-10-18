import axios from "axios";

const baseURL = "http://localhost:8080/pay";

export const createVNPay = (accessToken, price, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = axios.get(`${baseURL}?price=${price}&id=${id}`, config);
  return response;
};
