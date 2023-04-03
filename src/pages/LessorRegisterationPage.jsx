import React, {useState, useRef} from "react";
import axios from "axios";

const errorForm = {
  prefix: "",
  firstName: "",
  lastName: "",
  mobileNumber: "",
  drivingLicense: "",
  IDCardNumber: "",
  drivingLicenseImg: "",
  IDCardImg: "",
};

const LessorRegisterationPage = () => {
  const [formValidate, setFormValidate] = useState(true);
  const [error, setError] = useState(errorForm);
  const prefix = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const mobileNumber = useRef("");
  const drivingLicense = useRef("");
  const identificationNumber = useRef("");
  const [IDCardImg, setIDCardImg] = useState();
  const [drivingLicenseImg, setDrivingLicenseImg] = useState();

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
    const prefixCheck = prefix.current.value === "";
    const firstNameCheck = firstName.current.value === "";
    const lastNameCheck = lastName.current.value === "";
    const mobileNumberCheck =
      mobileNumber.current.value.toString().length !== 10;
    const drivingLicenseCheck =
      drivingLicense.current.value.toString().length !== 8;
    const identificationNumberCheck =
      identificationNumber.current.value.toString().length !== 13;
    const idCardImg = document.querySelector("#idcardimg").files[0];
    const drivingLicenseImg =
      document.querySelector("#drivinglicenseimg").files[0];

    if (
      prefixCheck ||
      firstNameCheck ||
      lastNameCheck ||
      mobileNumberCheck ||
      drivingLicenseCheck ||
      identificationNumberCheck ||
      !idCardImg ||
      !drivingLicenseImg
    ) {
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
      const formData = new FormData();
      formData.append("prefix", prefix.current.value);
      formData.append("first_name", firstName.current.value);
      formData.append("last_name", lastName.current.value);
      formData.append("mobile_number", mobileNumber.current.value);
      formData.append("driving_license", drivingLicense.current.value);
      formData.append(
        "identification_number",
        identificationNumber.current.value
      );

      const drivingLicenseImage =
        document.querySelector("#drivinglicenseimg").files[0];
      formData.append("drivingLicenseImage", drivingLicenseImage);

      const IDCardImage = document.querySelector("#idcardimg").files[0];
      formData.append("IDCardImage", IDCardImage);

      // updateRoleLessor
      try {
        await axios.patch(`http://localhost:8080/user/update-role`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            user_id: sessionStorage.getItem("user_id"),
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

  return (
    <div className="lessor-registeration">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="head-title">Be a Lessor</h2>
        <div className="row-input">
          <label>Prefix: </label>
          <div>
            <select name="prefix" ref={prefix}>
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
            ref={firstName}
            placeholder="Somchai"
            required
          />
        </div>
        <div className="row-input">
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            ref={lastName}
            placeholder="Jaiyen"
            required
          />
        </div>
        <div className="row-input">
          <label>Mobile Number: </label>
          <input
            type="number"
            name="mobileNumber"
            ref={mobileNumber}
            placeholder="1234567890"
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div className="row-input">
          <label>Driving License: </label>
          <input
            type="number"
            name="drivingLicense"
            ref={drivingLicense}
            placeholder="87654321"
            pattern="[0-9]{8}"
            required
          />
        </div>
        <div className="row-input">
          <label>Identification Number: </label>
          <input
            type="number"
            name="IDCardNumber"
            ref={identificationNumber}
            placeholder="3210123456789"
            pattern="[0-9]{13}"
            required
          />
        </div>
        <div className="row-input">
          <label>ID Card Image: </label>
          <input
            type="file"
            id="idcardimg"
            name="IDCardImg"
            onBlur={validateImage}
            onChange={handleImage}
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        <div className="row-input">
          <label>Driving License Image: </label>
          <input
            type="file"
            id="drivinglicenseimg"
            name="drivingLicenseImg"
            onBlur={validateImage}
            onChange={handleImage}
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        {formValidate ? (
          ""
        ) : (
          <div className="validate-false">
            Please correct the fields in right pattern.
          </div>
        )}
        <div className="submit-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LessorRegisterationPage;
