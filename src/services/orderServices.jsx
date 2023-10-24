import axios from "axios";

export const baseUrl = "http://localhost:8080/api/order";

export const createOrder = async (accessToken, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = await axios.post(`${baseUrl}/create`, data, config);
  return response;
};

export const saveInvoice = async (accessToken, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = await axios.post(`${baseUrl}/save-invoice`, data, config);
  return response;
};
