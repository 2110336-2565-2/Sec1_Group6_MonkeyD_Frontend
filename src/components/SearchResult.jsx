import React from "react";
import CarCard from "./CarCard";

const SearchResult = () => {
  const cars = [1, 2, 3, 4, 5, 6];
  return (
    <div className="result-container">
      <h2>Search Results</h2>
      <p>found 102 cars</p>
      <div className="result-wrapper">
        {cars.map((car) => {
          return <CarCard />;
        })}
      </div>
      <button>Load more listing</button>
    </div>
  );
};

export default SearchResult;
