import React from 'react';
import Star from './Star';

function Rating({rating, showId}) {
  const amountOfFilledStars = Math.round(rating / 2);

  const stars = [
    ...new Array(amountOfFilledStars).fill(1),
    ...new Array(5 - amountOfFilledStars).fill(0),
  ];

  return (
    <div className="flex items-center mt-1">
      {stars.map((star, index) => {
        return <Star filled={star} key={`star-${showId}-${index}`} />;
      })}
    </div>
  );
}

export default Rating;
