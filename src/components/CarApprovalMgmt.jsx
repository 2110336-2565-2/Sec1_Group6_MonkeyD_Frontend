import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileStatusTab from "./ProfileStatusTab";
import ProfileSearchBar from "./ProfileSearchBar";

const CarApprovalMgmt = () => {
  const dummypic =
    "https://lifestyle.campus-star.com/app/uploads/2017/03/id-cover.jpg";
  const dummy = [
    {
      _id: "63e23add7e35430efa0f085b",
      energy_types: ["Gasohol95", "EV"],
      car_images: [
        "https://img.khaorot.com/2021/01/21/5Cq7JfHF/dsc02704-83a7.jpg",
        "https://img.khaorot.com/2021/01/21/5Cq7JfHF/dsc02700-0888.jpg",
        "https://img.khaorot.com/2021/01/22/5Cq7JfHF/12000-eed2.jpg",
        "https://img.khaorot.com/2021/01/21/5Cq7JfHF/dsc02715-2447.jpg",
        "https://img.khaorot.com/2021/01/21/5Cq7JfHF/dsc02718-c974.jpg",
      ],
      owner: "pawankanjeam",
      brand: "BMW",
      model: "530e",
      gear_type: "Auto",
      license_plate: "1กก 1234 กรุงเทพมหานคร",
      registration_book_id: "123421",
      registration_book_url:
        "https://sayingimages.com/wp-content/uploads/i-am-so-sleepy-meme.jpg.webp",
      year: 2022,
      renter: "pwanstax",
      status: "Pending",
    },
  ];
  const statusList = ["Pending", "Rejected", "Approved"];
  const [status, setStatus] = useState("Pending");
  const [cars, setCars] = useState(dummy);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchRef = useRef();

  const fetchUsers = async () => {
    const params = {
      ...(status !== "All" && {
        status: status,
      }),
      search: searchRef.current.value,
    };
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:8080/car`);
      console.log(res.data);
      setCars(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
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
    <div className="car-approval-container">
      <ProfileStatusTab
        statusList={statusList}
        status={status}
        setStatus={setStatus}
      />
      <ProfileSearchBar searchRef={searchRef} handleSearch={handleSearch} />
      <div className="car-approval-list">
        {isLoading || (cars?.length === 0 && cars) ? (
          <div className="no-result">No result</div>
        ) : (
          cars.map((car, index) => {
            let {
              _id,
              energy_types,
              car_images,
              owner,
              brand,
              model,
              gear_type,
              license_plate,
              registration_book_id,
              registration_book_url,
              year,
              renter,
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
                <p>{`gear type : ${gear_type}`}</p>
                <p>{`energy types : ${energy_types.join(", ")}`}</p>
                <p>{`owner : ${owner}`}</p>
                <p>{`renter : ${renter}`}</p>
                <div className="images">
                  <div className="card">
                    <img
                      className="car-picture"
                      src={registration_book_url}
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
export default CarApprovalMgmt;
