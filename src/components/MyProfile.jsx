import axios from "axios";
import {useState} from "react";
import Config from "../assets/configs/configs.json";

const MyProfile = ({
  isEdit,
  setIsEdit,
  userInfo,
  setUserInfo,
  imageFile,
  fetchUserInfo,
}) => {
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    console.log("====================================");
    console.log(name, value);
    console.log("====================================");
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const submitUserInfo = async () => {
    try {
      const id = sessionStorage.getItem("user_id");
      const formData = new FormData();
      formData.append("id", id);

      for (const [key, value] of Object.entries(userInfo)) {
        formData.append(key, value);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }
      await axios.patch(`${Config.BACKEND_URL}/user/info`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toggleIsEdit();
      fetchUserInfo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-profile">
      <div className="header">
        <h2>My profile</h2>
        <button onClick={isEdit ? submitUserInfo : toggleIsEdit}>
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
      <div className="info-container">
        {userInfo &&
          Object.keys(userInfo).map((key, index) => {
            if (key === "image") return null;
            return (
              <div className="text" key={`${key}`}>
                <h5 className="label">{key}</h5>
                {isEdit ? (
                  key === "prefix" ? (
                    <select
                      id={`${key}`}
                      name={`${key}`}
                      value={userInfo[key]}
                      onChange={handleChange}
                    >
                      {[
                        "not set",
                        "Mr.",
                        "Mrs.",
                        "Miss",
                        "Ms.",
                        "(Not Specific)",
                      ].map((each, index) => (
                        <option key={index} value={each}>
                          {each}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`${key}`}
                      name={`${key}`}
                      className=""
                      value={userInfo[key]}
                      onChange={handleChange}
                      disabled={
                        key === "username" ||
                        key === "email" ||
                        key === "image" ||
                        key === "role"
                      }
                    />
                  )
                ) : (
                  <h5 className="value">{userInfo[key]}</h5>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyProfile;
