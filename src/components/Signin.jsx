import React, {useState} from "react";

const Signin = () => {
  const handleSignUp = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(`${email} ${password}`);

    event.target.reset();
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Create New Account</h2>
        <form onSubmit={handleSignUp} className="signin-form">
          <label>Email address</label>
          <input type="email" id="email" name="email" required />
          <label>Password</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Get Started</button>
        </form>
        {/* <div className="social-links">
            <p>Or register using:</p>
        </div> */}
      </div>
    </div>
  );
};

export default Signin;
