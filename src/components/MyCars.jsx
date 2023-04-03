import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import UnavailableDatesMap from "./DatesMap";
import CarDetails from "./ModalCarDetail";
import {provinces} from "../utils/mockData";

const MyCars = () => {
  const modalRef = useRef();
  const [selectedCarIndex, setSelectedCarIndex] = useState(-1);
  const [isChecked, setIsChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [status, setStatus] = useState();
  const [cars, setCars] = useState([]);
  const [filterProvince, setFilterProvince] = useState(null);
  const [sortOption, setSortOption] = useState(null);

  const handleFilterChange = (event) => {
    setFilterProvince(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    setStatus(status === "Unavailable" ? "Available" : "Unavailable");
    var newCar = cars[selectedCarIndex];
    newCar.status = status === "Unavailable" ? "Available" : "Unavailable";
    handleSave(newCar);
  };

  const generateSelectBox = (labelText, optionsText) => {
    return (
      <select>
        <option value="" disabled selected hidden>
          {labelText}
        </option>
        {optionsText.map((option, index) => (
          <option key={index} value={`option${index}`}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const handleSave = async (car) => {
    try {
      await axios.patch(`http://localhost:8080/car/change-car-info`, car, {
        headers: {
          car_id: car._id,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCarClick = (index) => {
    setIsChecked(
      cars[index].status === "Unavailable" ? "Unavailable" : "Available"
    );
    setStatus(cars[index].status);
    setSelectedCarIndex(index);
  };

  const handleClickOutsideModal = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      event.target.id !== "inModal"
    ) {
      setSelectedCarIndex(-1);
    }
  };

  useEffect(() => {
    console.log("fetch");
    const fetchCars = async () => {
      const username = sessionStorage.getItem("username");
      try {
        const res = await axios.post(
          `http://localhost:8080/car/me/${username}`,
          {province: filterProvince, sortBy: sortOption},
          {withCredentials: true}
        );
        res.data.map((each) => {
          if (!each.unavailable_times) {
            each.unavailable_times = [
              {
                start: "2023-08-22T17:00:00.000Z",
                end: "2023-08-24T17:00:00.000Z",
                username: "perm",
              },
              {
                start: "2023-08-25T17:00:00.000Z",
                end: "2023-08-26T17:00:00.000Z",
                username: "perm",
              },
            ];
          }
        });

        setCars(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();

    window.addEventListener("click", handleClickOutsideModal);
    return () => {
      window.removeEventListener("click", handleClickOutsideModal);
    };
  }, [filterProvince, sortOption]);

  return (
    <div className="mycars">
      <div className="filter-box">
        <div className="filter">
          <p>Filter : </p>
          <div className="group">
            <select onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                choose one
              </option>
              {provinces.map((province, index) => (
                <option key={index} value={province.value}>
                  {province.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="sort">
          <p>Sort : </p>
          <div className="group">
            <select onChange={handleSortChange}>
              <option value="" disabled selected hidden>
                choose one
              </option>
              <option value="highest rating">highest rating</option>
              <option value="lowest rating">lowest rating</option>
              <option value="highest price">highest price</option>
              <option value="lowest price">lowest price</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      {selectedCarIndex !== -1 ? <div className="background"></div> : <></>}
      <div className="mycars-container" ref={modalRef}>
        {cars.map((car, index) => {
          return (
            <div key={index}>
              <div className="car" onClick={() => handleCarClick(index)}>
                <div className="img-section">
                  <img src={car.car_image} alt="" />
                </div>
                <div className="detail-section">
                  <h3>
                    {car.brand} {car.model}
                  </h3>
                  <p>
                    rating : <span>{car.rating}</span>
                  </p>
                  <p>
                    location : <span>{car.available_location}</span>
                  </p>
                  <p>
                    ongoing rented : <span>{car.unavailable_times.length}</span>
                  </p>
                  <p>
                    rentedOutCount : <span>{car.rentedOutCount}</span>
                  </p>
                  <p>
                    price : <span>฿ {car.rental_price}</span>
                  </p>
                </div>
                <div className="status-section">
                  <h3>{car.status}</h3>
                </div>
              </div>
              {selectedCarIndex === index && (
                <div className="car-modal">
                  <button
                    className="calendar-btn"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    {showCalendar ? "Hide Calendar" : "Show Calendar"}{" "}
                    <i class="fa-regular fa-calendar"></i>
                  </button>
                  {showCalendar ? (
                    <UnavailableDatesMap
                      unavailableTimes={car.unavailable_times}
                    />
                  ) : (
                    <div className="modal-detail">
                      <h2>
                        {car.brand} {car.model}
                      </h2>
                      <div className="detail">
                        <CarDetails handleSave={handleSave} modalCar={car} />
                      </div>
                      {(car.status === "Unavailable" ||
                        car.status === "Available") && (
                        <div className="status-box">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={status !== "Unavailable"}
                              onChange={toggleSwitch}
                            />
                            <span className="slider round"></span>
                          </label>
                          <h3>{status}</h3>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyCars;
