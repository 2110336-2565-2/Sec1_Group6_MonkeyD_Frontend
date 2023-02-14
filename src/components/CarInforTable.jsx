import React from "react";

const CarInforTable = ({
  year,
  gear_type,
  energy_types,
  province,
  rental_price,
  rating,
  passenger,
}) => {
  return (
    <div className="car-spec">
      <div className="car-table">
        <div className="car-header car-row">
          <h3>Car Information</h3>
          <button>view car review</button>
        </div>
        <div className="car-row">
          <p>Year</p>
          <div className="value">
            <i className="fa-solid fa-calendar-days" />
            {year}
          </div>
        </div>
        <div className="car-row">
          <p>Gear type</p>
          <div className="value">
            <i className="fa-solid fa-car" />
            {gear_type}
          </div>
        </div>
        <div className="car-row">
          <p>Energy type</p>
          <div className="value">
            <i className="fa-sharp fa-solid fa-gas-pump" />
            {energy_types.map((type) => {
              return `${type} `;
            })}
          </div>
        </div>
        <div className="car-row">
          <p>Location</p>
          <div className="value">
            <i className="fa-solid fa-location-dot" />
            {province}
          </div>
        </div>
        <div className="car-row">
          <p>Price</p>
          <div className="value">
            <i className="fa-solid fa-comment-dollar" />฿{rental_price}/ days
          </div>
        </div>
        <div className="car-row">
          <p>Car Rating</p>
          <div className="value">
            <i className="fa-solid fa-star" />
            {rating}
          </div>
        </div>
        <div className="car-row">
          <p>Passenger</p>
          <div className="value">
            <i className="fa-solid fa-user" />
            {passenger}
          </div>
        </div>
      </div>
      <button className="rent-btn">
        <i className="fa-sharp fa-solid fa-hand-holding-hand" />
        Rent
      </button>
    </div>
  );
};

export default CarInforTable;
