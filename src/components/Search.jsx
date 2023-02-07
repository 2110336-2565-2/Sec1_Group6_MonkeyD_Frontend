import React from "react";

const Search = ({
  locationInput,
  startDateInput,
  endDateInput,
  handleSearch,
}) => {
  return (
    <div className="search-container">
      <h1 className="title">Find Cars</h1>
      <div className="search-box">
        <input
          ref={locationInput}
          type="text"
          placeholder="Fill location"
          name="search"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="vertical"></div>
        <i className="fa-solid fa-location-crosshairs"></i>
      </div>
      <div className="filter-box">
        <div className="time-filter">
          <label>Start Date And Time</label>
          <input ref={startDateInput} type="date" />
        </div>
        <div className="time-filter">
          <label>Return Date And Time</label>
          <input ref={endDateInput} type="date" />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;
