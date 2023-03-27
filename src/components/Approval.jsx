import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Approval = () => {
  const statuses = ["All", "Pending", "Rejected", "Accepted"];
  const [status, setStatus] = useState("All");
  const [approvals, setapprovals] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyBooking = async () => {
    try {
      setIsLoading(true);
      const id = sessionStorage.getItem("user_id");
      const res = await axios.get(`http://localhost:8080/match/me/${id}`, {
        params: {
          ...(status !== "All"
            ? {
                status: status,
              }
            : {}),
        },
        withCredentials: true,
      });
      setapprovals(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (car_id, match_id) => {
    try {
      await axios.patch(
        `http://localhost:8080/match/cancel-reservation`,
        {},
        {
          headers: {
            car_id: car_id,
            match_id: match_id,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
    fetchMyBooking();
  };

  useEffect(() => {
    fetchMyBooking();
    // setIsLoading(false);
  }, [status, setStatus]);

  return (
    <div className="approval-container">
      <div className="status-bar">
        {statuses &&
          statuses.map((item, i) => {
            return (
              <div
                key={item}
                className={item == status ? "status selected" : "status"}
                onClick={() => setStatus(item)}
              >
                {item}
              </div>
            );
          })}
      </div>
      <div className="booking-container">
        {isLoading || approvals?.count === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          approvals?.matches.map((match, index) => {
            if (match.car == null) {
              return;
            }
            const {
              car: {
                _id: car_id,
                brand,
                model,
                license_plate,
                rental_price,
                car_images: [pic],
              },
              _id: match_id,
              pickUpDateTime,
              pickupLocation,
              returnDateTime,
              returnLocation,
              status,
            } = match;
            const pickupDate = new Date(pickUpDateTime);
            const returnDate = new Date(returnDateTime);
            return (
              <div className="booking" key={index}>
                <img
                  className="car-picture"
                  src={pic}
                  alt=""
                  onClick={() => navigate(`/carDetail/${car_id}`)}
                />
                <div className="booking-info">
                  <div className="header">
                    <h2
                      onClick={() => navigate(`/carDetail/${car_id}`)}
                    >{`${brand} ${model}`}</h2>
                    <h3
                      className={status === "Cancelled" ? "status-cancel" : ""}
                    >
                      {status}
                    </h3>
                  </div>
                  <h3>{`${license_plate}`}</h3>
                  <p>{`Pickup : ${pickupDate.toLocaleString()} at ${pickupLocation}`}</p>
                  <p>{`Return : ${returnDate.toLocaleString()} at ${returnLocation}`}</p>
                  <div className="footer">
                    {status === "Pending" && (
                      <h3
                        className="cancel"
                        onClick={() => cancelBooking(car_id, match_id)}
                      >
                        ✖ Cancel booking
                      </h3>
                    )}
                    <h3 className="price">12345</h3>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Approval;
