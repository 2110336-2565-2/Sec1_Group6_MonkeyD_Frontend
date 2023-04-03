import React, {useState, useEffect} from "react";

const CarDetails = ({modalCar, handleSave}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedCar, setUpdatedCar] = useState(modalCar);
  const [car, setCar] = useState(modalCar);
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUpdatedCar({...updatedCar, [name]: value});
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  const handleSaveButtonClick = () => {
    handleSave(updatedCar);
    setEditMode(false);
    setCar(updatedCar);
  };

  const handleCancelButtonClick = () => {
    setUpdatedCar(car);
    setEditMode(false);
  };

  return (
    <div className={editMode ? "modal-car-detail" : "modal-car-detail v2"}>
      <p>
        <span className="topic">Available Location : </span>
        {editMode ? (
          <input
            type="text"
            name="available_location"
            value={updatedCar.available_location}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.available_location}</span>
        )}
      </p>
      <p>
        <span className="topic">Rental Price per Day : </span>
        {editMode ? (
          <input
            type="number"
            name="rental_price"
            value={updatedCar.rental_price}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">฿ {car.rental_price}</span>
        )}
      </p>
      <p>
        <span className="topic">Status : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="status"
            value={updatedCar.status}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.status}</span>
        )}
      </p>
      <p>
        <span className="topic">Energy Types : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="energy_types"
            value={updatedCar.energy_types.join(", ")}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.energy_types.join(", ")}</span>
        )}
      </p>
      <p>
        <span className="topic">Rating : </span>
        {editMode ? (
          <input
            disabled
            //type="number"
            name="rating"
            value={car.reviewCount ? car.rating.toFixed(2) : "No review"}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">
            {car.reviewCount ? car.rating.toFixed(2) : "No review"}
          </span>
        )}
      </p>
      <p>
        <span className="topic">Rented Out Count : </span>
        {editMode ? (
          <input
            disabled
            type="number"
            name="rentedOutCount"
            value={updatedCar.rentedOutCount}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.rentedOutCount}</span>
        )}
      </p>
      <p>
        <span className="topic">Brand : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="brand"
            value={updatedCar.brand}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.brand}</span>
        )}
      </p>
      <p>
        <span className="topic">Model : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="model"
            value={updatedCar.model}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.model}</span>
        )}
      </p>
      <p>
        <span className="topic">Gear Type : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="gear_type"
            value={updatedCar.gear_type}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.gear_type}</span>
        )}
      </p>

      <p>
        <span className="topic">Passenger : </span>
        {editMode ? (
          <input
            disabled
            type="number"
            name="passenger"
            value={updatedCar.passenger}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.passenger}</span>
        )}
      </p>

      {editMode ? (
        <div className="btn">
          <button
            className="btn-edit"
            id="inModal"
            onClick={handleSaveButtonClick}
          >
            Save
          </button>
          <button
            className="btn-edit"
            id="inModal"
            onClick={handleCancelButtonClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="btn btn-edit"
          id="inModal"
          onClick={handleEditButtonClick}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default CarDetails;
