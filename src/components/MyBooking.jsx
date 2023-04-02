import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Script from "react-load-script";
import Config from "../assets/configs/configs.json";
let OmiseCard;

const MyBooking = () => {
  // const statuses = {1: "Pending", 2: "Cancelled", 3: "Rented", 4: "Completed"};
  const statuses = ["All", "Pending", "Cancelled", "Rented", "Completed"];
  const [status, setStatus] = useState("All");
  const [bookings, setBookings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const navigate = useNavigate();

  const calculatePrice = (firstDate, secondDate, rate) => {
    return Math.round(
      Math.abs((firstDate - secondDate) / (24 * 60 * 60 * 1000)) * rate
    );
  };

  const fetchMyBooking = async () => {
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

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: Config.OMISE_PUBLIC_KEY,
      currency: "THB",
      frameLabel: "Monkey Car Rent",
      submitLabel: "Pay Now",
      buttonLabel: "Pay with Omise",
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    setScriptLoaded(true);
  };

  const omiseCardHandler = async (amount) => {
    OmiseCard.open({
      amount: amount,
      onCreateTokenSuccess: (token) => {
        const id = sessionStorage.getItem("user_id");
        const username = sessionStorage.getItem("username");
        axios
          .post(
            `http://localhost:8080/payment/charge/${id}`,
            {
              description: username,
              amount: amount,
              cardToken: token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            // change some status of match here
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      onFormClosed: () => {},
    });
  };

  const purchaseBooking = async (e, amount) => {
    if (scriptLoaded) {
      e.preventDefault();
      omiseCardHandler(amount * 100);
    }
  };

  const rateBooking = async (car_id, match_id) => {
    window.location.assign(`/addReview/?matchID=${match_id}`);
  };

  useEffect(() => {
    fetchMyBooking();
    // setIsLoading(false);
  }, [status, setStatus]);

  return (
    <div className="my-booking">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
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
        {isLoading || bookings?.count === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          bookings?.matches.map((match, index) => {
            if (match.car == null) {
              return <></>;
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
                        onClick={(e) =>
                          purchaseBooking(
                            e,
                            calculatePrice(pickupDate, returnDate, rental_price)
                          )
                        }
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
