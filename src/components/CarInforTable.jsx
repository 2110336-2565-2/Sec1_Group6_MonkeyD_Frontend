import React, {useEffect, useState} from "react";
import axios from "axios";
import {checkLogin} from "../utils/auth";

const CarInforTable = ({
  owner_id,
  car_id,
  year,
  gear_type,
  energy_types,
  province,
  rental_price,
  rating,
  passenger,
}) => {
  const handleClick = async () => {
    if (checkLogin()) {
      try {
        const resToggle = await axios.patch(
          `http://localhost:8080/car`,
          {
            headers: {
              car_id: car_id,
              renter_id: sessionStorage.getItem("user_id"),
            },
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error(error);
      }
      try {
        const resUpdate = await axios.patch(
          `http://localhost:8080/user`,
          {
            headers: {
              lessor_id: owner_id,
              renter_id: sessionStorage.getItem("user_id"),
            },
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      window.location.assign("/");
    }
  };
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
      <button onClick={handleClick} className="rent-btn">
        <i className="fa-sharp fa-solid fa-hand-holding-hand" />
        Rent
      </button>
    </div>
  );
};

export default CarInforTable;
