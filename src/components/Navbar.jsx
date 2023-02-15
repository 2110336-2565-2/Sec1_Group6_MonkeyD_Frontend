import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {checkLogin} from "../utils/auth";
import useOutsideClick from "../hooks/useOutsideClick";

const Navbar = () => {
  const [navbarInfo, setNavbarInfo] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const ref = useOutsideClick(() => setOpenDropdown(false));
  // const ref = useOutsideClick(() => {});

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
              <div className="profile" ref={ref}>
                <img
                  src={navbarInfo.user.image}
                  alt=""
                  style={openDropdown ? {opacity: 0.5} : {}}
                  onClick={() => {
                    setOpenDropdown(!openDropdown);
                  }}
                />
                {openDropdown && (
                  <div className="dropdown">
                    <ul role="menu" className="menu">
                      <li className="menu-item">My profile</li>
                      <li className="menu-item">My booking</li>
                      <li className="menu-item">Be a lessor</li>
                      <li className="menu-item" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
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
