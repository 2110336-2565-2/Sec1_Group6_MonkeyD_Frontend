import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import Search from "../components/Search";
import SlideFilter from "../components/SlideFilter";
import SlideBanner from "../components/SlideBanner";
import SearchResult from "../components/SearchResult";
import {useLocation, useNavigate} from "react-router-dom";
import {getCookie, deleteCookie, cookieExists} from "../utils/cookies";
import Config from "../assets/configs/configs.json";

const HomePage = () => {
  const [carList, setCarList] = useState([]);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(false);
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

  const handleSearch = async (newFilterProvince) => {
    const searchParams = {
      startdate: formatDate(startDateInput.current.value),
      enddate: formatDate(endDateInput.current.value),
      province: newFilterProvince,
      brandlist: JSON.stringify(brandInputList),
      size: 8,
    };

    try {
      const res = await axios.get(`${Config.BACKEND_URL}/car`, {
        params: searchParams,
      }); // change path to backend service
      await setSearch(true);
      await setCarList(res.data.data);
      setPage(1);
      setCanLoadMore(res.data.remainCount > 0);
      if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({behavior: "smooth"});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChooseCar = (event) => {
    event.preventDefault();
    sessionStorage.setItem("startDate", startDateInput.current.value);
    sessionStorage.setItem("endDate", endDateInput.current.value);
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
    const getParam = async () => {
      const params = new URLSearchParams(location.search);
      const startDate = params.get("startdate");
      startDateInput.current.value = startDate
        ? new Date(startDate).toISOString().substr(0, 10)
        : new Date().toISOString().substr(0, 10);
      const endDate = params.get("enddate");
      endDateInput.current.value = endDate
        ? new Date(endDate).toISOString().substr(0, 10)
        : new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 10);
      const province = params.get("province");
      const newFilterProvince = province || "";
      setFilterProvince(newFilterProvince);

      const brands = params.get("brandlist");
      setBrandInputList(brands ? JSON.parse(brands) : []);

      // Fetch search results
      if (params.toString() !== "") {
        handleSearch(newFilterProvince);
      } else {
        setSearch(false);
      }
    };
    getParam();
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

  const handleLoadMore = async () => {
    const searchParams = new URLSearchParams({
      startdate: formatDate(startDateInput.current.value),
      enddate: formatDate(endDateInput.current.value),
      province: filterProvince,
      brandlist: JSON.stringify(brandInputList),
      size: 8,
      page: page + 1,
    });

    try {
      const res = await axios.get(`${Config.BACKEND_URL}/car`, {
        params: searchParams,
      }); // change path to backend service
      setCanLoadMore(res.data.remainCount > 0);
      setPage((prev) => prev + 1);
      setCarList((prevList) => {
        const newList = [...prevList, ...res.data.data];
        return newList;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="homepage-container">
      <Search
        filterProvince={filterProvince}
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
        {isSearch ? (
          <SearchResult
            carList={carList}
            handleChooseCar={handleChooseCar}
            canLoadMore={canLoadMore}
            handleLoadMore={handleLoadMore}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HomePage;
