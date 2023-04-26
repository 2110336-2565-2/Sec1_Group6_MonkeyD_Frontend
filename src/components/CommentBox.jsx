import React from "react";
const RenderStars = ({rating}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  console.log("====================================");
  console.log(typeof rating, fullStars, halfStar);
  console.log("====================================");
  return (
    <div className="rating-star">
      {[...Array(fullStars)].map((v, i) => (
        <i className="fa-solid fa-star fa-lg" key={`fullstar${i}`}></i>
      ))}
      {halfStar === 1 && <i className="fa-solid fa-star-half-stroke fa-lg"></i>}
      {[...Array(5 - fullStars - halfStar)].map((v, i) => (
        <i className="fa-regular fa-star fa-lg" key={`emptystar${i}`}></i>
      ))}
    </div>
  );
};

const CommentBox = ({
  carRating,
  hygieneRating,
  serviceRating,
  carConditionRating,
  reviews,
}) => {
  const filters = ["Highest Rating", "Lowest Rating", "Oldest", "Newest"];
  return (
    <div>
      {reviews.length > 0 ? (
        <div className="comment-box">
          <div className="container rating">
            <div className="overall-rating">
              <h4>overall</h4>
              <h1 className="point">{carRating.toFixed(2)}</h1>
            </div>
            <div className="types-rating">
              <div className="type">
                <h4>Car Conditon</h4>
                <i className="fa-solid fa-star" />
                <h4>{carConditionRating.toFixed(2)}</h4>
              </div>
              <div className="type">
                <h4>Hygiene</h4>
                <i className="fa-solid fa-star" />
                <h4>{hygieneRating.toFixed(2)}</h4>
              </div>
              <div className="type">
                <h4>Service</h4>
                <i className="fa-solid fa-star" />
                <h4>{serviceRating.toFixed(2)}</h4>
              </div>
            </div>
          </div>
          {/* <div className="container">
        <p>Sort By</p>
        <select
          name="sortby"
          id="sortby"
          class="sort-by"
          //onChange={}
          defaultValue=""
        >
          {filters.map((sort) => {
            return (
              <option key={sort} value={sort}>
                {sort}
              </option>
            );
          })}
        </select>
      </div> */}
          <div className="reviews">
            {reviews.map((review) => {
              return (
                <div className="review">
                  <div className="container user">
                    <img src={review.reviewerImg} alt="Reviewer" />
                    <p>{review.reviewer}</p>
                    <RenderStars class="rating-star" rating={review.rating} />
                  </div>
                  <p className="review-paragraph">{review.comment}</p>
                  <p className="review-date">{review.createdAt}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="comment-box">
          <h3 className="no-review">- No Review -</h3>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
