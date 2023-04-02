import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileSearchBar from "./ProfileSearchBar";
import ProfileStatusTab from "./ProfileStatusTab";

const MyBooking = () => {
  // const statuses = {1: "Pending", 2: "Cancelled", 3: "Rented", 4: "Completed"};
  const statuses = ["All", "Pending", "Cancelled", "Rented", "Completed"];
  const [status, setStatus] = useState("All");
  // const [sortBy, setSortBy] = useState({sort: "Date", opt: "asd"});
  const [bookings, setBookings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const searchRef = useRef();

  const calculatePrice = (firstDate, secondDate, rate) => {
    return Math.round(
      Math.abs((firstDate - secondDate) / (24 * 60 * 60 * 1000)) * rate
    );
  };

  const fetchMyBooking = async () => {
    const params = {
      ...(status !== "All" && {
        status: status,
      }),
      search: searchRef.current.value,
    };

    try {
      setIsLoading(true);
      const id = sessionStorage.getItem("user_id");
      const statusList = [];
      if (status === "Pending") {
        statusList.push("Wait for payment");
        statusList.push("Unverified renter");
      } else if (status !== "All") {
        statusList.push(status);
      }
      const res = await axios.get(`http://localhost:8080/match/me/${id}`, {
        params: {
          ...(status !== "All"
            ? {
                status: encodeURIComponent(JSON.stringify(statusList)),
              }
            : {}),
        },
        withCredentials: true,
      });
      setBookings(res.data);
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

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchMyBooking();
  };

  const purchaseBooking = async (car_id, match_id) => {
    try {
      // await axios.patch(
      //   `http://localhost:8080/match/cancel-reservation`,
      //   {},
      //   {
      //     headers: {
      //       car_id: car_id,
      //       match_id: match_id,
      //     },
      //     withCredentials: true,
      //   }
      // );
    } catch (error) {
      console.log(error);
    }
    fetchMyBooking();
  };

  const rateBooking = async (car_id, match_id) => {
    window.location.assign(`/addReview/?matchID=${match_id}`);
  };

  useEffect(() => {
    fetchMyBooking();
  }, [status]);

  return (
    <div className="my-booking">
      <ProfileStatusTab statusList={statuses} status={status} setStatus={setStatus} />
      <ProfileSearchBar searchRef={searchRef} handleSearch={handleSearch} />
      <div className="booking-container">
        {isLoading || bookings?.count === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          bookings?.matches.map((match, index) => {
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
                //car_images: [pic],
              },
              car_image,
              _id: match_id,
              pickUpDateTime,
              pickupLocation,
              returnDateTime,
              returnLocation,
              status,
              isReview,
            } = match;
            const pickupDate = new Date(pickUpDateTime);
            const returnDate = new Date(returnDateTime);
            return (
              <div className="booking" key={index}>
                <img
                  className="car-picture"
                  src={car_image}
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
                    {(status === "Unverified renter" ||
                      status === "Wait for payment") && (
                      <h3
                        className="cancel btn"
                        onClick={() => cancelBooking(car_id, match_id)}
                      >
                        ✖ Cancel booking
                      </h3>
                    )}
                    {status === "Wait for payment" && (
                      <h3
                        className="pay btn"
                        onClick={() => purchaseBooking(car_id, match_id)}
                      >
                        ✓ Pay now
                      </h3>
                    )}
                    {isReview}
                    {status === "Completed" && isReview == false && (
                      <h3
                        className="rate btn"
                        onClick={() => rateBooking(car_id, match_id)}
                      >
                        <i class="fa-regular fa-comment"></i> Rate booking
                      </h3>
                    )}
                    <h3 className="price">{`${calculatePrice(
                      pickupDate,
                      returnDate,
                      rental_price
                    )} THB`}</h3>
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
export default MyBooking;
