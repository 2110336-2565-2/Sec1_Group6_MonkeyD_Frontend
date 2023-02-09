import React from "react";

const CarInforTable = () => {
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
            <td>2012</td>
          </tr>
          <tr>
            <td>Gear type</td>
            <td>Auto</td>
          </tr>
          <tr>
            <td>Energy type</td>
            <td>Petrol</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>Bangna</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>฿2500 / days</td>
          </tr>
          <tr>
            <td>Car Rating</td>
            <td>4.5</td>
          </tr>
          <tr>
            <td>Passenger</td>
            <td>4</td>
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
