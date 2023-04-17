import React, {useState, useRef} from "react";
import axios from "axios";
import Config from "../assets/configs/configs.json";

const ForgotPasswordPage = () => {
  const [message, setMessage] = useState("");
  const email = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailValue = email.current.value;
    if (!email) {
      setMessage("Please enter email.");
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) {
      // make api to check if this email is in database (optional)
      setMessage("Invalid email address");
      return;
    }
    try {
      const response = await axios.post(
        `${Config.BACKEND_URL}/user/forgot-password`,
        {
          email: emailValue,
        }
      );
      if (response.status === 200) {
        setMessage("The link is sent!");
      }
      window.location.assign("/");
    } catch (error) {
      setMessage("Use the registered email address.");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Forgot Password?</h2>
        <p>Reset your password with email address</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" ref={email} required />
          {message && <p className="error">{message}</p>}
          <button type="submit">send link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
