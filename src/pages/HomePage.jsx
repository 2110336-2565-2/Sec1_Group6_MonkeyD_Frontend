import React, {useEffect, useState} from "react";
import axios from "axios";
import Search from "../components/Search";
import SlideFilter from "../components/SlideFilter";
import SlideBanner from "../components/SlideBanner";
import SearchResult from "../components/SearchResult";

const HomePage = () => {
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/car`); // change path to backend service
        setCarList(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCars();
  }, []);
  return (
    <div className="homepage-container">
      <Search />
      <SlideBanner />
      <SlideFilter />
      <SearchResult carList={carList} />
    </div>
  );
};

export default HomePage;
