import React from "react";
import Signin from "../components/Signin";

const SigninPage = ({signin, signup}) => {
  return signin ? (
    <div className="signin-page-container">
      <Signin signin />
    </div>
  ) : (
    <div className="signin-page-container">
      <Signin signup />
    </div>
  );
};

export default SigninPage;
