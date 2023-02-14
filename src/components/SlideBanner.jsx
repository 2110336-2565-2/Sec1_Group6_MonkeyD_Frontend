import React from "react";

const SlideBanner = () => {
  return (
    <div className="sildebanner-container">
      <img
        src={require("../assets/images/banner.png")}
        alt="banner"
        className="banner"
      />
    </div>
  );
};

export default SlideBanner;
