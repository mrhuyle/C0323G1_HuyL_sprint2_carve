import axios from "axios";

const baseUrl = "http://localhost:8080/api/cart";

export const getCartItems = async (accessToken, username) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = await axios.get(
    `${baseUrl}/get-items?username=${username}`,
    config
  );
  return response;
};

export const deleteCartItemById = async (accessToken, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = await axios.delete(
    `${baseUrl}/delete-item?id=${id}`,
    config
  );
  return response;
};

export const getCartIdByUsername = async (accessToken, username) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = await axios.get(
    `${baseUrl}/get-id?username=${username}`,
    config
  );
  return response;
};

export const addCartItem = async (accessToken, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = await axios.post(`${baseUrl}/add-item`, data, config);
  return response;
};

export const getCartItemsByOrder = async (accessToken, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = await axios.get(`${baseUrl}/get-order?id=${id}`, config);
  console.log(response);
  return response;
};
