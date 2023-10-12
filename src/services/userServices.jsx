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

export const logout = async (accessToken) => {
  console.log("TOKEN: " + accessToken);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const response = await axios.post(`${baseUrl}/logout`, null, config);
  return response;
};

export const refreshToken = async () => {
  const response = await axios.post(
    `${baseUrl}/refresh-token`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log(response.data);
  return response;
};
