import axios from "axios";
import Config from "../assets/configs/configs.json";

export const checkLogin = async () => {
  if (localStorage.getItem("user_id")) {
    try {
      const res = await axios.get(`${Config.BACKEND_URL}/user/check-login`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log("still have user_id but no jwt");
      return error;
    }
  } else {
    // console.log("not login");
    return false;
  }
};
