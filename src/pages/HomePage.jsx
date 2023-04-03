import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import Search from "../components/Search";
import SlideFilter from "../components/SlideFilter";
import SlideBanner from "../components/SlideBanner";
import SearchResult from "../components/SearchResult";
import {useLocation, useNavigate} from "react-router-dom";
import {getCookie, deleteCookie, cookieExists} from "../utils/cookies";

const HomePage = () => {
  const [carList, setCarList] = useState([]);
  const [isSearch, setSearch] = useState(false);
  const [filterProvince, setFilterProvince] = useState("");
  const startDateInput = useRef(null);
  const endDateInput = useRef(null);
  const [brandInputList, setBrandInputList] = useState([]);
  const scrollToRef = useRef();
  const navigate = useNavigate();
  let location = useLocation();

  const formatDate = (inputDate) => {
    if (inputDate) {
      let date = new Date(inputDate);
      let formattedDate = date.toISOString();
      return formattedDate;
    }
    return "";
  };

  const handleSearch = async () => {
    console.log("handleSearch called");
    const searchParams = {
      startdate: formatDate(startDateInput.current.value),
      enddate: formatDate(endDateInput.current.value),
      province: filterProvince,
      brandlist: JSON.stringify(brandInputList),
    };

    try {
      const res = await axios.get("http://localhost:8080/car", {
        params: searchParams,
      }); // change path to backend service
      await setSearch(true);
      await setCarList(res.data);
      if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({behavior: "smooth"});
      }
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
    handleCookiesAuth();
  }, []);

  useEffect(() => {
    // setSearch(false);
    const params = new URLSearchParams(location.search);
    const startDate = params.get("startdate");
    startDateInput.current.value = startDate ? startDate : "";
    const endDate = params.get("enddate");
    endDateInput.current.value = endDate ? endDate : "";
    const province = params.get("province");
    setFilterProvince(province ? province : "");
    const brands = params.get("brandlist");
    setBrandInputList(brands ? JSON.parse(brands) : []);

    // Fetch search results
    console.log(params.toString());
    if (params.toString() !== "") {
      handleSearch();
    } else {
      setSearch(false);
    }
  }, [location]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams({
      startdate: formatDate(startDateInput.current.value),
      enddate: formatDate(endDateInput.current.value),
      province: filterProvince,
      brandlist: JSON.stringify(brandInputList),
    });
    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };

  return (
    <div className="homepage-container">
      <Search
        setFilterProvince={setFilterProvince}
        startDateInput={startDateInput}
        endDateInput={endDateInput}
        handleSearch={handleSearchSubmit}
        isSearch={isSearch}
      />
      <SlideBanner />
      {isSearch ? (
        <>
          <SlideFilter
            brandInputList={brandInputList}
            setBrandInputList={setBrandInputList}
            handleSearch={handleSearch}
          />
        </>
      ) : (
        <div className="not-search">
          <h2>Top #1 Rental car company</h2>
          <p>
            "At Monkey D Car, we're committed to providing our customers with
            trustworthy and reliable car rental services. Rent with confidence
            and experience the difference with us."
          </p>
        </div>
      )}
      <div ref={scrollToRef}>
        {isSearch ? <SearchResult carList={carList} /> : <></>}
      </div>
    </div>
  );
};

export default HomePage;
