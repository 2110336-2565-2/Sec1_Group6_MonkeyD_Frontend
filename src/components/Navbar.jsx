import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {checkLogin} from "../utils/auth";
import useOutsideClick from "../hooks/useOutsideClick";
import Notification from "../components/Notification";
import Config from "../assets/configs/configs.json";

const Navbar = () => {
  const [navbarInfo, setNavbarInfo] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [allNotificationsRead, setAllNotificationsRead] = useState(true);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const toggleOpenNotification = async () => {
    setOpenNotification(!openNotification);
    if (openNotification) {
      const id = sessionStorage.getItem("user_id");
      try {
        // readNotifications
        await axios.patch(
          `${Config.BACKEND_URL}/notification/?userID=${id}`,
          {},
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error(error);
      }

      setAllNotificationsRead(true);
    }
  };

  const ref = useOutsideClick(() => setOpenDropdown(false));
  const notioutsideClick = useOutsideClick(() => setOpenNotification(false));

  const handleLogout = async () => {
    sessionStorage.clear();
    await axios.post(
      `${Config.BACKEND_URL}/user/logout`,
      {
        cookie_name: "auth",
      },
      {
        withCredentials: true,
      }
    ); // change path to backend service

    // alert(res.data);
    // window.location.assign("/");
  };

  const handleRegisterLessor = async () => {
    window.location.assign("/lessorRegister");
  };

  const handleAddCar = () => {
    window.location.assign("/addCar");
  };

  const handleBeAnAdmin = async () => {
    const user_id = sessionStorage.getItem("user_id");
    try {
      await axios.patch(
        `${Config.BACKEND_URL}/user/update-role-admin`,
        {},
        {
          headers: {
            user_id: user_id,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
    window.location.reload(false);
  };

  useEffect(() => {
    const fetchNavbar = async () => {
      const result = await checkLogin();
      if (result) {
        try {
          const res = await axios.get(`${Config.BACKEND_URL}/user/navbar`, {
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

  useEffect(() => {
    // getNotifications;
    const getNotifications = async () => {
      try {
        const id = sessionStorage.getItem("user_id");
        const res = await axios.get(
          `${Config.BACKEND_URL}/notification/?userID=${id}&date=2023-04-02T10:52:47.185`,
          {
            withCredentials: true,
          }
        );
        setNotificationList(res.data.notifications);

        for (const notification of res.data.notifications) {
          const isRead = notification.isRead;
          if (!isRead) {
            setAllNotificationsRead(false);
            break;
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getNotifications();
  }, [allNotificationsRead]);

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
          <Link to="/chat" className="content">
            MESSAGE
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
                      {(navbarInfo.role === "renter" ||
                        navbarInfo.role === "lessor") && (
                        <li className="menu-item">
                          <Link
                            to="/profile?menu=booking"
                            className="link"
                            onClick={toggleDropdown}
                          >
                            My booking
                          </Link>
                        </li>
                      )}
                      {navbarInfo.role === "lessor" && (
                        <li className="menu-item">
                          <Link
                            to="/profile?menu=car"
                            className="link"
                            onClick={toggleDropdown}
                          >
                            My cars
                          </Link>
                        </li>
                      )}
                      {navbarInfo.role === "lessor" && (
                        <li className="menu-item" onClick={handleAddCar}>
                          Add your car
                        </li>
                      )}
                      {navbarInfo.role === "renter" && (
                        <li
                          className="menu-item"
                          onClick={handleRegisterLessor}
                        >
                          Be a lessor
                        </li>
                      )}

                      {navbarInfo.role === "admin" ? (
                        <>
                          <li className="menu-item">
                            <Link
                              to="/profile?menu=user_approval_management"
                              className="link"
                              onClick={toggleDropdown}
                            >
                              User Approval
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link
                              to="/profile?menu=car_approval_management"
                              className="link"
                              onClick={toggleDropdown}
                            >
                              Car Approval
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link
                              to="/profile?menu=match_management"
                              className="link"
                              onClick={toggleDropdown}
                            >
                              Match Approval
                            </Link>
                          </li>
                        </>
                      ) : (
                        <></>
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
        <div
          className={openNotification ? "bell-noti open" : "bell-noti"}
          ref={notioutsideClick}
        >
          <i
            className={
              allNotificationsRead
                ? "fa-solid fa-bell"
                : "fa-solid fa-bell fa-shake"
            }
            onClick={toggleOpenNotification}
          />
          {openNotification && (
            <Notification
              notifications={notificationList}
              close={setOpenNotification}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
