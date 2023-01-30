import React from "react";
import Search from "../components/Search";
import SlideFilter from "../components/SlideFilter";
import SlideBanner from "../components/SlideBanner";
import SearchResult from "../components/SearchResult";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Search />
      <SlideBanner />
      <SlideFilter />
      <SearchResult />
      <Footer />
    </div>
  );
};

export default HomePage;
