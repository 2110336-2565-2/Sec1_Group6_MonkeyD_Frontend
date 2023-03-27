import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {checkLogin} from "../utils/auth";
import useOutsideClick from "../hooks/useOutsideClick";

const Navbar = () => {
  const [navbarInfo, setNavbarInfo] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const ref = useOutsideClick(() => setOpenDropdown(false));

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

    // alert(res.data);
    window.location.assign("/");
  };

  const handleRegisterLessor = async () => {
    window.location.assign("/lessorRegister");
  };

  const handleAddCar = () => {
    window.location.assign("/addCar");
  };
  const handleMyBooking = () => {
    window.location.assign("/mybooking");
  };

  const handleBeAnAdmin = async () => {
    const user_id = sessionStorage.getItem("user_id");
    try {
      await axios.patch(`http://localhost:8080/user/update-role-admin`, {
        headers: {
          user_id: user_id,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNavbar = async () => {
      const result = await checkLogin();
      if (result) {
        try {
          const res = await axios.get(`http://localhost:8080/user/navbar`, {
            headers: {
              user_id: sessionStorage.getItem("user_id"),
            },
            withCredentials: true,
          }); // change path to backend service
          setNavbarInfo(res.data.user);
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
                  src={navbarInfo.image}
                  alt=""
                  style={openDropdown ? {opacity: 0.5} : {}}
                  onClick={toggleDropdown}
                />
                {openDropdown && (
                  <div className="dropdown">
                    <ul role="menu" className="menu">
                      <li className="menu-item">
                        <Link
                          to="/profile"
                          className="link"
                          onClick={toggleDropdown}
                        >
                          My profile
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/profile?menu=booking"
                          className="link"
                          onClick={toggleDropdown}
                        >
                          My booking
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/profile?menu=car"
                          className="link"
                          onClick={toggleDropdown}
                        >
                          My cars
                        </Link>
                      </li>
                      {navbarInfo.isLessor ? (
                        <li className="menu-item" onClick={handleAddCar}>
                          Add your car
                        </li>
                      ) : (
                        <li
                          className="menu-item"
                          onClick={handleRegisterLessor}
                        >
                          Be a lessor
                        </li>
                      )}
                      {navbarInfo.isAdmin ? (
                        <>
                          <li className="menu-item" onClick={handleAddCar}>
                            Approval management
                          </li>
                          <li className="menu-item" onClick={handleAddCar}>
                            Matches management
                          </li>
                        </>
                      ) : (
                        <li className="menu-item" onClick={handleBeAnAdmin}>
                          Be an admin
                        </li>
                      )}
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
