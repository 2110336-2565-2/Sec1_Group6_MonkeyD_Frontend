import React, {useState, useRef} from "react";
import axios from "axios";

const LessorRegisterationPage = () => {
  const [formValidate, setFormValidate] = useState(true);
  const prefix = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const mobileNumber = useRef("");
  const drivingLicense = useRef("");
  const identificationNumber = useRef("");

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
    if (
      prefixCheck ||
      firstNameCheck ||
      lastNameCheck ||
      mobileNumberCheck ||
      drivingLicenseCheck ||
      identificationNumberCheck
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
      try {
        await axios.patch(
          `http://localhost:8080/user/update-role`,
          {
            prefix: prefix.current.value,
            first_name: firstName.current.value,
            last_name: lastName.current.value,
            mobile_number: mobileNumber.current.value,
            driving_license: drivingLicense.current.value,
            identification_number: identificationNumber.current.value,
          },
          {
            headers: {
              user_id: sessionStorage.getItem("user_id"),
            },
            withCredentials: true,
          }
        ); // change path to backend service
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      window.location.assign("/");
    }
    console.log(formValidate);
  };

  return (
    <div className="lessor-registeration">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="head-title">Be a Lessor</div>
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
          <input type="text" ref={firstName} placeholder="Somchai" required />
        </div>
        <div className="row-input">
          <label>Last Name: </label>
          <input type="text" ref={lastName} placeholder="Jaiyen" required />
        </div>
        <div className="row-input">
          <label>Mobile Number: </label>
          <input
            type="number"
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
            ref={identificationNumber}
            placeholder="3210123456789"
            pattern="[0-9]{13}"
            required
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
