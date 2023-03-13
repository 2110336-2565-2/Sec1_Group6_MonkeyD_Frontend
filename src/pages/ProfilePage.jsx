import axios from "axios";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import MyBooking from "../components/MyBooking";
import MyProfile from "../components/MyProfile";

const ProfilePage = () => {
  const menus = {
    me: "My profile",
    lessor: "Be a lessor",
    booking: "My booking",
    logout: "Logout",
  };

  const [userInfo, setUserInfo] = useState({});
  const [menu, setMenu] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const changeParamsMenu = (event) => {
    searchParams.set("menu", event.target.value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const id = sessionStorage.getItem("user_id");
        const res = await axios.post(
          `http://localhost:8080/user/info`,
          {
            id: id,
          },
          {
            withCredentials: true,
          }
        );
        const filtered = Object.fromEntries(
          Object.entries(res.data).filter(
            ([key, val]) => typeof val === "string"
          )
        );
        setUserInfo(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (searchParams.get("menu") === null) {
      searchParams.set("menu", "me");
      setSearchParams(searchParams);
    }
    setMenu(searchParams.get("menu"));
  }, [searchParams, setSearchParams]);

  return (
    <div className="profilepage-container">
      <div className="profile-container">
        <div className="content">
          <div className="profile-tag card">
            <img className="profile-picture" src={userInfo.image} alt="" />
            <h3>{`${userInfo.firstName} ${userInfo.lastName}`}</h3>
            <p>{`@${userInfo.username}`}</p>
          </div>
          <div className="menu card">
            {Object.keys(menus).map((key) => {
              return (
                <button
                  value={key}
                  key={`${key}-${menus[key]}`}
                  className={key === menu ? "selected" : ""}
                  onClick={changeParamsMenu}
                >
                  {menus[key]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="card">
            {menu === "me" && (
              <MyProfile userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
            {menu === "booking" && <MyBooking />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
