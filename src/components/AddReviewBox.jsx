import React from "react";

const AddReviewBox = ({
  hygiene,
  setHygiene,
  carConditon,
  setCarCondition,
  service,
  setService,
  comment,
  setComment,
}) => {
  const RenderStars = ({type, rating}) => {
    const fullStars = Math.floor(rating);
    let cnt = 0;
    return (
      <div className="rating-star">
        {[...Array(fullStars)].map((v, i) => {
          cnt += 1;
          return (
            <button
              className="fa-solid fa-star fa-lg btn"
              onClick={changeRating}
              name={`${type}${cnt}`}
              key={`fullstar${i}`}
            ></button>
          );
        })}
        {[...Array(5 - fullStars)].map((v, i) => {
          cnt += 1;
          return (
            <button
              className="fa-regular fa-star fa-lg btn"
              onClick={changeRating}
              name={`${type}${cnt}`}
              key={`emptystar${i}`}
            ></button>
          );
        })}
      </div>
    );
  };
  const changeRating = (event) => {
    const name = event.target.name;
    const type = name.substr(0, name.length - 1);
    const rating = parseInt(name.slice(-1));
    if (type === "carConditon") {
      setCarCondition(rating);
    } else if (type === "hygiene") {
      setHygiene(rating);
    } else if (type === "service") {
      setService(rating);
    }
  };
  const changeComment = (event) => {
    const {value} = event.target;
    setComment(value);
  };
  return (
    <div className="add-review-box">
      <div className="flex-column">
        <label>Car Conditon Rating</label>
        <RenderStars
          class="rating-star"
          type={"carConditon"}
          rating={carConditon}
        />
      </div>
      <div className="flex-column">
        <label>Hygiene Rating</label>
        <RenderStars class="rating-star" type={"hygiene"} rating={hygiene} />
      </div>
      <div className="flex-column">
        <label>Service Rating</label>
        <RenderStars class="rating-star" type={"service"} rating={service} />
      </div>
      <div className="flex-column">
        <label>Comment</label>
        <textarea name="comment" onChange={changeComment}></textarea>
      </div>
    </div>
  );
};

export default AddReviewBox;
