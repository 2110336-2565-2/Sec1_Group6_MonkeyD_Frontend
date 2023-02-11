import React from "react";

const LessorProfile = ({ lessor }) => {
  // const averageRating =
  //   lessor.review.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue,
  //     0
  //   ) / lessor.review.length;

  return (
    <div className="profile-detail">
      <div className="lessor-name">{lessor.username}</div>
      <div className="user-role">Lessor</div>
      <div className="lessor-status">
        <img src={lessor.image} alt="lessorProfile" className="profile-image" />
        <ul className="status">
          <li>
            <div>
              <i className="fa-solid fa-star" />
              <p>4.5 Lessor Rating</p>
            </div>
          </li>
          <li>
            <div>
              <i className="fa-sharp fa-solid fa-award" />
              <p>{lessor.review.length} Reviews</p>
            </div>
          </li>
          <li>
            <div>
              <i className="fa-solid fa-users" />
              <p>{lessor.rentedCount} Renter</p>
            </div>
          </li>
          <li>
            <div>
              <i className="fa-solid fa-car-side" />
              <p>{lessor.ownercar.length} Cars</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="more-infor">
        <button className="view-review-btn">View Lessor Reviews</button>
        <button className="chat-btn">
          <i className="fa-solid fa-comments" />
          Start Chat Now
        </button>
      </div>
    </div>
  );
};

export default LessorProfile;