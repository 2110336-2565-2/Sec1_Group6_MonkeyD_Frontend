import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {checkLogin} from "../utils/auth";

const Navbar = () => {
  const [navbarInfo, setNavbarInfo] = useState(null);

  const handleLogout = async () => {
    sessionStorage.clear();
    const res = await axios.post(
      `http://localhost:8080/user/logout`,
      {
        cookie_name: "auth",
      },
      {
        withCredentials: true,
      }
    ); // change path to backend service

    alert(res.data);
    window.location.assign("/");
  };

  useEffect(() => {
    const fetchNavbar = async () => {
      const result = await checkLogin();
      if (result.isLogin) {
        console.log(result.isLogin);
        try {
          const res = await axios.get(`http://localhost:8080/user/navbar`, {
            headers: {
              user_id: sessionStorage.getItem("user_id"),
            },
            withCredentials: true,
          }); // change path to backend service
          setNavbarInfo(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchNavbar();
  }, []);
  return (
    <div className="navbar-container">
      <img
        src={require("../assets/images/logo.png")}
        alt="logo"
        className="logo"
      />
      <div className="content-container">
        <nav>
          <Link to="/" className="content">
            HOME
          </Link>
          <Link to="/" className="content">
            FIND CAR
          </Link>
          <Link to="/about" className="content">
            ABOUT US
          </Link>
          <button className="content">CONTACT US</button>
          {navbarInfo ? (
            <>
              <div onClick={() => handleLogout()} className="profile">
                <img src={navbarInfo.user.image} alt="" />
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="content">
                Sign in
              </Link>
              <Link to="/signup" className="signup content">
                Create Account
              </Link>
            </>
          )}
        </nav>
        <i className="fa-regular fa-bell"></i>
      </div>
    </div>
  );
};

export default Navbar;
