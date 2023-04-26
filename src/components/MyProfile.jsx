import axios from "axios";
import {useEffect, useMemo} from "react";
import Config from "../assets/configs/configs.json";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const MyProfile = ({
  isEdit,
  setIsEdit,
  userInfo,
  setUserInfo,
  imageFile,
  fetchUserInfo,
}) => {
  const schema = yup.object().shape({
    firstName: yup.string().matches(/^[A-z\u0E00-\u0E7F]+$/, {
      excludeEmptyString: true,
      message: "Name can only contain letters",
    }),
    lastName: yup.string().matches(/^[A-z\u0E00-\u0E7F]+$/, {
      excludeEmptyString: true,
      message: "Name can only contain letters",
    }),
    phoneNumber: yup
      .string()
      .matches(/^$|^[0-9]{10}$/,{
        excludeEmptyString: true,
        message: "Please enter a valid phone number",
      })
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return userInfo;
    }, [userInfo]),
  });

  const submitUserInfo = async (data) => {
    try {
      const id = localStorage.getItem("user_id");
      const formData = new FormData();
      formData.append("id", id);

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }
      await axios.patch(`${Config.BACKEND_URL}/user/info`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEdit(false);
      fetchUserInfo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset(userInfo);
  }, [userInfo]);

  return (
    <form onSubmit={handleSubmit(submitUserInfo)}>
      <div className="my-profile">
        <div className="header">
          <h2>My profile</h2>
          {isEdit && <button type="submit">Save</button>}
          {!isEdit && (
            <button type="button" onClick={() => setIsEdit(true)}>
              Edit
            </button>
          )}
        </div>
        <div className="info-container">
          {userInfo &&
            Object.keys(userInfo).map((key, index) => {
              if (key === "image") return null;
              return (
                <div className="text" key={`${key}`}>
                  <h5 className="label">{key}</h5>
                  {isEdit ? (
                    key === "prefix" ? (
                      <select
                        id={`${key}`}
                        name={`${key}`}
                        {...register(key, {})}
                      >
                        {[
                          "not set",
                          "Mr.",
                          "Mrs.",
                          "Miss",
                          "Ms.",
                          "(Not Specific)",
                        ].map((each, index) => (
                          <option key={index} value={each}>
                            {each}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="input-error">
                        <input
                          id={`${key}`}
                          name={`${key}`}
                          className=""
                          disabled={
                            key === "username" ||
                            key === "email" ||
                            key === "image" ||
                            key === "role"
                          }
                          {...register(key, {})}
                        />
                        {errors[key]?.message && (
                          <span className="error">{errors[key]?.message}</span>
                        )}
                      </div>
                    )
                  ) : (
                    <h5 className="value">{userInfo[key]}</h5>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </form>
  );
};

export default MyProfile;
