import React, {useState, useRef, useEffect} from "react";
import {provinces} from "../utils/mockData";

const Search = ({
  locationInput,
  startDateInput,
  endDateInput,
  handleSearch,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const handleOptionClick = (value) => {
    locationInput.current.value = value;
    setShowDropdown(false);
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="search-container">
      <h1 className="title">Find Cars</h1>
      <div className="search-wrap">
        <div className="search-box">
          <input
            ref={locationInput}
            type="text"
            placeholder={"Fill location"}
            name="search"
            onClick={handleClick}
          />
        </div>
        {showDropdown && (
          <ul className="options" ref={ref}>
            {provinces.sort().map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
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
