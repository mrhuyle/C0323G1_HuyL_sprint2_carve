import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/auth";

export const register = async (requestPayload) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.post(`${baseUrl}/register`, requestPayload, {
    headers: headers,
  });
  return response;
};
