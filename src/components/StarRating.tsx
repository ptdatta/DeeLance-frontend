import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({
  totalStars = 5,
  initialRating = 0,
  onRate = () => {},
}: any) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
              onClick={() => {
                setRating(ratingValue);
                onRate(ratingValue);
              }}
            />
            <FaStar
              className="mx-1"
              size={21}
              color={ratingValue <= (hover || rating) ? "yellow" : "gray"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
