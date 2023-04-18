import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";

const MatchMgmt = () => {
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
      status: status,
      search: searchRef.current.value,
    };

    try {
      setIsLoading(true);
      const id = sessionStorage.getItem("user_id");
      const res = await axios.get(`http://localhost:8080/match/admin`, {
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

  const handleChangeStatus = async (match_id, action) => {
    try {
      await axios.patch(
        `http://localhost:8080/match/status`,
        {
          match_id,
          action,
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
              renterID: {username: renterUsername},
              lessorID: {username: lessorUsername},
              carID: {license_plate},
              status,
            } = match;
            return (
              <div className="match-approval" key={index}>
                <div className="header">
                  <h3>{`Match ID : ${_id}`}</h3>
                  <h3
                    className={`status 
                    ${status === "Cancelled" ? "rejected" : ""} 
                    ${status === "Completed" ? "approved" : ""}`}
                  >
                    {status}
                  </h3>
                </div>
                <h3>{`renter : ${renterUsername}`}</h3>
                <h3>{`lessor : ${lessorUsername}`}</h3>
                <h3>{`car : ${license_plate}`}</h3>
                {/* {status === "Pending" && (
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
                )} */}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default MatchMgmt;
