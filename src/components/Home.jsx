import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import WelcomeBanner from "./WelcomeBanner";
import MyFooter from "./MyFooter";
import AboutLeitner from "./AboutLeitner";
import ProductsSlider from "./ProductsSlider";
import Roadmap from "./Roadmap";
import Blogs from "./Blogs";
import * as deckServices from "../services/deckServices";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [latestDecks, setLatestDecks] = useState([]);

  const getLatestDecks = async () => {
    try {
      const response = await deckServices.getLatestDecks();
      setLatestDecks(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (searchInput) => {
    let result = searchInput.trim();
    if (result === "") {
      navigate(`/search/ `);
    } else {
      navigate(`/search/${result}`);
    }
  };

  useEffect(() => {
    getLatestDecks();
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <WelcomeBanner />
      <ProductsSlider
        decks={latestDecks}
        title={"BỘ THẺ MỚI NHẤT"}
        next={"btn-nxt-1"}
        prev={"btn-prev-1"}
      />
      <ProductsSlider
        decks={latestDecks}
        title={"BỘ THẺ BÁN CHẠY"}
        next={"btn-nxt-2"}
        prev={"btn-prev-2"}
      />
      <Roadmap />
      <AboutLeitner />
      <Blogs />
      <MyFooter />
    </>
  );
};

export default Home;
