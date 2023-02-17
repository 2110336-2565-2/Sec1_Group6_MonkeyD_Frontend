import React, {useState, useEffect} from "react";
import axios from "axios";
import CarInforTable from "../components/CarInforTable";
import CarGallery from "../components/CarGallery";
import LessorProfile from "../components/LessorProfile";
import {useParams} from "react-router-dom";

const CarDetail = () => {
  const [carDetail, setCarDetail] = useState();
  const {carId} = useParams();
  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/car/${carId}`); // change path to backend service
        setCarDetail(res.data);
      } catch (error) {
        window.location.assign("/404");
        console.error(error);
      }
    };
    fetchCarDetail();
  }, [carId]);

  return (
    <div className="car-detail-page">
      {carDetail ? (
        <>
          <CarGallery imageGallery={carDetail.car_images} />
          <div className="information-wrapper">
            <LessorProfile
              user_image={carDetail.user_image}
              owner={carDetail.owner}
              user_rating={carDetail.user_rating}
              description={carDetail.description}
              brand={carDetail.brand}
              model={carDetail.model}
            />
            <CarInforTable
              owner_id={carDetail.owner_id}
              car_id={carDetail._id}
              year={carDetail.year}
              gear_type={carDetail.gear_type}
              energy_types={carDetail.energy_types}
              province={carDetail.province}
              rental_price={carDetail.rental_price}
              rating={carDetail.rating}
              passenger={carDetail.passenger}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CarDetail;
