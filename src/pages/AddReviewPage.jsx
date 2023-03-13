import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import AddReviewBox from "../components/AddReviewBox";

const AddReviewPage = () => {
  const [hygiene, setHygiene] = useState(5);
  const [carConditon, setCarCondition] = useState(5);
  const [service, setService] = useState(5);
  const [comment, setComment] = useState("");

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
        if (sessionStorage.getItem("user_id") != renterID || isReview) {
          window.location.assign("/404");
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
          setPickUpDate(pickUpDateTime);
          setReturnDate(returnDateTime);
        }
      } catch (error) {
        window.location.assign("/404");
        //console.error(error);
      }
    };
    checkMatch();
  }, []);
  const handleSubmit = async (event) => {
    if (!passCheck) return;
    const data = {
      review: {
        hygeine: hygiene,
        carCondition: carConditon,
        service: service,
        comment: comment,
        matchID: matchID,
        carID: carID,
        reviewerID: renterID,
      },
    };
    try {
      const res = await axios.post(`http://localhost:8080/review`, data, {
        withCredentials: true,
      });

      window.location.assign("/");
    } catch (error) {
      if (error.response.data.error === "match ID already exists") {
        setResError("You already rate this rental");
      }
      console.log("error", error.response.data.error);
    }
  };
  return (
    <div className="add-review-page">
      <div className="wrap-all">
        <h2 className="title">Rate & Comment</h2>
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
        </div>
        <hr />
        <AddReviewBox
          hygiene={hygiene}
          setHygiene={setHygiene}
          carConditon={carConditon}
          setCarCondition={setCarCondition}
          service={service}
          setService={setService}
          comment={comment}
          setComment={setComment}
        />
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        {resError && <span className="error">{resError}</span>}
      </div>
    </div>
  );
};

export default AddReviewPage;
