import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileSearchBar from "./ProfileSearchBar";
import ProfileStatusTab from "./ProfileStatusTab";
import Script from "react-load-script";
import Config from "../assets/configs/configs.json";
import ConfirmModal from "./ConfirmModal";
import {dateDisplay} from "../utils/dateDisplay";
let OmiseCard;

const MyBooking = () => {
  const statuses = ["All", "Pending", "Cancelled", "Rented", "Completed"];
  const [status, setStatus] = useState("All");
  const [bookings, setBookings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest date");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  const searchRef = useRef();

  function handleCancelBooking(car_id, match_id) {
    setSelectedBooking({car_id, match_id});
    setShowModal(true);
  }
  const filters = ["newest date", "oldest date"];

  const fetchMyBooking = async () => {
    try {
      setIsLoading(true);
      const id = localStorage.getItem("user_id");
      const statusList = [];
      if (status === "Pending") {
        statusList.push("Wait for payment");
        statusList.push("Unverified renter");
      } else if (status !== "All") {
        statusList.push(status);
      }
      const res = await axios.get(`${Config.BACKEND_URL}/match/me/${id}`, {
        params: {
          ...(status !== "All"
            ? {
                status: encodeURIComponent(JSON.stringify(statusList)),
              }
            : {}),
          sortBy,
          search: searchRef.current.value,
        },
        withCredentials: true,
      });
      setBookings(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async () => {
    const {car_id, match_id} = selectedBooking;
    try {
      await axios.patch(
        `${Config.BACKEND_URL}/match/cancel-reservation`,
        {},
        {
          headers: {
            match_id: match_id,
          },
          withCredentials: true,
        }
      );
      setShowModal(false);
      fetchMyBooking();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchMyBooking();
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
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

  const omiseCardHandler = async (amount, match_id, lessorID) => {
    OmiseCard.open({
      amount: amount,
      onCreateTokenSuccess: async (token) => {
        try {
          const id = localStorage.getItem("user_id");
          const username = localStorage.getItem("username");
          await axios.post(
            `${Config.BACKEND_URL}/payment/charge/${id}`,
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
          );
          await axios.post(
            `${Config.BACKEND_URL}/payment/transfer/${lessorID}`,
            {
              amount: amount,
              sender: username,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          await axios.patch(
            `${Config.BACKEND_URL}/match/status`,
            {
              match_id: match_id,
              action: "Paid",
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          await axios.post(
            `${Config.BACKEND_URL}/chat`,
            {
              allowedUsers: [id, lessorID],
              matchID: match_id,
            },
            {
              withCredentials: true,
            }
          );

          await axios.post(
            `${Config.BACKEND_URL}/notification`,
            {
              notification: {
                text: `Payment success! You can chat with your rental now.`,
                userID: localStorage.getItem("user_id"),
              },
            },
            {
              withCredentials: true,
            }
          );

          navigate(`../chat`);
        } catch (error) {
          console.error(error);
        }
      },
      onFormClosed: () => {},
    });
  };

  const purchaseBooking = async (e, amount, matchId, lessorID) => {
    if (scriptLoaded) {
      e.preventDefault();
      omiseCardHandler(amount * 100, matchId, lessorID);
    }
  };

  const rateBooking = async (car_id, match_id) => {
    window.location.assign(`/addReview/?matchID=${match_id}`);
  };

  useEffect(() => {
    fetchMyBooking();
  }, [status, sortBy]);

  return (
    <div className="my-booking">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <ProfileStatusTab
        statusList={statuses}
        status={status}
        setStatus={setStatus}
      />
      <ProfileSearchBar
        searchRef={searchRef}
        handleSearch={handleSearch}
        sortBy={sortBy}
        sortByList={filters}
        handleSortBy={handleSortBy}
      />
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
              lessorID,
              price,
            } = match;
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
                  <p>{`Pickup : ${dateDisplay(
                    pickUpDateTime
                  )} at ${pickupLocation}`}</p>
                  <p>{`Return : ${dateDisplay(
                    returnDateTime
                  )} at ${returnLocation}`}</p>
                  <div className="footer">
                    {(status === "Unverified renter" ||
                      status === "Wait for payment") && (
                      <h3
                        className="cancel btn"
                        onClick={() => handleCancelBooking(car_id, match_id)}
                      >
                        ✖ Cancel booking
                      </h3>
                    )}
                    {status === "Wait for payment" && (
                      <h3
                        className="pay btn"
                        onClick={(e) =>
                          purchaseBooking(e, price, match_id, lessorID)
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
                    <h3 className="price">{`${price} THB`}</h3>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <ConfirmModal
        showModalSignal={showModal}
        setModalSignal={setShowModal}
        header={"Are you sure?"}
        message={"This process can not be undone."}
        onPickLeft={() => setShowModal(false)}
        onPickRight={() => cancelBooking()}
        leftTxt={"Continue Booking"}
        leftColor={"white"}
        leftBGColor={"#aeb3ab"}
        disableLeft={false}
        rightTxt={"Cancel Booking"}
        rightColor={"white"}
        rightBGColor={"#ea4335"}
        disableRight={false}
        enableClickOutside={true}
      />
    </div>
  );
};
export default MyBooking;
