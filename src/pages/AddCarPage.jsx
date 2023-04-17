import React, {useEffect} from "react";
import AddCar from "../components/AddCar";
import Config from "../assets/configs/configs.json";
import axios from "axios";
const AddCarPage = () => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.post(
          `${Config.BACKEND_URL}/user/info`,
          {
            id: sessionStorage.getItem("user_id"),
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.status !== "Verified" || res.data.role === "renter") {
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
