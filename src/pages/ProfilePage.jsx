import axios from "axios";
import {useEffect, useState} from "react";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    console.log(event);
    const {name, value} = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const submitUserInfo = async () => {
    try {
      const id = sessionStorage.getItem("user_id");
      const res = await axios.patch(
        `http://localhost:8080/user/info`,
        {
          id: id,
          ...userInfo,
        },
        {
          withCredentials: true,
        }
      );
      console.log("55");
      toggleIsEdit();
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className="profilepage-container">
      <div className="profile-container">
        <div className="content">
          <div className="profile card">
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
          <div className="detail card">
            <div className="header">
              <h2>My profile</h2>
              <button onClick={isEdit ? submitUserInfo : toggleIsEdit}>
                {isEdit ? "Save" : "Edit"}
              </button>
            </div>
            <div className="info-container">
              {userInfo &&
                Object.keys(userInfo).map((key, index) => {
                  return (
                    <div className="text" key={`${key}`}>
                      <h5>{key}</h5>
                      {isEdit ? (
                        <input
                          id={`${key}`}
                          name={`${key}`}
                          className=""
                          value={userInfo[key]}
                          onChange={handleChange}
                          disabled={key === "username" || key === "email" || key === "image"}
                        />
                      ) : (
                        <h5 className="value">{userInfo[key]}</h5>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
