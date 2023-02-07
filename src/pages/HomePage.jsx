import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import Search from "../components/Search";
import SlideFilter from "../components/SlideFilter";
import SlideBanner from "../components/SlideBanner";
import SearchResult from "../components/SearchResult";

const HomePage = () => {
  const [carList, setCarList] = useState([]);
  const locationInput = useRef(null);
  const startDateInput = useRef(null);
  const endDateInput = useRef(null);
  const [brandInputList, setBrandInputList] = useState([]);

  const handleSearch = () => {
    console.log(locationInput.current.value);
    console.log(startDateInput.current.value);
    console.log(endDateInput.current.value);
    console.log(brandInputList);
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
