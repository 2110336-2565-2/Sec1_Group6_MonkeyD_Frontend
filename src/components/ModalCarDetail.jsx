import React, {useState, useEffect} from "react";

const CarDetails = ({modalCar, handleSave}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedCar, setUpdatedCar] = useState(modalCar);
  const [car, setCar] = useState(modalCar);
  const [new_car_images, setNewCarImages] = useState([]);
  const [uploaded_car_images, setUploadedCarImages] = useState([]);
  const [deleted_car_image_urls, setDeletedCarImageUrls] = useState([]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUpdatedCar({...updatedCar, [name]: value});
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  const handleSaveButtonClick = async () => {
    // console.log(updatedCar);
    // console.log(uploaded_car_images.length);
    // console.log(deleted_car_image_urls);
    const formData = new FormData();
    formData.append("available_location", updatedCar.available_location);
    formData.append("rental_price", updatedCar.rental_price);
    for (const url of deleted_car_image_urls) {
      formData.append("delete_image", url);
    }
    // for (const file of uploaded_car_images) {
    //   formData.append("car_images", file);
    // }
    const carImages = document.querySelector("#carimages").files;
    for (let i = 0; i < carImages.length; i++) {
      formData.append("car_images", carImages[i]);
    }
    await handleSave(formData, updatedCar._id);
    setEditMode(false);
    //setCar(updatedCar);

    window.location.reload(false);
    window.scrollTo(0, 0);
  };

  const handleCancelButtonClick = () => {
    setUpdatedCar(car);
    setEditMode(false);
    setNewCarImages([]);
    setUploadedCarImages([]);
    setDeletedCarImageUrls([]);
  };

  const handleDeleteImage = (e) => {
    //console.log(e.target.name);
    setDeletedCarImageUrls([...deleted_car_image_urls, e.target.name]);
  };

  const handleImage = async (event) => {
    const {name, files} = event.target;
    setNewCarImages([...files]);
  };
  useEffect(() => {
    if (new_car_images.length < 1) return;
    const URLs = [];
    new_car_images.forEach((image) => URLs.push(URL.createObjectURL(image)));
    setUploadedCarImages(uploaded_car_images.concat(URLs));
  }, [new_car_images]);

  return (
    <div className={editMode ? "modal-car-detail" : "modal-car-detail v2"}>
      <p>
        <span className="topic">Available Location : </span>
        {editMode ? (
          <input
            type="text"
            name="available_location"
            value={updatedCar.available_location}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.available_location}</span>
        )}
      </p>
      <p>
        <span className="topic">Rental Price per Day : </span>
        {editMode ? (
          <input
            type="number"
            name="rental_price"
            value={updatedCar.rental_price}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">฿ {car.rental_price}</span>
        )}
      </p>
      <p>
        <span className="topic">Status : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="status"
            value={updatedCar.status}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.status}</span>
        )}
      </p>
      <p>
        <span className="topic">Energy Types : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="energy_types"
            value={updatedCar.energy_types.join(", ")}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.energy_types.join(", ")}</span>
        )}
      </p>
      <p>
        <span className="topic">Rating : </span>
        {editMode ? (
          <input
            disabled
            //type="number"
            name="rating"
            value={car.reviewCount ? car.rating.toFixed(2) : "No review"}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">
            {car.reviewCount ? car.rating.toFixed(2) : "No review"}
          </span>
        )}
      </p>
      <p>
        <span className="topic">Rented Out Count : </span>
        {editMode ? (
          <input
            disabled
            type="number"
            name="rentedOutCount"
            value={updatedCar.rentedOutCount}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.rentedOutCount}</span>
        )}
      </p>
      <p>
        <span className="topic">Brand : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="brand"
            value={updatedCar.brand}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.brand}</span>
        )}
      </p>
      <p>
        <span className="topic">Model : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="model"
            value={updatedCar.model}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.model}</span>
        )}
      </p>
      <p>
        <span className="topic">Gear Type : </span>
        {editMode ? (
          <input
            disabled
            type="text"
            name="gear_type"
            value={updatedCar.gear_type}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.gear_type}</span>
        )}
      </p>

      <p>
        <span className="topic">Passenger : </span>
        {editMode ? (
          <input
            disabled
            type="number"
            name="passenger"
            value={updatedCar.passenger}
            onChange={handleInputChange}
          />
        ) : (
          <span className="value">{car.passenger}</span>
        )}
      </p>

      <p>
        <span className="topic">Images : </span>
        {editMode ? (
          <div className="car-images">
            {car.show_images.map((value) => {
              if (!deleted_car_image_urls.includes(value)) {
                return (
                  <div>
                    {car.show_images.length -
                      deleted_car_image_urls.length +
                      uploaded_car_images.length >
                      5 && (
                      <button
                        className="btn btn-image"
                        id="inModal"
                        name={value}
                        onClick={handleDeleteImage}
                      >
                        Delete
                      </button>
                    )}
                    <img src={value} alt="car image" />
                  </div>
                );
              }
            })}
            <div className="upload-input">
              <p>Upload new image</p>
              <input
                type="file"
                id="carimages"
                name="car_images"
                multiple
                onChange={handleImage}
                //onBlur={validateImage}
                accept="image/png, image/gif, image/jpeg"
                style={{width: "95px"}}
              />
            </div>
            <div className="upload-display">
              {uploaded_car_images.map((value) => {
                return <img src={value} alt="car image" />;
              })}
            </div>
          </div>
        ) : (
          <div className="car-images">
            {car.show_images.map((value) => {
              return <img src={value} alt="car image" />;
            })}
          </div>
        )}
      </p>

      {editMode ? (
        <div className="btn">
          <button
            className="btn-edit"
            id="inModal"
            onClick={handleSaveButtonClick}
          >
            Save
          </button>
          <button
            className="btn-edit"
            id="inModal"
            onClick={handleCancelButtonClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="btn btn-edit"
          id="inModal"
          onClick={handleEditButtonClick}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default CarDetails;
