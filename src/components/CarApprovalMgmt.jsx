import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";
import Config from "../assets/configs/configs.json";

const CarApprovalMgmt = () => {
  const dummypic =
    "https://lifestyle.campus-star.com/app/uploads/2017/03/id-cover.jpg";
  const statusList = ["Pending", "Rejected", "Approved"];
  const [status, setStatus] = useState("Pending");
  const [cars, setCars] = useState([]);
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

  const fetchCars = async () => {
    const statusMap = {
      Pending: "pending",
      Rejected: "rejected",
      Approved: "approved",
    };
    const params = {
      filter: statusMap[status],
      search: searchRef.current.value,
    };
    try {
      setIsLoading(true);
      const res = await axios.get(`${Config.BACKEND_URL}/car/admin`, {
        params,
        withCredentials: true,
      });
      setCars(res.data.cars);
      // setCars(dummy);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (car_id, action) => {
    try {
      await axios.patch(
        `${Config.BACKEND_URL}/car/status`,
        {
          car_id,
          action,
        },
        {
          withCredentials: true,
        }
      );
      fetchCars();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchCars();
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    fetchCars();
  }, [status]);

  return (
    <div className="car-approval-container">
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
      <div className="car-approval-list">
        {isLoading || cars.length === 0 ? (
          <div className="no-result">No result</div>
        ) : (
          cars.map((car, index) => {
            let {
              _id,
              owner,
              renter,
              brand,
              model,
              year,
              registration_book_id,
              registration_book_url,
              license_plate,
              status,
            } = car;
            status = ["Unavailable", "Available", "Rented"].includes(status)
              ? "Approved"
              : status;
            return (
              <div className="car-approval" key={index}>
                <div className="header">
                  <h3>{`${brand} ${model} ${year}`}</h3>
                  <h3
                    className={`status 
                    ${status === "Rejected" ? "rejected" : ""} 
                    ${status === "Approved" ? "approved" : ""}`}
                  >
                    {status}
                  </h3>
                </div>
                <p>{`owner : ${owner}`}</p>
                <p>{`renter : ${renter}`}</p>
                <div className="images">
                  <div className="card">
                    <img
                      className="car-picture"
                      src={registration_book_url}
                      onError={({currentTarget}) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dummypic;
                      }}
                      alt=""
                    />
                    <h3>{`${license_plate}`}</h3>
                    <h3>{`${registration_book_id}`}</h3>
                  </div>
                </div>
                {status === "Pending" && (
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
export default CarApprovalMgmt;
