import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";

const UserApprovalMgmt = () => {
  const dummypic =
    "https://lifestyle.campus-star.com/app/uploads/2017/03/id-cover.jpg";
  const dummy = {
    users: [
      {
        _id: "1234567",
        username: "stam",
        email: "stam@gmail.com",
        image: dummypic,
        prefix: "Mr",
        phoneNumber: "086-666-6666",
        firstName: "Chayakron",
        lastName: "Kongniwatsiri",
        IDCardNumber: "1203648274917",
        IDCardImage: dummypic,
        drivingLicenseNumber: "1394948294848",
        drivingLicenseImage: dummypic,
        status: "Pending",
      },
      {
        _id: "1234567",
        username:
          "stamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        email:
          "stamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com",
        image: dummypic,
        prefix: "Mr",
        phoneNumber: "086-666-6666",
        firstName:
          "Chayaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakron",
        lastName:
          "Kongniwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaatsiri",
        IDCardNumber: "1203648274917",
        IDCardImage: dummypic,
        drivingLicenseNumber: "1394948294848",
        drivingLicenseImage: dummypic,
        status: "Pending",
      },
      {
        _id: "1234567",
        username: "stam",
        email: "stam@gmail.com",
        image: dummypic,
        prefix: "Mr",
        phoneNumber: "086-666-6666",
        firstName: "Chayakron",
        lastName: "Kongniwatsiri",
        IDCardNumber: "1203648274917",
        IDCardImage: dummypic,
        drivingLicenseNumber: "1394948294848",
        drivingLicenseImage: dummypic,
        status: "Rejected",
      },
      {
        _id: "1234567",
        username: "stam",
        email: "stam@gmail.com",
        image: dummypic,
        prefix: "Mr",
        phoneNumber: "086-666-6666",
        firstName: "Chayakron",
        lastName: "Kongniwatsiri",
        IDCardNumber: "1203648274917",
        IDCardImage: dummypic,
        drivingLicenseNumber: "1394948294848",
        drivingLicenseImage: dummypic,
        status: "Approved",
      },
    ],
    count: 3,
  };
  const statusList = ["Pending", "Rejected", "Approved"];
  const [status, setStatus] = useState("Pending");
  const [approvals, setApprovals] = useState(dummy);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchRef = useRef();

  const fetchUsers = async () => {
    // const params = {
    //   ...(status !== "All" && {
    //     status: status,
    //   }),
    //   search: searchRef.current.value,
    // };
    // try {
    //   setIsLoading(true);
    //   const res = await axios.get(`http://localhost:8080/match/me/`, {
    //     params,
    //     withCredentials: true,
    //   });
    //   setApprovals(res.data);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleChangeStatus = async (user_id, status) => {
    try {
      await axios.patch(
        `http://localhost:8080/match/cancel-reservation`,
        {
          user_id,
          status,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
    fetchUsers();
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [status]);

  return (
    <div className="user-approval-container">
      <ProfileStatusTab
        statusList={statusList}
        status={status}
        setStatus={setStatus}
      />
      <ProfileSearchBar searchRef={searchRef} handleSearch={handleSearch} />
      <div className="user-approval-list">
        {isLoading || approvals?.count === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          approvals?.users.map((user, index) => {
            const {
              _id,
              username,
              email,
              image,
              prefix,
              phoneNumber,
              firstName,
              lastName,
              IDCardNumber,
              IDCardImage,
              drivingLicenseNumber,
              drivingLicenseImage,
              status,
            } = user;
            return (
              <div className="user-approval" key={index}>
                <div className="header">
                  <img className="profile-pic" src={image} alt="" />
                  <h3 className="username">{username}</h3>
                  <h3
                    className={`status 
                    ${status === "Rejected" ? "rejected" : ""} 
                    ${status === "Approved" ? "approved" : ""}`}
                  >
                    {status}
                  </h3>
                </div>
                <p>{`email : ${email}`}</p>
                <p>{`phone number : ${phoneNumber}`}</p>
                <div className="images">
                  <div className="card">
                    <img className="car-picture" src={IDCardImage} alt="" />
                    <h3>{`${prefix}. ${firstName} ${lastName}`}</h3>
                    <h3>{`${IDCardNumber.substring(
                      0,
                      1
                    )}-${IDCardNumber.substring(1, 5)}-${IDCardNumber.substring(
                      5,
                      10
                    )}-${IDCardNumber.substring(
                      10,
                      12
                    )}-${IDCardNumber.substring(12, 13)}`}</h3>
                  </div>
                  <div className="card">
                    <img
                      className="car-picture"
                      src={drivingLicenseImage}
                      alt=""
                    />
                    <h3>{`${prefix}. ${firstName} ${lastName}`}</h3>
                    <h3>{drivingLicenseNumber}</h3>
                  </div>
                </div>
                {status === "Pending" && (
                  <>
                    <h3
                      className="action approve"
                      onClick={() => handleChangeStatus(_id, "Approved")}
                    >
                      ✔ Approve
                    </h3>
                    <h3
                      className="action reject"
                      onClick={() => handleChangeStatus(_id, "Rejected")}
                    >
                      ✖ Reject&nbsp;&nbsp;
                    </h3>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default UserApprovalMgmt;
