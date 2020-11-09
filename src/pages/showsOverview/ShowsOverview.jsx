import React, {useEffect, useState} from 'react';

// const API_URL = "https://api.tvmaze.com";

function ShowsOverview() {
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    const response = await fetch('/data/shows.json');
    const data = await response.json();
    setShows(data);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className="antialiased font-sans flex flex-wrap mb-4">
      {shows.map((show) => {
        return (
          <div className="image-container w-1/4 p-2">
            <div className="container rounded overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer pt-1">
              <img
                className="w-full image"
                src={show.image}
                height="100"
                alt={show.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-l mb-2">{show.name}</div>
                <p
                  className="text-gray-700 text-base"
                  dangerouslySetInnerHTML={{__html: show.description}}
                ></p>
                <button className="my-6 text-blue-500 hover:text-blue-800">
                  Show full description
                </button>
                <div className="flex items-center mt-1">{show.rating}/10</div>
              </div>

              <div className="px-6 pt-4 pb-2">
                {show.genres.map((genre) => (
                  <span
                    key={show.title + show.genre}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowsOverview;
