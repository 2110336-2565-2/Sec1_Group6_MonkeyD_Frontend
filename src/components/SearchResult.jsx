import React from "react";
import CarCard from "./CarCard";

const SearchResult = ({carList}) => {
  return (
    <div className="result-container">
      <h2>Search Results</h2>
      <p>found {carList.length} cars</p>
      <div className="result-wrapper">
        {carList.map((car) => {
          return (
            <CarCard
              key={car._id}
              car_id={car._id}
              user_image={
                car.user_image ||
                "https://i.pinimg.com/550x/4d/72/97/4d7297dad94265c0acbc3b677d418935.jpg" // have to change image by default
              }
              car_image={
                car.car_image ||
                "https://images.autofun.co.th/file1/ab328bac6b68408ea16c5e1525e7a9d0_1125x630.jpg" // have to change image by default
              }
              owner={car.owner}
              brand={car.brand}
              model={car.model}
              rental_price={car.rental_price}
              passenger={car.passenger}
              gear_type={car.gear_type}
              rating={car.rating}
            />
          );
        })}
      </div>
      <button>Load more listing</button>
    </div>
  );
};

export default SearchResult;
