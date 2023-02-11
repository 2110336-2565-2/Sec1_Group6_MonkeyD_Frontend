import React from "react";

const CarInforTable = ({ infor }) => {
  return (
    <div className="car-infor">
      <table>
        <tbody>
          <tr>
            <td>Car Information</td>
            <td>
              <button>view car review</button>
            </td>
          </tr>
          <tr>
            <td>Year</td>
            <td>
              <i className="fa-solid fa-calendar-days" />
              {infor.age}
            </td>
          </tr>
          <tr>
            <td>Gear type</td>
            <td>
              <i className="fa-solid fa-car" />
              {infor.gearType}
            </td>
          </tr>
          <tr>
            <td>Energy type</td>
            <td>
              <i className="fa-sharp fa-solid fa-gas-pump" />
              {infor.energyTypes.map((type) => {
                return `${type} `;
              })}
            </td>
          </tr>
          <tr>
            <td>Location</td>
            <td>
              <i className="fa-solid fa-location-dot" />
              {infor.province}
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              <i className="fa-solid fa-comment-dollar" />฿{infor.rental_price}{" "}
              / days
            </td>
          </tr>
          <tr>
            <td>Car Rating</td>
            <td>
              <i className="fa-solid fa-star" />
              {infor.rating}
            </td>
          </tr>
          <tr>
            <td>Passenger</td>
            <td>
              <i className="fa-solid fa-user" />
              {infor.passenger}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="rent-btn">
        <i className="fa-sharp fa-solid fa-hand-holding-hand" />
        Rent
      </button>
    </div>
  );
};

export default CarInforTable;
