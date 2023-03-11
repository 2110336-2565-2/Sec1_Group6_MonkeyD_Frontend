import axios from "axios";
import {useEffect, useState} from "react";
import MyProfile from "../components/MyProfile";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});

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
            <button>My profile</button>
            <button>Be a lessor</button>
            <button>My booking</button>
            <button>Log out</button>
          </div>
        </div>
        <div className="content">
          <div className="card">
            <MyProfile userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
