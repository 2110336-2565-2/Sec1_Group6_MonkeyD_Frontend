import React, {useState} from "react";

const SlideFilter = ({brandInputList, setBrandInputList, handleSearch}) => {
  const cars = [
    {
      brand: "Benz",
      image:
        "https://www.mercedes-benz.co.th/th/passengercars/mercedes-benz-cars/models/c-class/saloon-w206/offers-and-services/download/_jcr_content/par/productinfotextimage/media/slides/videoimageslide/image.MQ6.7.20220323063026.jpeg",
    },
    {
      brand: "Toyota",
      image:
        "https://motortrivia.com/wp-content/uploads/2022/09/toyota-gr-supra-and-gr-86-online-booking-01.jpg",
    },
    {
      brand: "BMW",
      image: "https://mpics-cdn.mgronline.com/pics/Images/565000004776701.JPEG",
    },
    {
      brand: "Honda",
      image:
        "https://media.ed.edmunds-media.com/honda/cr-v/2023/oem/2023_honda_cr-v_4dr-suv_sport-hybrid_fq_oem_1_600.jpg",
    },
    {
      brand: "Lamborghini",
      image:
        "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/few_off/sian-fkp-37/2022/06_20/gallery/sian_05_m.jpg",
    },
    {
      brand: "Ferrari",
      image:
        "https://carconfigurator.ferrari.com/assets/cars/portofinom/packages/default/car-ferrari-portofino-m_splash.jpg",
    },
    {
      brand: "Ford",
      image:
        "https://assets.whichcar.com.au/image/upload/s--GxsHaonb--/ar_1.9047619047619047,c_fill,f_auto,q_auto:good/c_scale,w_1200/v1/archive/whichcar/2018/07/30/-1/2018-Ford-Mustang-GT-in-depth-performance-review.jpg",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    if (currentIndex + 6 < cars.length) {
      setCurrentIndex(currentIndex + 6);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 6 >= 0) {
      setCurrentIndex(currentIndex - 6);
    }
  };

  const toggleList = (array, item) => {
    const index = array.indexOf(item);
    if (index === -1) {
      array.push(item);
    } else {
      array.splice(index, 1);
    }
    setBrandInputList(array);
    handleSearch();
  };

  return (
    <div className="slide-container">
      <h2>Propertice by Brand</h2>
      <p>
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Proin sodales ultrices nulla blandit volutpat.
      </p>
      <div className="slide-wrapper">
        <button className="left" onClick={handlePrev}>
          &#10094;
        </button>
        <div className="brand-slide">
          {cars.slice(currentIndex, currentIndex + 6).map((car) => {
            return (
              <div
                className="image-container"
                onClick={() => toggleList(brandInputList, car.brand)}
                key={car.image} // have to change key later
              >
                <div
                  className="brand"
                  style={{
                    height: brandInputList.includes(car.brand) ? "100%" : "",
                    alignItems: brandInputList.includes(car.brand)
                      ? "center"
                      : "",
                    justifyContent: brandInputList.includes(car.brand)
                      ? "center"
                      : "",
                  }}
                >
                  <h3>{car.brand}</h3>
                </div>
                <img src={car.image} alt="car" />
              </div>
            );
          })}
        </div>
        <button className="right" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default SlideFilter;

// not support more than 6
