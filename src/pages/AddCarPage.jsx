import React, {useEffect} from "react";
import AddCar from "../components/AddCar";
import axios from "axios";
const AddCarPage = () => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/user/info",
          {
            id: sessionStorage.getItem("user_id"),
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.status !== "Verified" || res.data.isLessor === false) {
          window.location.assign("/404");
        }
      } catch (error) {
        window.location.assign("/404");
      }
    };
    checkUser();
  }, []);
  return (
    <div className="addcar-page-container">
      <AddCar />
    </div>
  );
};

export default AddCarPage;
