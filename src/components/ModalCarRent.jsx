import React, {useState, useRef} from "react";
import axios from "axios";
import Config from "../assets/configs/configs.json";

const errorForm = {
  prefix: "",
  firstName: "",
  lastName: "",
  mobileNumber: "",
  drivingLicense: "",
  IDCardNumber: "",
  drivingLicenseImg: "",
  IDCardImg: "",
  startDate: "",
  returnDate: "",
  pickUpLocation: "",
  returnLocation: "",
};

const textCheck = (textInput) => {
  const regex = /^[A-z\u0E00-\u0E7F]+$/;
  return regex.test(textInput);
};

const numberCheck = (numInput, limit) => {
  const regex = /^[0-9\b]+$/;
  return numInput.toString().length <= limit && regex.test(numInput);
};

const ModalCarRent = ({
  user_info,
  set_show_modal,
  location,
  owner_id,
  car_id,
  rental_price,
}) => {
  const [formValidate, setFormValidate] = useState(true);
  const [error, setError] = useState(errorForm);
  const prefix = useRef(user_info.prefix);
  // const firstName = useRef(user_info.firstName);
  // const lastName = useRef(user_info.lastName);
  //const mobileNumber = useRef(user_info.phoneNumber);
  // const drivingLicense = useRef(user_info.drivingLicenseNumber);
  // const identificationNumber = useRef(user_info.IDCardNumber);
  const [firstName, setFirstName] = useState(user_info.firstName);
  const [lastName, setLastName] = useState(user_info.lastName);
  const [mobileNumber, setMobileNumber] = useState(user_info.mobileNumber);
  const [drivingLicense, setDrivingLicense] = useState(
    user_info.drivingLicenseNumber
  );
  const [identificationNumber, setIdentificationNumber] = useState(
    user_info.IDCardNumber
  );
  const startDateInput = useRef(null);
  const endDateInput = useRef(null);
  const [IDCardImg, setIDCardImg] = useState();
  const [drivingLicenseImg, setDrivingLicenseImg] = useState();
  const [errorText, setErrorText] = useState("");

  const calPrice = () => {
    const amountDayRent =
      (new Date(endDateInput.current.value).getTime() -
        new Date(startDateInput.current.value).getTime()) /
      (24 * 60 * 60 * 1000);
    return (amountDayRent + 1) * rental_price;
  };

  const handleImage = async (event) => {
    const {name, files} = event.target;
    if (name === "IDCardImg") {
      // console.log("upload id card image");
      // console.log(document.querySelector("#idcardimg").files[0]);
      setIDCardImg(URL.createObjectURL(files[0]));
    }
    if (name === "drivingLicenseImg") {
      // console.log("upload driver license image");
      // console.log(document.querySelector("#drivinglicenseimg").files);
      setDrivingLicenseImg(URL.createObjectURL(files[0]));
    }
    validateImage(event);
  };

  const validateImage = (event) => {
    let {name, files} = event.target;
    setError((prev) => {
      const stateObj = {...prev, [name]: ""};
      switch (name) {
        case "idcard_img":
          if (!IDCardImg && !files.length) {
            stateObj[name] = "Please insert your ID Card Image.";
          }
          break;

        case "drivinglicense_images":
          if (!drivingLicenseImg && !files.length) {
            stateObj[name] = "Please insert your Driving License Image.";
          }
          break;
        default:
          break;
      }

      return stateObj;
    });
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "firstName") {
      if (textCheck(value) || value === "") {
        setFirstName(value);
      }
      return;
    }
    if (name === "lastName") {
      if (textCheck(value) || value === "") {
        setLastName(value);
      }
      return;
    }
    if (name === "mobileNumber") {
      const limit = 10;
      if (numberCheck(value, limit) || value === "") {
        setMobileNumber(value);
      }
      return;
    }
    if (name === "drivingLicense") {
      const limit = 8;
      if (numberCheck(value, limit) || value === "") {
        setDrivingLicense(value);
      }
      return;
    }
    if (name === "IDCardNumber") {
      const limit = 13;
      if (numberCheck(value, limit) || value === "") {
        setIdentificationNumber(value);
      }
    }
    validateForm(event);
  };

  const validateForm = (event) => {
    let {name, value} = event.target;
    setError((prev) => {
      const stateObj = {...prev, [name]: ""};
      switch (name) {
        case "prefix":
          if (value === "not set") {
            stateObj[name] = "Please select prefix.";
          }
          break;

        case "firstName":
          if (!value) {
            stateObj[name] = "Please enter your first name.";
          }
          break;

        case "lastName":
          if (!value) {
            stateObj[name] = "Please enter your last name.";
          }
          break;

        case "mobileNumber":
          if (!value) {
            stateObj[name] = "Please enter your mobile number.";
          }
          break;

        case "drivingLicense":
          if (!value) {
            stateObj[name] = "Please enter the number of driving license";
          }
          break;

        case "IDCardNumber":
          if (!value) {
            stateObj[name] = "Please enter identification number.";
          }
          break;
        case "startDate":
          if (!value) {
            stateObj[name] = "Please select start date.";
          }
          break;

        case "returnDate":
          if (!value) {
            stateObj[name] = "Please enter return date.";
          }
          break;

        case "pickUpLocation":
          if (!value) {
            stateObj[name] = "Please enter pick up location";
          }
          break;

        case "returnLocation":
          if (!value) {
            stateObj[name] = "Please enter return location";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const validatationCheck = () => {
    const start = new Date(startDateInput.current.value).getTime();
    const end = new Date(endDateInput.current.value).getTime();
    const today = new Date().setHours(0, 0, 0, 0);
    const period = start - end;
    const presentperiodstart = start - today;
    const idCardImg = document.querySelector("#idcardimg")
      ? document.querySelector("#idcardimg").files[0]
      : "";
    const drivingLicenseImg = document.querySelector("#drivinglicenseimg")
      ? document.querySelector("#drivinglicenseimg").files[0]
      : "";

    const presentperiodend = end - today;
    const prefixCheck = prefix.current.value === "not set";
    const firstNameCheck = firstName === "";
    const lastNameCheck = lastName === "";
    const mobileNumberCheck = mobileNumber.toString().length !== 10;
    const drivingLicenseCheck = drivingLicense.toString().length !== 8;
    const identificationNumberCheck =
      identificationNumber.toString().length !== 13;
    const dateFillCheck = period || period >= 0;
    const startpresentCheck = presentperiodstart && presentperiodstart >= 0;
    const endpresentCheck = presentperiodend && presentperiodend >= 0;
    let errorList = [];

    if (prefixCheck) {
      errorList.push("Please select prefix");
    }
    if (firstNameCheck) {
      errorList.push("Please enter your first name");
    }
    if (lastNameCheck) {
      errorList.push("Please enter your last name");
    }
    if (mobileNumberCheck) {
      errorList.push("Please correct your mobile number");
    }
    if (drivingLicenseCheck) {
      errorList.push("Please correct the number of driving license");
    }
    if (identificationNumberCheck) {
      errorList.push("Please correct your identification number");
    }
    if (errorList.length !== 0) {
      let errorMessage = "";
      if (errorList.length === 1) {
        errorMessage = `${errorList[0]}.`;
      } else {
        for (let i = 0; i < errorList.length; i++) {
          if (i === errorList.length - 1) {
            errorMessage += `and ${errorList[i]}.`;
            break;
          }
          errorMessage += `${errorList[i]}, `;
        }
      }
      setErrorText(errorMessage);
      setFormValidate(false);
      return false;
    }

    setFormValidate(true);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validatationCheck()) {
      let apiError = false;
      let matchStatus = "";

      // getUserInfo
      try {
        const res = await axios.post(
          `${Config.BACKEND_URL}/user/info`,
          {
            id: localStorage.getItem("user_id"),
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.status === "Verified") {
          matchStatus = "Wait for payment";
        } else {
          matchStatus = "Unverified renter";
        }
      } catch (error) {
        apiError = true;
        console.error(error);
      }

      // car reserved
      try {
        await axios.patch(
          `${Config.BACKEND_URL}/car/reserve`,
          {
            match: {
              carID: car_id,
              lessorID: owner_id,
              renterID: localStorage.getItem("user_id"),
              status: matchStatus,
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
        apiError = true;
        console.error(error);
      }
      const formData = new FormData();
      formData.append("prefix", prefix.current.value);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phone_number", mobileNumber);
      formData.append("driving_license", drivingLicense);
      formData.append("identification_number", identificationNumber);

      if (document.querySelector("#drivinglicenseimg")) {
        const drivingLicenseImage =
          document.querySelector("#drivinglicenseimg").files[0];
        formData.append("drivingLicenseImage", drivingLicenseImage);
      }
      if (document.querySelector("#idcardimg")) {
        const IDCardImage = document.querySelector("#idcardimg").files[0];
        formData.append("IDCardImage", IDCardImage);
      }

      // carRented
      try {
        await axios.patch(`${Config.BACKEND_URL}/user`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            lessor_id: owner_id,
            renter_id: localStorage.getItem("user_id"),
          },
          withCredentials: true,
        });
      } catch (error) {
        apiError = true;
        console.error(error);
      }

      try {
        await axios.post(
          `${Config.BACKEND_URL}/notification`,
          {
            notification: {
              text: `${localStorage.getItem("username")} rented your car`,
              userID: owner_id,
            },
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        apiError = true;
        console.error(error);
      }

      if (!apiError) window.location.assign("/");
    }
  };

  const emptyCheck = (data) => {
    if (data.toString().length === 0 || data.toString() === "not set")
      return false;
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
              <option value="not set">not set</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Ms.">Ms.</option>
              <option value="(Not Specific)">{"(Not Specific)"}</option>
            </select>
          </div>
        </div>
        <div className="row-input">
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            //ref={firstName}
            //defaultValue={user_info.firstName}
            onChange={handleChange}
            value={firstName}
            placeholder="Somchai"
            required
            disabled={emptyCheck(user_info.firstName)}
          />
        </div>
        <div className="row-input">
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            // ref={lastName}
            // defaultValue={user_info.lastName}
            onChange={handleChange}
            value={lastName}
            placeholder="Jaiyen"
            required
            disabled={emptyCheck(user_info.lastName)}
          />
        </div>
        <div className="row-input">
          <label>Mobile Number: </label>
          <input
            type="text"
            name="mobileNumber"
            // ref={mobileNumber}
            onChange={handleChange}
            value={mobileNumber}
            placeholder="1234567890"
            // defaultValue={user_info.phoneNumber}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div className="row-input">
          <label>Driving License: </label>
          <input
            type="text"
            name="drivingLicense"
            // ref={drivingLicense}
            onChange={handleChange}
            value={drivingLicense}
            placeholder="87654321"
            // defaultValue={user_info.drivingLicenseNumber}
            pattern="[0-9]{8}"
            required
            disabled={emptyCheck(user_info.drivingLicenseNumber)}
          />
        </div>
        <div className="row-input">
          <label>Identification Number: </label>
          <input
            type="text"
            name="IDCardNumber"
            // ref={identificationNumber}
            onChange={handleChange}
            value={identificationNumber}
            placeholder="3210123456789"
            // defaultValue={user_info.IDCardNumber}
            pattern="[0-9]{13}"
            required
            disabled={emptyCheck(user_info.IDCardNumber)}
          />
        </div>
        {user_info.IDCardImage.toString().length === 0 ? (
          <div className="row-input">
            <label>ID Card Image: </label>
            <input
              type="file"
              id="idcardimg"
              name="IDCardImg"
              onBlur={validateImage}
              onChange={handleImage}
              accept="image/png, image/gif, image/jpeg"
              required
            />
          </div>
        ) : (
          <></>
        )}
        {user_info.drivingLicenseImage.toString().length === 0 ? (
          <div className="row-input">
            <label>Driving License Image: </label>
            <input
              type="file"
              id="drivinglicenseimg"
              name="drivingLicenseImg"
              onBlur={validateImage}
              onChange={handleImage}
              accept="image/png, image/gif, image/jpeg"
              required
            />
          </div>
        ) : (
          <></>
        )}
        <div className="two-in-one">
          <div className="row-input">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              disabled
              value={localStorage.getItem("startDate")}
              ref={startDateInput}
            />
          </div>
          <div className="row-input">
            <label>Return Date:</label>
            <input
              type="date"
              name="returnDate"
              disabled
              value={localStorage.getItem("endDate")}
              ref={endDateInput}
            />
          </div>
        </div>
        <div className="two-in-one">
          <div className="row-input">
            <label>Pick Up Location: </label>
            <input
              type="text"
              name="pickUpLocation"
              value={location}
              disabled
            />
          </div>
          <div className="row-input">
            <label>Return Location: </label>
            <input
              type="text"
              name="returnLocation"
              value={location}
              disabled
            />
          </div>
        </div>
        {formValidate ? "" : <div className="validate-false">{errorText}</div>}
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
