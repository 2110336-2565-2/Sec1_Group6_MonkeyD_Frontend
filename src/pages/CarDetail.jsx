import React from "react";
import CarInforTable from "../components/CarInforTable";
import CarGallery from "../components/CarGallery";
import LessorProfile from "../components/LessorProfile";

const user = {
  username: "Nuttawat Likhitsomboon",
  image: "https://pic.onlinewebfonts.com/svg/img_264157.png",
  ownercar: ["1", "2", "3"],
  rentedCount: 20,
  review: ["a", "b", "c", "d", "e"],
};

const car = {
  owner: "Nuttawat Likhitsomboon",
  brand: "BMW",
  model: "series sedan",
  gearType: "Auto",
  age: 2012,
  energyTypes: ["DieselB7", "EV"],
  province: "Bangna",
  rental_price: 2500,
  passenger: 4,
  rating: 4.5,
  carImages: [
    "https://images.autofun.co.th/file1/ab328bac6b68408ea16c5e1525e7a9d0_1125x630.jpg",
    "https://bimmer-th.com/wp-content/uploads/2020/03/P90385443-highRes.jpg",
    "https://img.icarcdn.com/autospinn/body/587557.jpg",
    "https://car-images.bauersecure.com/wp-images/1646/zbmw-098.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgvrObyQKmp4ZboIdpaaFOmOU2Mwxbc2Z2Yh7JMh5Io8er2TuDlfZURWPVLz_Ehgr3trI&usqp=CAU",
  ],
};

const CarDetail = () => {
  return (
    <div className="car-detail-page">
      <div className="car-name">
        {car.brand} {car.model}
      </div>
      <CarGallery imageGallery={car.carImages} />
      <hr />
      <div className="information-wrapper">
        <div className="lessor-detail">
          <LessorProfile lessor={user} />
          {/* <div className="car-detail">
            <div className="car-name">BMW 3 SERIES SEDAN</div>
            <div className="detail">
              Barely on the road and BMW 3 Series Sedan is already leaving
              everything behind it, including conventions and expectations. Once
              again the icon displays how to reinvent itself. After all, with
              the pioneering design language ...
            </div>
          </div> */}
        </div>
        <div className="vertical-line" />
        <CarInforTable infor={car} />
      </div>
    </div>
  );
};

export default CarDetail;
