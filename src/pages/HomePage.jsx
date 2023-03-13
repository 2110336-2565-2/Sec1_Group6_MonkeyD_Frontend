import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import Search from "../components/Search";
import SlideFilter from "../components/SlideFilter";
import SlideBanner from "../components/SlideBanner";
import SearchResult from "../components/SearchResult";
import {getCookie, deleteCookie, cookieExists} from "../utils/cookies";

const HomePage = () => {
  const [carList, setCarList] = useState([]);
  const locationInput = useRef(null);
  const startDateInput = useRef(null);
  const endDateInput = useRef(null);
  const [brandInputList, setBrandInputList] = useState([]);

  const formatDate = (inputDate) => {
    if (inputDate) {
      let date = new Date(inputDate);
      let formattedDate = date.toISOString();
      return formattedDate;
    }
    return "";
  };

  const handleSearch = async () => {
    var encodedBrandList = encodeURIComponent(JSON.stringify(brandInputList));

    try {
      const res = await axios.get(
        `http://localhost:8080/car?startdate=${formatDate(
          startDateInput.current.value
        )}&enddate=${formatDate(endDateInput.current.value)}&province=${
          locationInput.current.value
        }&brandlist=${encodedBrandList}`
      ); // change path to backend service
      setCarList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCookiesAuth = () => {
    // handle cookie auth from google
    if (cookieExists("userID") && cookieExists("username")) {
      const useridValue = getCookie("userID");
      const usernameValue = getCookie("username");
      sessionStorage.setItem("user_id", useridValue);
      sessionStorage.setItem("username", usernameValue);
      deleteCookie("userID");
      deleteCookie("username");
    } else {
      return;
    }
  };
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/car`); // change path to backend service
        setCarList(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleCookiesAuth();
    fetchCars();
  }, []);
  return (
    <div className="homepage-container">
      <Search
        locationInput={locationInput}
        startDateInput={startDateInput}
        endDateInput={endDateInput}
        handleSearch={handleSearch}
      />
      <SlideBanner />
      <SlideFilter
        brandInputList={brandInputList}
        setBrandInputList={setBrandInputList}
        handleSearch={handleSearch}
      />
      <SearchResult carList={carList} />
    </div>
  );
};

export default HomePage;
