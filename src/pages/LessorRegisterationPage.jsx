import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import Config from "../assets/configs/configs.json";

const errorForm = {
  prefix: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  drivingLicenseNumber: "",
  IDCardNumber: "",
  drivingLicenseImage: "",
  IDCardImage: "",
};

const numberCheck = (numInput, limit) => {
  const regex = /^[0-9\b]+$/;
  return numInput.toString().length <= limit && regex.test(numInput);
};

const LessorRegisterationPage = () => {
  const [formValidate, setFormValidate] = useState(true);
  const [error, setError] = useState(errorForm);
  //  prefix = useRef("");
  // const firstName = useRef("");
  // const lastName = useRef("");
  // const mobileNumber = useRef("");
  // const drivingLicense = useRef("");
  // const identificationNumber = useRef("");
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [IDCardImg, setIDCardImg] = useState();
  const [drivingLicenseImg, setDrivingLicenseImg] = useState();
  const [userInfo, setUserInfo] = useState(errorForm);
  const [errorText, setErrorText] = useState("");

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

  const validatationCheck = () => {
    const prefixCheck = prefix === "";
    const firstNameCheck = firstName === "";
    const lastNameCheck = lastName === "";
    const mobileNumberCheck = mobileNumber.toString().length !== 10;
    const drivingLicenseCheck = drivingLicense.toString().length !== 8;
    const identificationNumberCheck =
      identificationNumber.toString().length !== 13;
    const idCardImg = document.querySelector("#idcardimg").files[0];
    const drivingLicenseImg =
      document.querySelector("#drivinglicenseimg").files[0];

    let errorList = [];

    if (prefixCheck) {
      errorList.push("Please select prefix.");
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
      const formData = new FormData();
      formData.append("prefix", prefix);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("mobile_number", mobileNumber);
      formData.append("driving_license", drivingLicense);
      formData.append("identification_number", identificationNumber);

      const drivingLicenseImage =
        document.querySelector("#drivinglicenseimg").files[0];
      formData.append("drivingLicenseImage", drivingLicenseImage);

      const IDCardImage = document.querySelector("#idcardimg").files[0];
      formData.append("IDCardImage", IDCardImage);

      // updateRoleLessor
      try {
        await axios.patch(`${Config.BACKEND_URL}/user/update-role`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            user_id: localStorage.getItem("user_id"),
          },
          withCredentials: true,
        }); // change path to backend service
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      window.location.assign("/");
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "prefix") {
      setPrefix(value);
      return;
    }
    if (name === "firstName") {
      setFirstName(value);
      return;
    }
    if (name === "lastName") {
      setLastName(value);
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
  };

  const fetchUserInfo = async () => {
    try {
      const id = localStorage.getItem("user_id");
      const res = await axios.post(
        `${Config.BACKEND_URL}/user/info`,
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );

      const UserInfo = {
        ...res.data,
      };

      // console.log(UserInfo);

      setUserInfo(UserInfo);
      setPrefix(UserInfo.prefix);
      setFirstName(UserInfo.firstName);
      setLastName(UserInfo.lastName);
      setMobileNumber(UserInfo.phoneNumber);
      setDrivingLicense(UserInfo.drivingLicenseNumber);
      setIdentificationNumber(UserInfo.IDCardNumber);
      setDrivingLicenseImg(UserInfo.drivingLicenseImage);
      setIDCardImg(UserInfo.IDCardImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const emptyCheck = (data) => {
    if (data.toString().length === 0 || data === "not set") return false;
    return true;
  };

  return (
    <div className="lessor-registeration">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="head-title">Be a Lessor</h2>
        <div className="row-input">
          <label>Prefix: </label>
          <div>
            <select
              name="prefix"
              // ref={prefix}
              value={prefix}
              onChange={handleChange}
              // disabled={emptyCheck(userInfo.prefix)}
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
            name="firstName"
            // ref={firstName}
            value={firstName}
            onChange={handleChange}
            // disabled={emptyCheck(userInfo.firstName)}
            placeholder="Somchai"
            required
          />
        </div>
        <div className="row-input">
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            // ref={lastName}
            value={lastName}
            onChange={handleChange}
            // disabled={emptyCheck(userInfo.lastName)}
            placeholder="Jaiyen"
            required
          />
        </div>
        <div className="row-input">
          <label>Mobile Number: </label>
          <input
            type="number"
            name="mobileNumber"
            // ref={mobileNumber}
            value={mobileNumber}
            onChange={handleChange}
            // disabled={emptyCheck(userInfo.phoneNumber)}
            placeholder="1234567890"
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
            value={drivingLicense}
            onChange={handleChange}
            // disabled={emptyCheck(userInfo.drivingLicenseNumber)}
            placeholder="87654321"
            pattern="[0-9]{8}"
            required
          />
        </div>
        <div className="row-input">
          <label>Identification Number: </label>
          <input
            type="text"
            name="IDCardNumber"
            // ref={identificationNumber}
            value={identificationNumber}
            onChange={handleChange}
            // disabled={emptyCheck(userInfo.IDCardNumber)}
            placeholder="3210123456789"
            pattern="[0-9]{13}"
            required
          />
        </div>

        {!emptyCheck(userInfo.IDCardImage) ? (
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

        {!emptyCheck(userInfo.drivingLicenseImage) ? (
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

        {formValidate ? "" : <div className="validate-false">{errorText}</div>}
        <div className="submit-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LessorRegisterationPage;
