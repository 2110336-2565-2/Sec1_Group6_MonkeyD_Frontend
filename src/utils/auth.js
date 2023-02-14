import axios from "axios";

export const checkLogin = async () => {
  if (sessionStorage.getItem("user_id")) {
    try {
      const res = await axios.get(`http://localhost:8080/user/check-login`, {
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
