import React, {useState, useEffect} from "react";
import axios from "axios";
import {provinces, carBrands} from "../utils/mockData";
import Config from "../assets/configs/configs.json";

const AddCar = () => {
  const resetForm = {
    brand: "",
    model: "",
    year: "",
    gear_type: "",
    passenger: "",
    available_location: "",
    energy_types: [],
    province: "",
    description: "",
    license_plate: "",
    rental_price: "",
    registration_book_id: "",
  };

  const errorForm = {
    brand: "",
    model: "",
    year: "",
    gear_type: "",
    passenger: "",
    available_location: "",
    energy_types: "",
    province: "",
    description: "",
    license_plate: "",
    rental_price: "",
    registration_book_id: "",
    book_img: "",
    car_images: "",
  };
  const year = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) => year - index);

  const energy_types = [
    "DieselB7",
    "DieselB10",
    "Gasohol95",
    "Gasohol91",
    "E20",
    "E85",
    "LPG",
    "NGV",
    "EV",
  ];

  const [form, setForm] = useState(resetForm);
  const [error, setError] = useState(errorForm);
  const [registration_book_image, setBookImg] = useState();
  const [resError, setResError] = useState("");
  const [brands, setBrands] = useState([]);
  const [new_car_images, setNewCarImages] = useState([]);
  const [car_images, setCarImages] = useState([]);
  const [diesel, setDiesel] = useState(0);
  const [gasoline, setGasoline] = useState(0);
  const onImageChange = (e) => {
    setNewCarImages([...e.target.files]);
  };

  const numberValidator = (value) => {
    if (value.length > 0) {
      const last = value.charAt(value.length - 1);
      if (!last.match(/^(\d)$/) || (value.length == 1 && last == "0")) {
        return value.slice(0, value.length - 1);
      }
    }
    return value;
  };

  const handleImage = async (event) => {
    const {name, files} = event.target;
    if (name === "book_img") {
      setBookImg(URL.createObjectURL(files[0]));
    } else if (name === "car_images") {
      onImageChange(event);
    }
    validateImage(event);
  };

  const validateImage = (event) => {
    let {name, files} = event.target;
    setError((prev) => {
      const stateObj = {...prev, [name]: ""};
      switch (name) {
        case "book_img":
          if (!registration_book_image && !files.length) {
            stateObj[name] = "Please insert registration_book_image.";
          }
          break;

        case "car_images":
          if (car_images.length + files.length < 5) {
            stateObj[name] = "Please insert at least 5 images.";
          }
          break;
        default:
          break;
      }

      return stateObj;
    });
  };

  const handleChange = (event) => {
    const {name, value, checked} = event.target;
    let added;
    if (name === "energy_types") {
      added = form.energy_types;
      if (checked) {
        added.push(value);
        if (value === "DieselB7" || value === "DieselB10")
          setDiesel(diesel + 1);
        if (
          value === "Gasohol95" ||
          value === "Gasohol91" ||
          value === "E20" ||
          value === "E85"
        )
          setGasoline(gasoline + 1);
      } else {
        const index = added.indexOf(value);
        if (index > -1) {
          added.splice(index, 1);
        }
        if (value === "DieselB7" || value === "DieselB10")
          setDiesel(diesel - 1);
        if (
          value === "Gasohol95" ||
          value === "Gasohol91" ||
          value === "E20" ||
          value === "E85"
        )
          setGasoline(gasoline - 1);
      }
    } else if (name === "passenger" || name === "rental_price") {
      added = numberValidator(value);
    } else {
      added = value;
    }
    setForm({
      ...form,
      [name]: added,
    });
    validateForm(event);
  };

  const validateForm = (event) => {
    //not fin
    let {name, value} = event.target;
    setError((prev) => {
      const stateObj = {...prev, [name]: ""};
      switch (name) {
        case "brand":
          if (!value) {
            stateObj[name] = "Please select brand.";
          }
          break;

        case "model":
          if (!value) {
            stateObj[name] = "Please enter model.";
          }
          break;

        case "year":
          if (!value) {
            stateObj[name] = "Please select year.";
          }
          break;

        case "gear_type":
          if (!value) {
            stateObj[name] = "Please select gear type.";
          }
          break;

        case "passenger":
          if (!value) {
            stateObj[name] = "Please enter the number of passengers";
          }
          break;

        case "available_location":
          if (!value) {
            stateObj[name] = "Please enter available location.";
          }
          break;
        case "province":
          if (!value) {
            stateObj[name] = "Please select province.";
          }
          break;
        case "energy_types":
          if (!form.energy_types.length) {
            stateObj[name] = "Please select at least one energy type";
          }
          break;

        case "license_plate":
          if (!value) {
            stateObj[name] = "Please enter license_plate";
          }
          break;

        case "rental_price":
          if (!value) {
            stateObj[name] = "Please enter rental price";
          }
          break;

        case "registration_book_id":
          if (!value) {
            stateObj[name] = "Please enter registration_book_id";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let err = false;
    if (form.gear_type === "") {
      setError((prev) => ({
        ...prev,
        ["gear_type"]: "Please select gear type.",
      }));
      err = true;
    }
    if (form.energy_types.length === 0) {
      setError((prev) => ({
        ...prev,
        ["energy_types"]: "Please select at least one energy type.",
      }));
      err = true;
    }

    if (!form.brand) {
      setError((prev) => ({
        ...prev,
        ["brand"]: "Please select brand.",
      }));
      err = true;
    }
    if (!form.model) {
      setError((prev) => ({
        ...prev,
        ["model"]: "Please enter model.",
      }));
      err = true;
    }
    if (!form.year) {
      setError((prev) => ({
        ...prev,
        ["year"]: "Please select year.",
      }));
      err = true;
    }
    if (!form.passenger) {
      setError((prev) => ({
        ...prev,
        ["passenger"]: "Please enter the number of passengers.",
      }));
      err = true;
    }
    if (!form.available_location) {
      setError((prev) => ({
        ...prev,
        ["available_location"]: "Please enter available_location.",
      }));
      err = true;
    }
    if (!form.province) {
      setError((prev) => ({
        ...prev,
        ["province"]: "Please select province.",
      }));
      err = true;
    }
    if (!form.license_plate) {
      setError((prev) => ({
        ...prev,
        ["license_plate"]: "Please enter license_plate.",
      }));
      err = true;
    }
    if (!form.rental_price) {
      setError((prev) => ({
        ...prev,
        ["rental_price"]: "Please enter rental_price.",
      }));
      err = true;
    }
    if (!form.registration_book_id) {
      setError((prev) => ({
        ...prev,
        ["registration_book_id"]: "Please enter registration_book_id.",
      }));
      err = true;
    }

    if (err) {
      handleShowResError("Please check error message above.");
      return;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      if (key == "energy_types") {
        for (const e of value) {
          formData.append(key, e);
        }
      } else {
        formData.append(key, value);
      }
    }
    formData.append("owner_user_id", localStorage.getItem("user_id"));
    formData.append("owner", localStorage.getItem("username"));
    formData.append("rating", 0);

    const registrationBookImage = document.querySelector("#bookimg").files[0];
    formData.append("registration_book_image", registrationBookImage);

    const carImages = document.querySelector("#carimages").files;
    for (let i = 0; i < carImages.length; i++) {
      formData.append("car_images", carImages[i]);
    }

    try {
      await axios.post(`${Config.BACKEND_URL}/car`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.assign("/");
    } catch (error) {
      handleShowResError(error.response.data.error);
    }
  };

  const handleShowResError = (text) => {
    setResError(text);
    setTimeout(() => {
      setResError("");
    }, 5000);
  };

  useEffect(() => {
    if (new_car_images.length < 1) return;
    const URLs = [];
    new_car_images.forEach((image) => URLs.push(URL.createObjectURL(image)));
    setCarImages(car_images.concat(URLs));
  }, [new_car_images]);

  return (
    <div className="addcar-container">
      <div className="addcar-box">
        <h2>Register Your Car</h2>
        <form onSubmit={handleSubmit} className="addcar-form">
          <label>Brand</label>
          <select
            name="brand"
            id="brand"
            onChange={handleChange}
            onBlur={validateForm}
            defaultValue=""
            //required
          >
            <option disabled hidden></option>
            {carBrands.map((brand) => {
              return (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              );
            })}
          </select>
          {error.brand && <span className="error">{error.brand}</span>}
          <label>Model</label>
          <input
            id="model"
            name="model"
            value={form.model}
            onChange={handleChange}
            onBlur={validateForm}
            //required
          />
          {error.model && <span className="error">{error.model}</span>}
          <label>Year</label>
          <select
            name="year"
            id="year"
            onChange={handleChange}
            onBlur={validateForm}
            defaultValue=""
            //required
          >
            <option disabled hidden></option>
            {years.map((year, index) => {
              return (
                <option key={`year${index}`} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          {error.year && <span className="error">{error.year}</span>}
          <label>Gear Type</label>
          <div>
            <input
              type="radio"
              id="auto"
              name="gear_type"
              value="Auto"
              onChange={handleChange}
              onBlur={validateForm}
            />
            <label htmlFor="age1">Automatic</label>
            <input
              type="radio"
              id="manual"
              name="gear_type"
              value="Manual"
              onChange={handleChange}
              onBlur={validateForm}
            />
            <label htmlFor="manual">Manual</label>
          </div>
          {error.gear_type && <span className="error">{error.gear_type}</span>}
          <label>Energy Types</label>
          {energy_types.map((type, index) => {
            if (
              (index <= 1 && gasoline === 0) ||
              (index >= 2 && index <= 5 && diesel === 0) ||
              index > 5
            ) {
              return (
                <div key={type}>
                  <input
                    type="checkbox"
                    id={type}
                    name="energy_types"
                    value={type}
                    onChange={handleChange}
                    onBlur={validateForm}
                  />
                  <label htmlFor={type}>{type}</label>
                </div>
              );
            }
          })}
          {error.energy_types && (
            <span className="error">{error.energy_types}</span>
          )}
          <label>Passengers</label>
          <input
            name="passenger"
            // type="number"
            // min="0"
            onChange={handleChange}
            onBlur={validateForm}
            value={form.passenger}
            //required
          ></input>
          {error.passenger && <span className="error">{error.passenger}</span>}

          <label>Available Location</label>
          <input
            name="available_location"
            onChange={handleChange}
            onBlur={validateForm}
            value={form.available_location}
            //required
          ></input>
          {error.available_location && (
            <span className="error">{error.available_location}</span>
          )}
          <label>Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={validateForm}
            value={form.description}
          ></textarea>

          <label>Province</label>
          <select
            name="province"
            id="province"
            onChange={handleChange}
            onBlur={validateForm}
            defaultValue=""
            //required
          >
            <option disabled hidden></option>
            {provinces.map((province) => {
              return (
                <option key={province.value} value={province.value}>
                  {province.value}
                </option>
              );
            })}
          </select>
          {error.province && <span className="error">{error.province}</span>}
          <label>License Plate</label>
          <input
            id="licenseplate"
            name="license_plate"
            placeholder="1กก 1234 กรุงเทพมหานคร"
            onChange={handleChange}
            onBlur={validateForm}
            value={form.license_plate}
            //required
            // onChange={}
            // onBlur={}
          />
          {error.license_plate && (
            <span className="error">{error.license_plate}</span>
          )}
          <label>Rental Price (THB)</label>
          <input
            //type="number"
            id="rentalprice"
            name="rental_price"
            onChange={handleChange}
            onBlur={validateForm}
            value={form.rental_price}
            //required
            // onChange={}
            // onBlur={}
          />
          {error.rental_price && (
            <span className="error">{error.rental_price}</span>
          )}
          <label>Registration Book ID</label>
          <input
            id="bookid"
            name="registration_book_id"
            onChange={handleChange}
            onBlur={validateForm}
            value={form.registration_book_id}
            //required
            // onChange={}
            // onBlur={}
          />
          {error.registration_book_id && (
            <span className="error">{error.registration_book_id}</span>
          )}
          <label>Registration Book Image</label>
          <input
            type="file"
            id="bookimg"
            name="book_img"
            onBlur={validateImage}
            onChange={handleImage}
            accept="image/png, image/gif, image/jpeg"
            style={{width: "90px"}}
            required
          />
          {registration_book_image ? (
            <img src={registration_book_image} alt="registration_book_image" />
          ) : null}

          {error.book_img && <span className="error">{error.book_img}</span>}

          <label>Car Images</label>
          <input
            type="file"
            id="carimages"
            name="car_images"
            multiple
            onChange={handleImage}
            onBlur={validateImage}
            accept="image/png, image/gif, image/jpeg"
            style={{width: "95px"}}
          />
          {car_images ? (
            <div>
              {car_images.map((value) => {
                return <img src={value} alt="car_images" />;
              })}
            </div>
          ) : (
            <></>
          )}

          {error.car_images && (
            <span className="error">{error.car_images}</span>
          )}

          <button type="submit">Register</button>
          {resError && <span className="error">{resError}</span>}
        </form>
      </div>
    </div>
  );
};

export default AddCar;
