import React from "react";
import Search from "../components/Search";
import SlideFilter from "../components/SlideFilter";
import SlideBanner from "../components/SlideBanner";
import SearchResult from "../components/SearchResult";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Search />
      <SlideBanner />
      <SlideFilter />
      <SearchResult />
    </div>
  );
};

export default HomePage;
