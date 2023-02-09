import React from "react";

const LessorProfile = () => {
  return (
    <div className="profile-detail">
      <div className="lessor-name">Nuttawat Likhitsomboon</div>
      <div className="user-role">Lessor</div>
      <div className="lessor-status">
        <img
          src={require("../assets/images/cars/lessor-profile.png")}
          alt="lessorProfile"
          className="profile-image"
        />
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
              <p>15 Reviews</p>
            </div>
          </li>
          <li>
            <div>
              <i className="fa-solid fa-users" />
              <p>20 Renter</p>
            </div>
          </li>
          <li>
            <div>
              <i className="fa-solid fa-car-side" />
              <p>4 Cars</p>
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
