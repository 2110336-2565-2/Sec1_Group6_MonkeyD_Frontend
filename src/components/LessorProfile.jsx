import React from "react";

const LessorProfile = ({
  user_image,
  owner,
  user_rating,
  brand,
  model,
  description,
}) => {
  return (
    <div className="profile-detail">
      <div className="lessor-name">
        <img src={user_image} alt="lessorProfile" className="profile-image" />
        <h3>{owner}</h3>
      </div>
      <div className="more-info">
        <div>
          <i className="fa-solid fa-star" />
          <p>{user_rating}</p>
        </div>
        <button className="view-review-btn">View Lessor Reviews</button>
        <button className="chat-btn">
          <i className="fa-solid fa-comments" />
          Start Chat Now
        </button>
      </div>
      <div className="car-info">
        <h3>
          {brand} {model}
        </h3>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default LessorProfile;
