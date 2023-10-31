import axios from "axios";

export const baseUrl = "http://localhost:8080/api/home";
export const deckUrl = "http://localhost:8080/api/deck";

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

export const getDecksWithPagination = async (
  page,
  limit,
  keyword,
  sortBy,
  sortDirection
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  console.log(
    `${baseUrl}/get-list-pagination?page=${page}&limit=${limit}&keyword=${keyword}&sortBy=${sortBy}&sortDirection=${sortDirection}`
  );
  const response = await axios.get(
    `${baseUrl}/get-list-pagination?page=${page}&limit=${limit}&keyword=${keyword}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
    config
  );
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

export const createDeck = async (accessToken, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const response = await axios.post(`${deckUrl}/create`, data, config);
  console.log(response);
  return response;
};
