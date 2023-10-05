import React from "react";
import Navbar from "./Navbar";
import WelcomeBanner from "./WelcomeBanner";
import MyFooter from "./MyFooter";
import AboutLeitner from "./AboutLeitner";
import ProductsSlider from "./ProductsSlider";

const Home = () => {
  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <ProductsSlider />
      <AboutLeitner />
      <MyFooter />
    </>
  );
};

export default Home;
