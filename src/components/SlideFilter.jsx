import React from "react";

const SlideFilter = () => {
  const cars = [1, 2, 3, 4, 5, 6];
  return (
    <div className="slide-container">
      <h2>Propertice by Brand</h2>
      <p>
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Proin sodales ultrices nulla blandit volutpat.
      </p>
      <div className="slide-wrapper">
        <button className="left">&#10094;</button>
        <div className="brand-slide">
          {cars.map((car) => {
            return (
              <div className="image-container">
                <div className="brand">
                  <h3>Benz</h3>
                  <p>12 listing</p>
                </div>
                <img src={require("../assets/images/car.png")} alt="car" />
              </div>
            );
          })}
        </div>
        <button className="right">&#10095;</button>
      </div>
    </div>
  );
};

export default SlideFilter;
