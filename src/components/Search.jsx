import React from "react";

const Search = () => {
  return (
    <div className="search-container">
      <div className="title">Find Cars</div>
      <div className="search-box">
        <input type="text" placeholder="Fill location" name="search" />
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="vertical"></div>
        <i className="fa-solid fa-location-crosshairs"></i>
      </div>
      <div className="filter-box">
        <div className="time-filter">
          <label>Start Date And Time</label>
          <input type="date" />
        </div>
        <div className="time-filter">
          <label>Return Date And Time</label>
          <input type="date" />
        </div>
        <button>Search</button>
      </div>
    </div>
  );
};

export default Search;
