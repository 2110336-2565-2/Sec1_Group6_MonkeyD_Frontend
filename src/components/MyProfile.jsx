import axios from "axios";
import { useState } from "react";

const MyProfile = ({userInfo, setUserInfo}) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
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
                    disabled={
                      key === "username" || key === "email" || key === "image"
                    }
                  />
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