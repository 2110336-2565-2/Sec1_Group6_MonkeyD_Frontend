import React from "react";
import axios from "axios";
import {checkLogin} from "../utils/auth";
import Config from "../assets/configs/configs.json";

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
  rented_out,
  set_user_info,
  set_show_modal,
  reviewCount,
}) => {
  const handleClick = async () => {
    const isLogin = await checkLogin();
    if (!isLogin) {
      alert("Please sign in before renting car.");
      window.location.assign("/");
      return;
    }

    try {
      const id = localStorage.getItem("user_id");
      const res = await axios.post(
        `${Config.BACKEND_URL}/user/info`,
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );

      const {
        username,
        email,
        prefix,
        firstName,
        lastName,
        phoneNumber,
        image,
        IDCardNumber,
        IDCardImage,
        drivingLicenseNumber,
        drivingLicenseImage,
      } = res.data;
      const selectedUserInfo = {
        username,
        email,
        prefix,
        firstName,
        lastName,
        phoneNumber,
        image,
        IDCardNumber,
        IDCardImage,
        drivingLicenseNumber,
        drivingLicenseImage,
      };
      set_user_info(selectedUserInfo);
      set_show_modal(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="car-spec">
      <div className="car-table">
        <div className="car-header car-row">
          <h3>Car Information</h3>
          {/* <button>view car review</button> */}
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
            {reviewCount ? rating.toFixed(2) : "No review"}
          </div>
        </div>
        <div className="car-row">
          <p>Passenger</p>
          <div className="value">
            <i className="fa-solid fa-user" />
            {passenger}
          </div>
        </div>
        <div className="car-row">
          <p>Rented out</p>
          <div className="value">
            <i className="fa-solid fa-gavel"></i>
            {rented_out} times
          </div>
        </div>
      </div>
      <button
        style={{
          display:
            owner_id === localStorage.getItem("user_id") ? "none" : "block",
        }}
        onClick={handleClick}
        className="rent-btn"
      >
        <i className="fa-sharp fa-solid fa-hand-holding-hand" />
        Rent
      </button>
    </div>
  );
};

export default CarInforTable;
