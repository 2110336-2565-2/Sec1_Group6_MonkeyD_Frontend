import React from "react";

const CarCard = ({
  car_id,
  user_image,
  car_image,
  owner,
  brand,
  model,
  rental_price,
  passenger,
  gear_type,
  rating,
}) => {
  const handleClick = () => {
    window.location.assign(`/carDetail/${car_id}`);
  };

  return (
    <div onClick={handleClick} className="card-container">
      <div className="header">
        <img src={car_image} alt="car" />
      </div>
      <div className="footer">
        <h3>
          {brand} {model}
        </h3>
        <h3 className="price">฿ {rental_price} / day</h3>
        <div className="info">
          <i className="fa-solid fa-user-astronaut"></i>
          <p>{passenger}</p>
        </div>
        <div className="info">
          <i className="fa-solid fa-car"></i>
          <p>{gear_type}</p>
        </div>
        <div className="info">
          <i className="fa-solid fa-star"></i>
          <p>{rating}</p>
        </div>
        <div className="avatar">
          <img src={user_image} alt="car" />
          <p>{owner}</p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
