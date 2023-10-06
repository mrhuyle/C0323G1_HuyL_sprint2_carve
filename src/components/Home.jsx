import React from "react";
import Navbar from "./Navbar";
import WelcomeBanner from "./WelcomeBanner";
import MyFooter from "./MyFooter";
import AboutLeitner from "./AboutLeitner";
import ProductsSlider from "./ProductsSlider";
import Roadmap from "./Roadmap";
import Blogs from "./Blogs";

const Home = () => {
  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <ProductsSlider />
      <ProductsSlider />
      <Roadmap />
      <AboutLeitner />
      <Blogs />
      <MyFooter />
    </>
  );
};

export default Home;
