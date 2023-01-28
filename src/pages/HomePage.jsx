import React from "react";
import Search from "../components/Search";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <img
        src={require("../assets/images/banner.png")}
        alt="banner"
        className="banner"
      />
      <Search />
    </div>
  );
};

export default HomePage;
