import React, {useState, useEffect} from "react";
import axios from "axios";
import CarInforTable from "../components/CarInforTable";
import CarGallery from "../components/CarGallery";
import LessorProfile from "../components/LessorProfile";
import {useParams} from "react-router-dom";

// const carDetail = {
//   owner: "Nuttawat Likhitsomboon",

//   //get from user
//   user_image: "https://pic.onlinewebfonts.com/svg/img_264157.png",
//   user_rating: 4.8,
//   //add
//   description:
//     "Barely on the road and BMW 3 Series Sedan is already leaving everything behind it, including conventions and expectations. Once again the icon displays how to reinvent itself. After all, with the pioneering design language.",
//   brand: "BMW",
//   model: "3 Series Sedan",
//   gear_type: "Auto",
//   year: 2012,
//   energy_types: ["DieselB7", "EV"],
//   province: "Bangna",
//   rental_price: 2500,
//   passenger: 4,
//   rating: 4.5,
//   car_images: [
//     "https://images.autofun.co.th/file1/ab328bac6b68408ea16c5e1525e7a9d0_1125x630.jpg",
//     "https://bimmer-th.com/wp-content/uploads/2020/03/P90385443-highRes.jpg",
//     "https://img.icarcdn.com/autospinn/body/587557.jpg",
//     "https://car-images.bauersecure.com/wp-images/1646/zbmw-098.jpg",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgvrObyQKmp4ZboIdpaaFOmOU2Mwxbc2Z2Yh7JMh5Io8er2TuDlfZURWPVLz_Ehgr3trI&usqp=CAU",
//   ],
// };

const CarDetail = () => {
  const [carDetail, setCarDetail] = useState();
  const {carId} = useParams();

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/car/${carId}`); // change path to backend service
        setCarDetail(res.data);
      } catch (error) {
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
              car_id={carDetail.car_id}
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
