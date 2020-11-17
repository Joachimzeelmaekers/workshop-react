import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Rating from './Rating';

function Card({show}) {
  const history = useHistory();
  const [descriptionOpened, setDescriptionOpened] = useState(false);
  let description = descriptionOpened
    ? show.description
    : show.description.slice(0, 100) + '...';

  const goToDetail = () => {
    history.push(`/shows/${show.id}`);
  };

  return (
    <div className="image-container w-1/4 max-w-sm p-2" onClick={goToDetail}>
      <div className="container rounded overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer pt-1">
        <img className="w-full image" src={show.image} alt={show.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-l mb-2">{show.name}</div>
          <p
            className="text-gray-700 text-base"
            dangerouslySetInnerHTML={{__html: description}}
          ></p>
          <button
            className="text-sm text-blue-500 hover:text-blue-800"
            onClick={(event) => {
              event.stopPropagation();
              setDescriptionOpened((prevState) => !prevState);
            }}
          >
            {descriptionOpened ? 'Toggle description' : 'Show full description'}
          </button>
          <Rating showId={show.id} rating={show.rating} />
        </div>
        <div className="px-6 pt-4 pb-2">
          {show.genres.map((genre) => (
            <span
              key={`${show.name}-${genre}`}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
