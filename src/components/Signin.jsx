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
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (JSON.stringify(error) !== JSON.stringify(resetForm)) {
      return;
    }
    const {email, password} = form;
    const data = {user: {username: email.split("@")[0], email, password}};

    try {
      const res = await axios.post(`http://localhost:8080/user`, data);
      console.log(res);
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
    console.log(data);

    try {
      const res = await axios.post(`http://localhost:8080/user/login`, data);
      console.log(res);
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
              />
              {error.confirmPassword && (
                <span className="error">{error.confirmPassword}</span>
              )}
            </>
          )}
          <button type="submit">{signup ? "Get Started" : "Sign in"}</button>
          {resError && <span className="error">{resError}</span>}
        </form>
        {/* <div className="social-links">
            <p>Or register using:</p>
        </div> */}
      </div>
    </div>
  );
};

export default Signin;
