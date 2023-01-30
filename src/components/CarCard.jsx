import React from "react";

const CarCard = () => {
  return (
    <div className="card-container">
      <div className="header">
        <img src={require("../assets/images/car2.png")} alt="car" />
      </div>
      <div className="footer">
        <h3>BMW series 3</h3>
        <h3 className="price">฿ 2,500 / day</h3>
        <div className="info">
          <i class="fa-solid fa-user-astronaut"></i>
          <p>4</p>
        </div>
        <div className="info">
          <i class="fa-solid fa-car"></i>
          <p>Auto/Petro</p>
        </div>
        <div className="info">
          <i class="fa-solid fa-star"></i>
          <p>4.5</p>
        </div>
        <div className="avatar">
          <img src={require("../assets/images/avatar.png")} alt="car" />
          <p>Jenny Wilson</p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
