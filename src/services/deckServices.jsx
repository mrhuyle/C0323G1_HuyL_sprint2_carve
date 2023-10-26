import axios from "axios";

export const baseUrl = "http://localhost:8080/api/home";

export const getLatestDecks = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const response = await axios.get(`${baseUrl}/get-latest-decks`, null, config);
  console.log(response.data);
  return response;
};

export const getDeckDetail = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.get(
    `${baseUrl}/get-detail?id=${id}`,
    null,
    config
  );
  console.log(response);
  return response;
};

export const getTagsByDeckId = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const response = await axios.get(
    `${baseUrl}/get-tags?id=${id}`,
    null,
    config
  );
  console.log(response);
  return response;
};
