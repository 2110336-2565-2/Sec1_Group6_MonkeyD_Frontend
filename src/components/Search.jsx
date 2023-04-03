import React, {useState, useRef, useEffect} from "react";
import {provinces} from "../utils/mockData";

const Search = ({
  locationInput,
  setFilterProvince,
  startDateInput,
  endDateInput,
  handleSearch,
  isSearch,
}) => {
  const handleFilterChange = (event) => {
    setFilterProvince(event.target.value);
  };

  return (
    <div className="search-container">
      <div className="head-title">
        <h1 className="title">Find the best car rental deals</h1>
      </div>
      <div className="box">
        <div className="filter">
          <div className="time-filter">
            <label>Start Date:</label>
            <input
              defaultValue={new Date().toISOString().substr(0, 10)}
              ref={startDateInput}
              type="date"
            />
          </div>
          <div className="time-filter">
            <label>Return Date And Time</label>
            <input
              defaultValue={new Date(
                new Date().getTime() + 3 * 24 * 60 * 60 * 1000
              )
                .toISOString()
                .substr(0, 10)}
              ref={endDateInput}
              type="date"
            />
          </div>
          <div className="time-filter">
            <label>Location</label>

            <select onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                choose one
              </option>
              {provinces.map((province, index) => (
                <option key={index} value={province.value}>
                  {province.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="submit">
          <label>
            <input type="checkbox" name="option1" value="Option 1" />
            <p>Driver aged between 25 - 75</p>
          </label>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
