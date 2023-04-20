import React, {useState, useEffect} from "react";
import axios from "axios";
import Config from "../assets/configs/configs.json";

const MatchCar = ({carId, brand, model, price}) => {
  const [carMatch, setCarMatch] = useState([]);

  const dateDisplay = (dateInput) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day >= 10 ? day : "0" + day}/${
      month >= 10 ? month : "0" + month
    }/${year}`;
    //  ${hour >= 10 ? hour : "0" + hour}:${
    //   minute >= 10 ? minute : "0" + minute
    // }`;
    return formattedDate;
  };

  const reversePrice = (total) => {
    const day = total / price;
    return day;
  };

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const baseUrl = `${Config.BACKEND_URL}/match`;
        const userId = sessionStorage.getItem("user_id");
        const res = await axios.get(
          `${baseUrl}/?lessorID=${userId}&carID=${carId}`,
          {
            withCredentials: true,
          }
        );
        setCarMatch(res.data.matches);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatch();
  }, []);

  return (
    <div className="matchcar-container">
      <h2>
        {brand} {model}
      </h2>
      {carMatch.map((match) => (
        <div className="match-container" key={match._id}>
          <div className="one-line-wrapper">
            <div className="head">Status:</div>
            <div>{match.status}</div>
          </div>
          <div>
            <div className="head">Pick-up and Drop-off</div>
            <div className="two-column">
              <div className="date-wrapper">
                <div className="date-time">
                  {dateDisplay(match.pickUpDateTime)}
                </div>
                <div className="location">{match.pickupLocation}</div>
              </div>
              <div>
                <div className="date-time">
                  {dateDisplay(match.returnDateTime)}
                </div>
                <div className="location">{match.returnLocation}</div>
              </div>
            </div>
          </div>
          <div className="one-line-wrapper">
            <div className="head">Price:</div>
            <div>
              ฿ {match.price} (Price for {reversePrice(match.price)}{" "}
              {reversePrice(match.price) > 1 ? "days" : "day"})
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchCar;
