import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";

const MatchManagement = () => {
  const dummy = [
    {
      renterID: "63e36bfd5bbbffc725269039",
      carID: "63e23b547e35430efa0f0867",
      status: "Cancelled",
      pickupLocation: "Siam Paragon",
      returnLocation: "BTS Siam",
      isReview: false,
      lessorID: "63e23a7f7e35430efa0f0857",
    },
  ];
  const statusList = [
    "Unverified renter",
    "Wait for payment",
    "Cancelled",
    "Rented",
    "Completed",
  ];
  const [status, setStatus] = useState("Unverified renter");
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const searchRef = useRef();

  const fetchMatches = async () => {
    const params = {
      ...(status !== "All" && {
        status: status,
      }),
      search: searchRef.current.value,
    };

    try {
      setIsLoading(true);
      const id = sessionStorage.getItem("user_id");
      const res = await axios.get(`http://localhost:8080/match`, {
        params,
        withCredentials: true,
      });
      console.log(res.data.matches);
      setMatches(res.data.matches);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (match_id, status) => {
    try {
      await axios.patch(
        `http://localhost:8080/match/cancel-reservation`,
        {
          match_id,
          status,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
    fetchMatches();
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchMatches();
  };

  useEffect(() => {
    fetchMatches();
  }, [status]);

  return (
    <div className="match-approval-container">
      <ProfileStatusTab
        statusList={statusList}
        status={status}
        setStatus={setStatus}
      />
      <ProfileSearchBar searchRef={searchRef} handleSearch={handleSearch} />
      <div className="match-approval-list">
        {isLoading || matches?.length === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          matches?.map((match, index) => {
            let {
              _id,
              renterID,
              carID,
              status,
              pickupLocation,
              returnLocation,
              isReview,
              lessorID,
            } = match;
            return (
              <div className="match-approval" key={index}>
                <div className="header">
                  <h3>{`Match ID : ${_id}`}</h3>
                  <h3
                    className={`status 
                    ${status === "Rejected" ? "rejected" : ""} 
                    ${status === "Approved" ? "approved" : ""}`}
                  >
                    {status}
                  </h3>
                </div>
                <h3>{`renter : ${renterID}`}</h3>
                <h3>{`car : ${carID}`}</h3>
                <h3>{`lessor : ${lessorID}`}</h3>
                {/* <div className="images">
                  <div className="card">
                    <img
                      className="car-picture"
                      src={registration_book_url}
                      alt=""
                    />
                    <h3>{`${license_plate}`}</h3>
                    <h3>{`${registration_book_id}`}</h3>
                  </div>
                </div> */}
                {status === "Pending" && (
                  <>
                    <h3
                      className="action approve"
                      onClick={() => handleChangeStatus(_id, "Available")}
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
export default MatchManagement;
