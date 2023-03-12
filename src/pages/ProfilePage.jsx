import axios from "axios";
import {useEffect, useState} from "react";
import MyBooking from "../components/MyBooking";
import MyProfile from "../components/MyProfile";

const ProfilePage = () => {
  const [menus, setMenus] = useState({
    1: "My profile",
    3: "My booking",
    4: "My Cars",
    5: "Logout",
  });
  const [userInfo, setUserInfo] = useState({});
  const [menuId, setMenuId] = useState(1);

  useEffect(() => {
    const id = sessionStorage.getItem("user_id");
    const fetchLessor = async () => {
      const res = await axios.post(
        `http://localhost:8080/user/role`,
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.userRole !== "lessor") {
        var newMenus = menus;
        newMenus[2] = "Be a lessor";
        setMenus(newMenus);
      }
    };
    const fetchUserInfo = async () => {
      try {
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
    fetchLessor();
  }, []);

  const handleMenuClick = (key) => {
    if (key === 2) {
      window.location.assign("/lessorRegister");
    } else {
      setMenuId(key);
    }
  };

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
              key = Number(key);
              return (
                <button
                  value={key}
                  key={`${key}-${menus[key]}`}
                  className={key === menuId ? "selected" : ""}
                  onClick={() => handleMenuClick(key)}
                >
                  {menus[key]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="card">
            {menuId === 1 && (
              <MyProfile userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
            {menuId === 3 && <MyBooking />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
