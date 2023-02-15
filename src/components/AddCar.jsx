import React, {useState, useEffect} from "react";
import axios from "axios";
import {provinces} from "../utils/mockData";
const AddCar = () => {
  const resetForm = {
    brand: "",
    model: "",
    year: "",
    gear_type: "",
    passenger: "",
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

  useEffect(() => {
    if (new_car_images.length < 1) return;
    const URLs = [];
    new_car_images.forEach((image) => URLs.push(URL.createObjectURL(image)));
    setCarImages(car_images.concat(URLs));
  }, [new_car_images]);

  const onImageChange = (e) => {
    setNewCarImages([...e.target.files]);
  };

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      try {
        const res = await axios.get(
          `https://private-anon-25f08158ff-carsapi1.apiary-mock.com/manufacturers`
        );
        let brands = [];
        for (const e of res.data) {
          brands.push(e.name);
        }
        brands.sort();
        setBrands(brands);
      } catch (error) {
        console.error(error);
        handleShowResError(error);
      }
    };

    dataFetch();
  }, []);
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
      } else {
        const index = added.indexOf(value);
        if (index > -1) {
          added.splice(index, 1);
        }
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
            stateObj[name] = "Please select at least one energy type";
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
    if (JSON.stringify(error) !== JSON.stringify(errorForm)) {
      return;
    }

    const data = {
      car: {
        ...form,
        owner: sessionStorage.getItem("username"),
        rating: 5, //under this must be changed
        registration_book_url: `https://image.bangkokbiznews.com/uploads/images/contents/w1024/2021/10/WrsO3P0xh1qMhQYq6m7W.jpg${Math.random()}`,
        car_images: [
          "https://img.khaorot.com/2021/01/21/5Cq7JfHF/dsc02704-83a7.jpg",
          "https://img.khaorot.com/2021/01/21/5Cq7JfHF/dsc02700-0888.jpg",
          "https://img.khaorot.com/2021/01/22/5Cq7JfHF/12000-eed2.jpg",
          "https://img.khaorot.com/2021/01/21/5Cq7JfHF/dsc02715-2447.jpg",
          "https://img.khaorot.com/2021/01/21/5Cq7JfHF/dsc02718-c974.jpg",
        ],
      },
    };

    try {
      const res = await axios.post(`http://localhost:8080/car`, data, {
        withCredentials: true,
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
    }, 3000);
  };

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
          >
            <option disabled hidden></option>
            {brands.map((brand) => {
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
          />
          {error.model && <span className="error">{error.model}</span>}
          <label>Year</label>
          <select
            name="year"
            id="year"
            onChange={handleChange}
            onBlur={validateForm}
            defaultValue=""
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
          {energy_types.map((type) => {
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
          ></input>
          {error.passenger && <span className="error">{error.passenger}</span>}

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
          />
          {registration_book_image ? (
            <img src={registration_book_image} />
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
          <div>
            {car_images.map((value) => {
              return <img src={value} />;
            })}
          </div>
          {error.car_images && (
            <span className="error">{error.car_images}</span>
          )}

          <button type="submit" disabled={form === resetForm}>
            Register
          </button>
          {resError && <span className="error">{resError}</span>}
        </form>
      </div>
    </div>
  );
};

export default AddCar;
