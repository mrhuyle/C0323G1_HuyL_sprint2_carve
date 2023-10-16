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
