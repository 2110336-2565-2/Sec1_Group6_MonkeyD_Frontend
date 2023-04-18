import React, {useState} from "react";

const CarGallery = ({imageGallery}) => {
  const [currentImage, setCurrentImage] = useState(imageGallery[0]);

  const handleClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div className="car-gallery">
      <div>
        <div className="main-view">
          <img src={currentImage} alt="car" />
        </div>
        <div className="other-view">
          {imageGallery.map((car, index) => {
            return (
              <div key={index} onClick={() => handleClick(car)}>
                <img src={car} alt="car" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarGallery;
