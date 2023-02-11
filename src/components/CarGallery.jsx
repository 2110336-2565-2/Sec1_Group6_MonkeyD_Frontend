import React, { useState } from "react";

const CarGallery = ({ imageGallery }) => {
  const [galleryIndex, setgalleryIndex] = useState(0);
  const gallerySize = imageGallery.length;

  const nextImage = () => {
    setgalleryIndex(galleryIndex === gallerySize - 1 ? 0 : galleryIndex + 1);
  };

  const previousImage = () => {
    setgalleryIndex(galleryIndex === 0 ? gallerySize - 1 : galleryIndex - 1);
  };

  return (
    <div className="car-gallery">
      <i onClick={previousImage} className="fa-solid fa-arrow-left" />
      <div>
        {imageGallery.map((image, index) => {
          return (
            <div
              key={index}
              className={
                index === galleryIndex ? "slideshow-car fade-in" : "fade-out"
              }
            >
              {index === galleryIndex && (
                <img src={imageGallery[galleryIndex]} alt="back car" />
              )}
            </div>
          );
        })}
      </div>
      <i onClick={nextImage} className="fa-solid fa-arrow-right" />
      <div className="other-view">
        <div>
          <img src={imageGallery[1]} alt="car" />
        </div>
        <div>
          <img src={imageGallery[2]} alt="side car" />
        </div>
        <div>
          <img src={imageGallery[3]} alt="inside car" />
        </div>
      </div>
    </div>
  );
};

export default CarGallery;
