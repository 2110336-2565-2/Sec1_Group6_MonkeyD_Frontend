import React, {useState, useEffect} from "react";
import axios from "axios";
import Config from "../assets/configs/configs.json";
import {useForm} from "react-hook-form";

const Signin = ({signin, signup}) => {
  const resetForm = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [form, setForm] = useState(resetForm);
  const [error, setError] = useState(resetForm);
  const [resError, setResError] = useState("");
  const [linkGoogle, setGoogleUrl] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({mode: "all"});

  const fetchUserInfo = async (user_id) => {
    try {
      const id = user_id;
      const res = await axios.post(
        `${Config.BACKEND_URL}/user/info`,
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
            `${Config.BACKEND_URL}/notification`,
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
    const {email, password} = event
    const data = {user: {username: email.split("@")[0], email, password}};

    try {
      await axios.post(`${Config.BACKEND_URL}/user`, data);
      window.location.assign("/");
    } catch (error) {
      console.error(error);
      handleShowResError(error.response.data.error);
    }
  };

  const handleSignIn = async (event) => {
    const {email, password} = event
    const data = {user: {email, password}};

    try {
      const res = await axios.post(`${Config.BACKEND_URL}/user/login`, data, {
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
  };

  const handleShowResError = (text) => {
    setResError(text);
    setTimeout(() => {
      setResError("");
    }, 3000);
  };

  useEffect(() => {
    setGoogleUrl(`${Config.BACKEND_URL}/auth/google`);
  }, []);
  
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>{signup ? "Create New Account" : "Sign in"}</h2>
        <form
          onSubmit={handleSubmit(signup ? handleSignUp : handleSignIn)}
          className="signin-form"
        >
          <label>Email address</label>
          <input
            type="email"
            className={errors.email ? "error-validate" : ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email?.message && (
            <span className="error">{errors.email?.message}</span>
          )}
          <label>Password</label>
          <input
            type="password"
            className={errors.password ? "error-validate" : ""}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: signup ? 8 : 0,
                message: "Password required 8 characters",
              },
            })}
          />
          {errors.password?.message && (
            <span className="error">{errors.password?.message}</span>
          )}
          {signup && (
            <>
              <label>Confirm password</label>
              <input
                type="password"
                className={errors.confirmPassword ? "error-validate" : ""}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Passwords do not match";
                    }
                  },
                })}
              />
              {errors.confirmPassword?.message && (
                <span className="error">{errors.confirmPassword?.message}</span>
              )}
            </>
          )}
          <div className="option-login">
            {/* <label>
              <input
                type="checkbox"
                // checked={isChecked}
                // onChange={handleCheckboxChange}
              />
              <p>Remember me</p>
            </label> */}
            <a href="/forgotPassword">Forgot password?</a>
          </div>
          <button type="submit">{signup ? "Get Started" : "Sign in"}</button>
          {resError && <span className="error">{resError}</span>}
        </form>
        <div className="divider">
          <hr />
          <p>or</p>
          <hr />
        </div>
        <a href={linkGoogle} className="btn-google">
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
