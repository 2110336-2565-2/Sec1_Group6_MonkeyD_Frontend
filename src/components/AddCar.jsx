import React, {useState, useEffect} from "react";
import axios from "axios";

const AddCar = () => {
  const resetForm = {
    brand: "",
    model: "",
    year: "",
    gear_type: "",
    passengers: "",
    energy_types: [],
    province: "",
    license_plate: "",
    rental_price: "",
    registration_book_id: "",
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
  const [error, setError] = useState(resetForm);
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
        //console.log(res.data);
        let brands = [];
        for (const e of res.data) {
          brands.push(e.name);
        }
        brands.sort();
        setBrands(brands);
        // for (const e of brands) {
        //   console.log(e);
        // }
      } catch (error) {
        console.error(error);
        //handleShowResError(error.response.data.error);
      }
    };

    dataFetch();
  }, []);
  const numberValidator = (value) => {
    if (value.length > 0) {
      const last = value.charAt(value.length - 1);
      console.log("last", last);
      if (!last.match(/^(\d)$/) || (value.length == 1 && last == "0")) {
        return value.slice(0, value.length - 1);
      }
    }
    return value;
  };
  const handleImage = async (event) => {
    const {name, files} = event.target;
    console.log(files, files.length);
    if (name === "book_img") {
      setBookImg(URL.createObjectURL(files[0]));
    } else if (name === "car_images") {
      onImageChange(event);
    }
    validateImage(event);
  };
  const validateImage = (event) => {
    let {name} = event.target;
    setError((prev) => {
      const stateObj = {...prev, [name]: ""};
      switch (name) {
        case "book_img":
          if (!registration_book_image) {
            stateObj[name] = "Please insert registration_book_image.";
          }
          break;

        case "car_images":
          if (car_images.length < 5) {
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
    console.log(name, value, typeof value);
    console.log(form.energy_types);
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
    } else if (name === "passengers" || name === "rental_price") {
      added = numberValidator(value);
      console.log("num", added);
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

        case "passengers":
          if (!value) {
            stateObj[name] = "Please enter the number of passengers";
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

  return (
    <div className="addcar-container">
      <div className="addcar-box">
        <h2>Register Your Car</h2>
        <form
          //onSubmit={}
          className="addcar-form"
        >
          <label>Brand</label>
          <select
            name="brand"
            id="brand"
            onChange={handleChange}
            onBlur={validateForm}
          >
            <option selected disabled hidden></option>
            {brands.map((brand) => {
              return <option value={brand}>{brand}</option>;
            })}
            {/* <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option> */}
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
          >
            <option selected disabled hidden></option>
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
              id="automatic"
              name="gear_type"
              value="automatic"
              onChange={handleChange}
              onBlur={validateForm}
            />
            <label for="age1">Automatic</label>
            <input
              type="radio"
              id="manual"
              name="gear_type"
              value="manual"
              onChange={handleChange}
              onBlur={validateForm}
            />
            <label for="manual">Manual</label>
          </div>
          {error.gear_type && <span className="error">{error.gear_type}</span>}
          <label>Energy Types</label>
          {energy_types.map((type) => {
            return (
              <div>
                <input
                  type="checkbox"
                  id={type}
                  name="energy_types"
                  value={type}
                  onChange={handleChange}
                  onBlur={validateForm}
                />
                <label for={type}>{type}</label>
              </div>
            );
          })}
          {error.energy_types && (
            <span className="error">{error.energy_types}</span>
          )}
          <label>Passengers</label>
          <input
            name="passengers"
            // type="number"
            // min="0"
            onChange={handleChange}
            onBlur={validateForm}
            value={form.passengers}
          ></input>
          {error.passengers && (
            <span className="error">{error.passengers}</span>
          )}
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
            onChange={onImageChange}
            onBlur={validateImage}
            accept="image/png, image/gif, image/jpeg"
          />
          <div>
            {car_images.map((value) => {
              return <img src={value} />;
            })}
          </div>
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
