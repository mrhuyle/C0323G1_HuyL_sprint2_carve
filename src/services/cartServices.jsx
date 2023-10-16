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
