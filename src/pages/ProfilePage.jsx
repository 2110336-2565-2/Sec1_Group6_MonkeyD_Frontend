import axios from "axios";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import MyBooking from "../components/MyBooking";
import MyProfile from "../components/MyProfile";
import MyCars from "../components/MyCars";

const ProfilePage = () => {
  const menus = {
    me: "My profile",
    // lessor: "Be a lessor",
    booking: "My booking",
    car: "My cars",
    logout: "Logout",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [menu, setMenu] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const changeParamsMenu = (event) => {
    searchParams.set("menu", event.target.value);
    setSearchParams(searchParams);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInfo({
        ...userInfo,
        image: reader.result,
      });
    };

    if (file) {
      setImageFile(file); // Store the file object
      reader.readAsDataURL(file);
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

        const {
          username,
          email,
          prefix,
          firstName,
          lastName,
          phoneNumber,
          image,
          IDCardNumber,
          drivingLicenseNumber,
        } = res.data;

        const selectedUserInfo = {
          username,
          email,
          prefix,
          firstName,
          lastName,
          phoneNumber,
          image,
          IDCardNumber,
          drivingLicenseNumber,
        };

        setUserInfo(selectedUserInfo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (
      searchParams.get("menu") === null ||
      !(searchParams.get("menu") in menus)
    ) {
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
            {isEdit && (
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            )}
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
              <MyProfile
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                imageFile={imageFile}
              />
            )}
            {menu === "booking" && <MyBooking />}
            {menu === "car" && <MyCars />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
