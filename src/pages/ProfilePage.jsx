import axios from "axios";
import {useEffect, useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import MyBooking from "../components/MyBooking";
import MyProfile from "../components/MyProfile";
import MyCars from "../components/MyCars";
import UserApprovalMgmt from "../components/UserApprovalMgmt";
import CarApprovalMgmt from "../components/CarApprovalMgmt";
import MatchMgmt from "../components/MatchMgmt";
import PaymentHistory from "../components/PaymentHistory";
import Config from "../assets/configs/configs.json";
import ConfirmModal from "../components/ConfirmModal";

const ProfilePage = () => {
  const userMenus = {
    me: "My profile",
    booking: "My booking",
    car: "My cars",
    payment: "Payment History",
  };

  const adminMenus = {
    me: "My profile",
    user_approval_management: "User approval management",
    car_approval_management: "Car approval management",
    match_management: "Match management",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [menu, setMenu] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [requestToBeLessor, setRequestToBeLessor] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const changeParamsMenu = (event) => {
    searchParams.set("menu", event.target.value);
    setSearchParams(searchParams);
  };
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // set the maximum width of the image
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(file.type);
        setUserInfo({
          ...userInfo,
          image: dataUrl,
        });
      };
      img.src = event.target.result;
    };

    if (file) {
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const id = localStorage.getItem("user_id");
      const res = await axios.post(
        `${Config.BACKEND_URL}/user/info`,
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
        requestTobeLessor,
        role,
      } = res.data;
      setRequestToBeLessor(requestTobeLessor);
      const selectedUserInfo = {
        username,
        email,
        prefix,
        firstName,
        lastName,
        phoneNumber,
        image,
        // IDCardNumber,
        // drivingLicenseNumber,
        role,
      };

      setIsAdmin(role === "admin" ? true : false);
      setUserInfo(selectedUserInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickRegisterModal = async () => {
    navigate("/lessorRegister");
  };
  const handleClickCancelModal = async () => {
    navigate("/profile?menu");
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (isAdmin === null) {
      return;
    }
    if (
      searchParams.get("menu") === null ||
      (isAdmin === false && !(searchParams.get("menu") in userMenus)) ||
      (isAdmin === true && !(searchParams.get("menu") in adminMenus))
    ) {
      searchParams.set("menu", "me");
      setSearchParams(searchParams);
    }
    setMenu(searchParams.get("menu"));
  }, [searchParams, isAdmin]);

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
            {!isAdmin &&
              Object.keys(userMenus).map((key) => {
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
            {/* <button onClick={changeParamsMenu}>Log out</button> */}
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
                fetchUserInfo={fetchUserInfo}
              />
            )}
            {menu === "booking" && userInfo.role !== "admin" && <MyBooking />}
            {menu === "car" && userInfo.role === "lessor" && <MyCars />}
            {menu === "payment" && userInfo.role !== "admin" && (
              <PaymentHistory />
            )}
            {menu === "user_approval_management" &&
              userInfo.role === "admin" && <UserApprovalMgmt />}
            {menu === "car_approval_management" &&
              userInfo.role === "admin" && <CarApprovalMgmt />}
            {menu === "match_management" && userInfo.role === "admin" && (
              <MatchMgmt />
            )}
            {menu === "car" && userInfo.role !== "lessor" && (
              <ConfirmModal
                showModalSignal={showModal}
                setModalSignal={setShowModal}
                header={"Want to add your first car??"}
                message={
                  requestToBeLessor
                    ? "You've already registered. (Verification in progress)"
                    : "Please register to be a lessor."
                }
                onPickLeft={() => handleClickRegisterModal()}
                onPickRight={() => handleClickCancelModal()}
                leftTxt={requestToBeLessor ? "Pending" : "Register"}
                leftColor={"white"}
                leftBGColor={requestToBeLessor ? "#aeb3ab" : "#4a60a1"}
                disableLeft={requestToBeLessor}
                rightTxt={"Cancel"}
                rightColor={"white"}
                rightBGColor={"#ea4335"}
                disableRight={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
