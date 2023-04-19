import React, {useState, useRef, useEffect} from "react";
import {option_provinces} from "../utils/mockData";

const Search = ({
  filterProvince,
  locationInput,
  setFilterProvince,
  startDateInput,
  endDateInput,
  handleSearch,
  isSearch,
}) => {
  const [isCheckedAge, setIsCheckedAge] = useState(false);
  const [error, setError] = useState("");

  const handleFilterChange = (event) => {
    setFilterProvince(event.target.value);
  };

  const handleCheckDriverAge = (event) => {
    if (event.target.checked) {
      setError("");
    }
    setIsCheckedAge(event.target.checked);
  };

  const handleSubmit = (event) => {
    if (!isCheckedAge) {
      setError("Please confirm your age");
      return;
    }
    setError("");
    handleSearch(event);
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
              defaultValue={startDateInput}
              ref={startDateInput}
              type="date"
            />
          </div>
          <div className="time-filter">
            <label>Return Date And Time</label>
            <input defaultValue={endDateInput} ref={endDateInput} type="date" />
          </div>
          <div className="time-filter">
            <label>Location</label>

            <select value={filterProvince} onChange={handleFilterChange}>
              {option_provinces.map((province, index) => (
                <option key={index} value={province.value}>
                  {province.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="submit">
          <div className="confirm-age">
            <label>
              <input
                type="checkbox"
                name="option1"
                value="Option 1"
                onChange={handleCheckDriverAge}
              />
              <p>Driver aged between 25 - 75</p>
            </label>
            {error && <span className="error">{error}</span>}
          </div>
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
