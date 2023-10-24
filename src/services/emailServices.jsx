import axios from "axios";

export const baseUrl = "http://localhost:8080/api/email";

export const sendEmail = async (accessToken, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const response = await axios.post(`${baseUrl}/send-template`, data, config);
  return response;
};
