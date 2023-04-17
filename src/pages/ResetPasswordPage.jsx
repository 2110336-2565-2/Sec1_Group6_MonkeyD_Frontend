import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Config from "../assets/configs/configs.json";

const ResetPasswordPage = () => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `${Config.BACKEND_URL}/user/reset-password`,
        {
          token: token,
          password: password,
        }
      );

      if (response.status === 200) {
        setMessage("Your password is reset!");
        window.location.assign("/");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "password") setPassword(event.target.value);
    if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.replace("/404Notfound"); // replace this with the URL of your 404 page
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      setMessage("");
    }
  }, [password, confirmPassword, token]);

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Reset Password</button>
        </form>
        {message && <p className="error">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
