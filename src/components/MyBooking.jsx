import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const MyBooking = () => {
  const statuses = {1: "Pending", 2: "Cancelled", 3: "Rented", 4: "Completed"};
  const [status, setStatus] = useState(1);
  const [bookings, setBookings] = useState({});
  const navigate = useNavigate();

  const calculatePrice = (firstDate, secondDate, rate) => {
    return Math.round(
      Math.abs((firstDate - secondDate) / (24 * 60 * 60 * 1000)) * rate
    );
  };

  useEffect(() => {
    const fetchMyBooking = async () => {
      try {
        const id = sessionStorage.getItem("user_id");
        const res = await axios.get(`http://localhost:8080/match/me/${id}`, {
          withCredentials: true,
        });
        setBookings(res.data.matches);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyBooking();
  }, []);

  return (
    <div className="my-booking">
      <div className="status-bar">
        {Object.keys(statuses).map((key) => {
          return (
            <div
              key={`${key}-${statuses[key]}`}
              className={key == status ? "status selected" : "status"}
              onClick={() => setStatus(key)}
            >
              {statuses[key]}
            </div>
          );
        })}
      </div>
      <div className="booking-container">
        {bookings &&
          Object.keys(bookings).map((key, index) => {
            const {
              car: {
                _id,
                brand,
                model,
                license_plate,
                rental_price,
                car_images: [pic],
              },
              pickUpDateTime,
              pickupLocation,
              returnDateTime,
              returnLocation,
              status,
            } = bookings?.[key];
            const pickupDate = new Date(pickUpDateTime);
            const returnDate = new Date(returnDateTime);
            return (
              <div
                className="booking"
                key={`${key}-${index}`}
                onClick={() => navigate(`/carDetail/${_id}`)}
              >
                <img className="car-picture" src={pic} />
                <div className="booking-info">
                  <div className="header">
                    <h2>{`${brand} ${model}`}</h2>
                    <h3>{status}</h3>
                  </div>
                  <h3>{`${license_plate}`}</h3>
                  <p>{`Pickup : ${pickupDate.toLocaleString()} at ${pickupLocation}`}</p>
                  <p>{`Return : ${returnDate.toLocaleString()} at ${returnLocation}`}</p>
                  <h3 className="price">{`${calculatePrice(
                    pickupDate,
                    returnDate,
                    rental_price
                  )} THB`}</h3>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default MyBooking;
