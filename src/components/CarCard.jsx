import React from "react";
import {useNavigate} from "react-router-dom";

const CarCard = ({
  handleChooseCar,
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
  reviewCount,
}) => {
  const navigate = useNavigate();
  const handleClick = async (event) => {
    await handleChooseCar(event);
    navigate(`/carDetail/${car_id}`);
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
          <p>{reviewCount ? rating.toFixed(2) : "No review"}</p>
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
