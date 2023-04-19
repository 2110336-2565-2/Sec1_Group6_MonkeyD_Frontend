import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";
import Config from "../assets/configs/configs.json";

const UserApprovalMgmt = () => {
  const dummypic =
    "https://lifestyle.campus-star.com/app/uploads/2017/03/id-cover.jpg";
  const statusList = ["Unverified", "Rejected", "Verified"];
  const [status, setStatus] = useState("Unverified");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest date");
  const navigate = useNavigate();

  const searchRef = useRef();

  const filters = [
    "newest date",
    "oldest date",
    "highest price",
    "lowest price",
  ];

  const fetchUsers = async () => {
    const params = {
      status: status,
      search: searchRef.current.value,
    };
    try {
      setIsLoading(true);
      const res = await axios.get(`${Config.BACKEND_URL}/user/admin`, {
        params,
        withCredentials: true,
      });
      console.log(res.data.users);
      setUsers(res.data.users);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (user_id, action) => {
    try {
      await axios.patch(
        `${Config.BACKEND_URL}/user/status`,
        {
          user_id,
          action,
        },
        {
          withCredentials: true,
        }
      );
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchUsers();
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
    fetchUsers();
  };

  const handleImageError = ({currentTarget}) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = dummypic;
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
      <ProfileSearchBar
        searchRef={searchRef}
        handleSearch={handleSearch}
        sortBy={sortBy}
        sortByList={filters}
        handleSortBy={handleSortBy}
      />
      <div className="user-approval-list">
        {isLoading || users.length === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          users.map((user, index) => {
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
                    <img
                      className="car-picture"
                      src={IDCardImage}
                      alt=""
                      onError={handleImageError}
                    />
                    <h3>{`${prefix} ${firstName} ${lastName}`}</h3>
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
                      onError={handleImageError}
                      alt=""
                    />
                    <h3>{`${prefix} ${firstName} ${lastName}`}</h3>
                    <h3>{drivingLicenseNumber}</h3>
                  </div>
                </div>
                {status === "Unverified" && (
                  <>
                    <h3
                      className="action approve"
                      onClick={() => handleChangeStatus(_id, "Approve")}
                    >
                      ✔ Approve
                    </h3>
                    <h3
                      className="action reject"
                      onClick={() => handleChangeStatus(_id, "Reject")}
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
