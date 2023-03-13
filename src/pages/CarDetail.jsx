import React, {useState, useEffect} from "react";
import axios from "axios";
import CarInforTable from "../components/CarInforTable";
import CarGallery from "../components/CarGallery";
import LessorProfile from "../components/LessorProfile";
import ModalCarRent from "../components/ModalCarRent";
import {useParams} from "react-router-dom";
import CommentBox from "../components/CommentBox";

const CarDetail = () => {
  const [carDetail, setCarDetail] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const {carId} = useParams();

  const setUserInfoHandler = (fill) => {
    setUserInfo(fill);
  };

  const setShowModalHandler = (modalShow) => {
    setShowModal(modalShow);
  };

  const [carReview, setCarReview] = useState([]);
  const reviews = [
    {
      owner: "Cha Eunwoo",
      owner_img: "https://data.whicdn.com/images/334823840/original.jpg",
      review: "Good service, friendly doctor, and not expensive",
      date: "12 February 2023",
      rating: 4,
    },
    {
      owner: "Lalisa",
      owner_img:
        "https://storage.googleapis.com/k-react.appspot.com/images/profilePicture/Z0PS2szWPBVpJN3hj9mc_300x300.jpg",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release .",
      date: "13 February 2023",
      rating: 3.5,
    },
    {
      owner: "dlwlrma",
      owner_img: "https://image.kpopmap.com/2019/02/IU-LILAC.jpg",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release .",
      date: "14 February 2023",
      rating: 2.7,
    },
  ];
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
    const fetchCarReview = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/review?carID=${carId}`
        ); // change path to backend service
        setCarReview(res.data.reviews);
      } catch (error) {
        window.location.assign("/404");
        console.error(error);
      }
    };
    fetchCarDetail();
    fetchCarReview();
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
              rented_out={carDetail.rentedOutCount}
              set_user_info={setUserInfoHandler}
              set_show_modal={setShowModalHandler}
            />
          </div>
          {carReview.length && (
            <CommentBox
              reviews={carReview}
              carRating={carDetail.rating}
              hygieneRating={carDetail.hygieneRating}
              carConditionRating={carDetail.carConditionRating}
              serviceRating={carDetail.serviceRating}
            />
          )}
        </>
      ) : (
        <></>
      )}
      {showModal ? (
        <ModalCarRent
          owner_id={carDetail.owner_id}
          car_id={carDetail._id}
          rental_price={carDetail.rental_price}
          user_info={userInfo}
          showModal={showModal}
          set_show_modal={setShowModalHandler}
          location={carDetail.available_location}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CarDetail;
