import axios from "axios";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import MyBooking from "../components/MyBooking";
import MyProfile from "../components/MyProfile";
import MyCars from "../components/MyCars";
import UserApprovalMgmt from "../components/UserApprovalMgmt";
import CarApprovalMgmt from "../components/CarApprovalMgmt";
import MatchMgmt from "../components/MatchMgmt";
import PaymentHistory from "../components/PaymentHistory";

const ProfilePage = () => {
  const userMenus = {
    me: "My profile",
    // lessor: "Be a lessor",
    booking: "My booking",
    car: "My cars",
    payment: "Payment History",
  };

  const adminMenus = {
    user_approval_management: "User approval management",
    car_approval_management: "Car approval management",
    match_management: "Match management",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [menu, setMenu] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
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
          isAdmin,
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

        setIsAdmin(isAdmin);
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
      !(
        searchParams.get("menu") in userMenus ||
        (isAdmin && searchParams.get("menu") in adminMenus)
      )
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
            {Object.keys(userMenus).map((key) => {
              return (
                <button
                  value={key}
                  key={`${key}-${userMenus[key]}`}
                  className={key === menu ? "selected" : ""}
                  onClick={changeParamsMenu}
                >
                  {userMenus[key]}
                </button>
              );
            })}
            {isAdmin &&
              Object.keys(adminMenus).map((key) => {
                return (
                  <button
                    value={key}
                    key={`${key}-${adminMenus[key]}`}
                    className={key === menu ? "selected" : ""}
                    onClick={changeParamsMenu}
                  >
                    {adminMenus[key]}
                  </button>
                );
              })}
            <button onClick={changeParamsMenu}>Log out</button>
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
            {menu === "payment" && <PaymentHistory />}
            {menu === "user_approval_management" && <UserApprovalMgmt />}
            {menu === "car_approval_management" && <CarApprovalMgmt />}
            {menu === "match_management" && <MatchMgmt />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
