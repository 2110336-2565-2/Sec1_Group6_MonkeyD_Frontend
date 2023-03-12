import {useState} from "react";

const MyBooking = () => {
  const statuses = {1: "Pending", 2: "Cancelled", 3: "Rented", 4: "Completed"};
  const [status, Setstatus] = useState(1);
  Object.entries(statuses).forEach(([key, value]) => console.log(key, value));
  return (
    <div className="my-booking">
      <div className="status-bar">
        {/* {Object.entries(statuses).forEach(([key, value]) => (
          <div className="status">{key}</div>
        ))} */}
        <div className="status selected">Cancelled</div>
        <div className="status">Cancelled</div>
        <div className="status">Cancelled</div>
      </div>
      <div className="booking-container">
        <div className="booking">
          <div className="img-test"></div>
          <div className="booking-info">
            <h2>Lorem</h2>
            <h3>Ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse sed
              blanditiis sapiente perferendis nihil voluptas eaque sunt,
              explicabo aperiam possimus similique atque voluptatibus eius
              expedita provident, amet excepturi eveniet nesciunt?
            </p>
          </div>
        </div>
        <div className="booking">
          <div className="img-test"></div>
          <div className="booking-info">
            <h2>Lorem</h2>
            <h3>Ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse sed
              blanditiis sapiente perferendis nihil voluptas eaque sunt,
              explicabo aperiam possimus similique atque voluptatibus eius
              expedita provident, amet excepturi eveniet nesciunt?
            </p>
          </div>
        </div>
        <div className="booking">
          <div className="img-test"></div>
          <div className="booking-info">
            <h2>Lorem</h2>
            <h3>Ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse sed
              blanditiis sapiente perferendis nihil voluptas eaque sunt,
              explicabo aperiam possimus similique atque voluptatibus eius
              expedita provident, amet excepturi eveniet nesciunt?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyBooking;
