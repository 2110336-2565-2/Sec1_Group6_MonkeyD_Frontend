import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import AddReviewBox from "../components/AddReviewBox";

const PaymentPage = () => {
  const [passCheck, setPassCheck] = useState(false);
  const [renterID, setRenterID] = useState("");
  const [carID, setCarID] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const carInfoTemplate = {
    brand: "",
    model: "",
    license_plate: "",
  };
  const [carInfo, setCarInfo] = useState(carInfoTemplate);
  const [price, setPrice] = useState();

  const [resError, setResError] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matchID = searchParams.get("matchID");
  //const matchID = "640ec3cc2fa14a837d8cb31d";
  useEffect(() => {
    const checkMatch = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/match/${matchID}`, {
          withCredentials: true,
        });
        const renterID = res.data.match.renterID;
        const isReview = res.data.match.isReview;
        const status = res.data.match.status;
        if (
          sessionStorage.getItem("user_id") !== renterID ||
          status !== "Wait for payment"
        ) {
          //window.location.assign("/404");
        } else {
          const car = res.data.match.car;
          const pickUpDateTime = new Date(
            res.data.match.pickUpDateTime
          ).toLocaleDateString("en-GB");
          const returnDateTime = new Date(
            res.data.match.returnDateTime
          ).toLocaleDateString("en-GB");
          setPassCheck(true);
          setRenterID(renterID);
          setCarID(car._id);
          setCarInfo(car);
          setPrice(res.data.match.price);
          setPickUpDate(pickUpDateTime);
          setReturnDate(returnDateTime);
        }
      } catch (error) {
        // window.location.assign("/404");
        //console.error(error);
      }
    };
    checkMatch();
  }, []);
  const handleSubmit = async (event) => {
    if (!passCheck) return;
    // const data = {
    //   review: {
    //     hygeine: hygiene,
    //     carCondition: carConditon,
    //     service: service,
    //     comment: comment,
    //     matchID: matchID,
    //     carID: carID,
    //     reviewerID: renterID,
    //   },
    // };
    // try {
    //   const res = await axios.post(`http://localhost:8080/review`, data, {
    //     withCredentials: true,
    //   });

    //   window.location.assign("/");
    // } catch (error) {
    //   if (error.response.data.error === "match ID already exists") {
    //     setResError("You already rate this rental");
    //   }
    //   console.log("error", error.response.data.error);
    // }
  };
  return (
    <div className="payment-page">
      <div className="wrap-all">
        <h2 className="title">Payment</h2>
        <hr />
        <div className="car-info">
          <h3>Brand & Model:</h3>
          <h3>
            {carInfo.brand} {carInfo.model}
          </h3>
          <h3>License Plate:</h3>
          <h3>{carInfo.license_plate}</h3>
          <h3>Rental Period:</h3>
          <h3>
            {pickUpDate} - {returnDate}
          </h3>
          <h3>Price:</h3>
          <h3>{price} Baht</h3>
        </div>
        <hr />
        <div className="car-info">
          <h3>Payment Method:</h3>
          <select
            className="payment-method"
            name="method"
            id="method"
            default="Wallet" /*onChange={handleChange}*/
          >
            <option>Wallet</option>
            <option>Credit/Debit Card</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        {resError && <span className="error">{resError}</span>}
      </div>
    </div>
  );
};

export default PaymentPage;
