import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";
import Config from "../assets/configs/configs.json";
import {dateDisplay} from "../utils/dateDisplay.js";

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
  const [sortBy, setSortBy] = useState("newest date");

  const searchRef = useRef();

  const filters = ["newest date", "oldest date"];

  const fetchMatches = async () => {
    const params = {
      status,
      search: searchRef.current.value,
      sortBy,
    };

    try {
      setIsLoading(true);
      const id = localStorage.getItem("user_id");
      const res = await axios.get(`${Config.BACKEND_URL}/match/admin`, {
        params,
        withCredentials: true,
      });
      setMatches(res.data.matches);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (match_id, action) => {
    try {
      await axios.patch(
        `${Config.BACKEND_URL}/match/status`,
        {
          match_id,
          action,
        },
        {
          withCredentials: true,
        }
      );
      fetchMatches();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchMatches();
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    fetchMatches();
  }, [status, sortBy]);

  return (
    <div className="match-approval-container">
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
              createdAt,
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
                <h3>{`license plate : ${license_plate}`}</h3>
                <h3>{`created at : ${dateDisplay(createdAt)}`}</h3>
                {status === "Rented" && (
                  <>
                    <h3
                      className="action approve"
                      onClick={() => handleChangeStatus(_id, "Completed")}
                    >
                      ✔ Complete
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
export default MatchMgmt;
