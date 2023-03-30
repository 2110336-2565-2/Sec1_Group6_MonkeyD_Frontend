import React, {useState, useRef} from "react";
import axios from "axios";

const ModalCarRent = ({
  user_info,
  set_show_modal,
  location,
  owner_id,
  car_id,
  rental_price,
}) => {
  const [formValidate, setFormValidate] = useState(true);
  const prefix = useRef(user_info.prefix);
  const firstName = useRef(user_info.firstName);
  const lastName = useRef(user_info.lastName);
  const mobileNumber = useRef(user_info.phoneNumber);
  const drivingLicense = useRef(user_info.drivingLicenseNumber);
  const identificationNumber = useRef(user_info.IDCardNumber);
  const startDateInput = useRef(null);
  const endDateInput = useRef(null);

  const calPrice = () => {
    const amountDayRent =
      (new Date(endDateInput.current.value).getTime() -
        new Date(startDateInput.current.value).getTime()) /
      (24 * 60 * 60 * 1000);
    return amountDayRent * rental_price;
  };

  const validatationCheck = () => {
    const start = new Date(startDateInput.current.value).getTime();
    const end = new Date(endDateInput.current.value).getTime();
    const today = new Date().setHours(0, 0, 0, 0);
    const period = start - end;
    const presentperiodstart = start - today;

    const presentperiodend = end - today;
    const prefixCheck = prefix.current.value === "";
    const firstNameCheck = firstName.current.value === "";
    const lastNameCheck = lastName.current.value === "";
    const mobileNumberCheck =
      mobileNumber.current.value.toString().length !== 10;
    const drivingLicenseCheck =
      drivingLicense.current.value.toString().length !== 8;
    const identificationNumberCheck =
      identificationNumber.current.value.toString().length !== 13;
    const dateFillCheck = period || period >= 0;
    const startpresentCheck = presentperiodstart && presentperiodstart >= 0;
    const endpresentCheck = presentperiodend && presentperiodend >= 0;
    if (
      prefixCheck ||
      firstNameCheck ||
      lastNameCheck ||
      mobileNumberCheck ||
      drivingLicenseCheck ||
      identificationNumberCheck ||
      !dateFillCheck ||
      !startpresentCheck ||
      !endpresentCheck
    ) {
      // console.log(
      //   prefixCheck,
      //   firstNameCheck,
      //   lastNameCheck,
      //   mobileNumberCheck,
      //   drivingLicenseCheck,
      //   identificationNumberCheck,
      //   !dateFillCheck,
      //   !startpresentCheck,
      //   !endpresentCheck
      // );

      setFormValidate(false);
      return false;
    } else {
      setFormValidate(true);
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validatationCheck()) {
      // createMatch
      try {
        await axios.post(
          `http://localhost:8080/match`,
          {
            match: {
              carID: car_id,
              lessorID: sessionStorage.getItem("user_id"),
              renterID: owner_id,
              status: "Pending",
              pickupLocation: location,
              pickUpDateTime: new Date(startDateInput.current.value),
              returnLocation: location,
              returnDateTime: new Date(endDateInput.current.value),
              price: calPrice(),
            },
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error(error);
      }

      // toggleRented
      try {
        await axios.patch(
          `http://localhost:8080/car`,
          {
            pickUpDateTime: new Date(startDateInput.current.value),
            returnDateTime: new Date(endDateInput.current.value),
          },
          {
            headers: {
              car_id: car_id,
              renter_id: sessionStorage.getItem("user_id"),
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error(error);
      }

      // carRented
      try {
        await axios.patch(
          `http://localhost:8080/user`,
          {
            prefix: prefix.current.value,
            first_name: firstName.current.value,
            last_name: lastName.current.value,
            phone_number: mobileNumber.current.value,
            driving_license: drivingLicense.current.value,
            identification_number: identificationNumber.current.value,
          },
          {
            headers: {
              lessor_id: owner_id,
              renter_id: sessionStorage.getItem("user_id"),
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error(error);
      }
      window.location.assign("/");
    }
  };

  const emptyCheck = (data) => {
    if (data.toString().length === 0) return false;
    return true;
  };

  return (
    <div onSubmit={handleSubmit} className="modal-container">
      <form className="register-form">
        <div className="head-title">Car Rented</div>
        <div className="row-input">
          <label>Prefix: </label>
          <div>
            <select
              name="prefix"
              ref={prefix}
              defaultValue={user_info.prefix}
              disabled={emptyCheck(user_info.prefix)}
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
        </div>
        <div className="row-input">
          <label>First Name: </label>
          <input
            type="text"
            ref={firstName}
            defaultValue={user_info.firstName}
            placeholder="Somchai"
            required
            disabled={emptyCheck(user_info.firstName)}
          />
        </div>
        <div className="row-input">
          <label>Last Name: </label>
          <input
            type="text"
            ref={lastName}
            defaultValue={user_info.lastName}
            placeholder="Jaiyen"
            required
            disabled={emptyCheck(user_info.lastName)}
          />
        </div>
        <div className="row-input">
          <label>Mobile Number: </label>
          <input
            type="number"
            ref={mobileNumber}
            placeholder="1234567890"
            defaultValue={user_info.phoneNumber}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div className="row-input">
          <label>Driving License: </label>
          <input
            type="number"
            ref={drivingLicense}
            placeholder="87654321"
            defaultValue={user_info.drivingLicenseNumber}
            pattern="[0-9]{8}"
            required
            disabled={emptyCheck(user_info.drivingLicenseNumber)}
          />
        </div>
        <div className="row-input">
          <label>Identification Number: </label>
          <input
            type="number"
            ref={identificationNumber}
            placeholder="3210123456789"
            defaultValue={user_info.IDCardNumber}
            pattern="[0-9]{13}"
            required
            disabled={emptyCheck(user_info.IDCardNumber)}
          />
        </div>
        <div className="two-in-one">
          <div className="row-input">
            <label>Start Date:</label>
            <input defaultValue={new Date()} ref={startDateInput} type="date" />
          </div>
          <div className="row-input">
            <label>Return Date:</label>
            <input
              defaultValue={
                new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
              }
              ref={endDateInput}
              type="date"
            />
          </div>
        </div>
        <div className="two-in-one">
          <div className="row-input">
            <label>Pick Up Location: </label>
            <input type="text" value={location} disabled />
          </div>
          <div className="row-input">
            <label>Return Location: </label>
            <input type="text" value={location} disabled />
          </div>
        </div>
        {formValidate ? (
          ""
        ) : (
          <div className="validate-false">
            Please correct the fields or put the date and date not in the past.
          </div>
        )}
        <div className="submit-btn">
          <button type="submit">
            <i className="fa-sharp fa-solid fa-hand-holding-hand" />
            Rent
          </button>
        </div>
      </form>
      <div className="overlay" onClick={() => set_show_modal(false)}></div>
    </div>
  );
};

export default ModalCarRent;
