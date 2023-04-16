import React, {useState} from "react";
import axios from "axios";

const Signin = ({signin, signup}) => {
  const resetForm = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [form, setForm] = useState(resetForm);
  const [error, setError] = useState(resetForm);
  const [resError, setResError] = useState("");

  const handleChange = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    validateForm(event);
  };

  const validateForm = (event) => {
    let {name, value} = event.target;
    setError((prev) => {
      const stateObj = {...prev, [name]: ""};
      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter email.";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            stateObj[name] = "Invalid email address";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (form.confirmPassword && value !== form.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = form.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (form.password && value !== form.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
    console.log(error);
  };

  const fetchUserInfo = async (user_id) => {
    try {
      const id = user_id;
      const res = await axios.post(
        `http://localhost:8080/user/info`,
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );

      const {firstName, lastName, IDCardNumber, drivingLicenseNumber} =
        res.data;

      if (!firstName || !lastName || !IDCardNumber || !drivingLicenseNumber) {
        try {
          await axios.post(
            `http://localhost:8080/notification`,
            {
              notification: {
                text: `Please fill your personal information`,
                userID: user_id,
              },
            },
            {
              withCredentials: true,
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (JSON.stringify(error) !== JSON.stringify(resetForm)) {
      return;
    }
    const {email, password} = form;
    const data = {user: {username: email.split("@")[0], email, password}};

    try {
      await axios.post(`http://localhost:8080/user`, data);
      window.location.assign("/");
    } catch (error) {
      console.error(error);
      handleShowResError(error.response.data.error);
    }

    // setForm(resetForm);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (JSON.stringify(error) !== JSON.stringify(resetForm)) {
      return;
    }
    const {email, password} = form;
    const data = {user: {email, password}};

    try {
      const res = await axios.post(`http://localhost:8080/user/login`, data, {
        withCredentials: true,
      });
      const user_id = res.headers.user_id;
      const username = res.headers.username;
      sessionStorage.setItem("user_id", user_id);
      sessionStorage.setItem("username", username);
      await fetchUserInfo(user_id);

      window.location.assign("/");
    } catch (error) {
      console.error(error);
      handleShowResError(error.response.data.error);
    }

    // setForm(resetForm);
  };

  const handleShowResError = (text) => {
    setResError(text);
    setTimeout(() => {
      setResError("");
    }, 3000);
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>{signup ? "Create New Account" : "Sign in"}</h2>
        <form
          onSubmit={signup ? handleSignUp : handleSignIn}
          className="signin-form"
        >
          <label>Email address</label>
          <input
            // type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={validateForm}
            className={error.email ? "error-validate" : ""}
            required
          />
          {error.email && <span className="error">{error.email}</span>}
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={validateForm}
            required
          />
          {error.password && <span className="error">{error.password}</span>}
          {signup && (
            <>
              <label>Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={validateForm}
                required
              />
              {error.confirmPassword && (
                <span className="error">{error.confirmPassword}</span>
              )}
            </>
          )}
          <div className="option-login">
            <label>
              <input
                type="checkbox"
                // checked={isChecked}
                // onChange={handleCheckboxChange}
              />
              <p>Remember me</p>
            </label>
            <a href="/forgotPassword">Forgot password?</a>
          </div>
          <button type="submit" disabled={form === resetForm}>
            {signup ? "Get Started" : "Sign in"}
          </button>
          {resError && <span className="error">{resError}</span>}
        </form>
        <div className="divider">
          <hr />
          <p>or</p>
          <hr />
        </div>
        <a href="http://localhost:8080/auth/google" class="btn-google">
          <img
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt="Google logo"
          />
          <span>Continue with Google</span>
        </a>
      </div>
    </div>
  );
};

export default Signin;
