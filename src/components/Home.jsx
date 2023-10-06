import React from "react";
import Navbar from "./Navbar";
import WelcomeBanner from "./WelcomeBanner";
import MyFooter from "./MyFooter";
import AboutLeitner from "./AboutLeitner";
import ProductsSlider from "./ProductsSlider";
import Services from "./Services";

const Home = () => {
  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <ProductsSlider />
      <Services />
      <AboutLeitner />
      <MyFooter />
    </>
  );
};

export default Home;
