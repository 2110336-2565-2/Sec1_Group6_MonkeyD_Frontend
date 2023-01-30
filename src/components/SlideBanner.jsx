import React from "react";

const SlideBanner = () => {
  return (
    <div className="sildebanner-container">
      {/* <button className="left">&#10094;</button>
      <button className="right">&#10095;</button> */}
      <img
        src={require("../assets/images/banner.png")}
        alt="banner"
        className="banner"
      />
    </div>
  );
};

export default SlideBanner;
