import React, {useEffect, useState} from 'react';
import Rating from '../../components/Rating';
import Search from '../../components/Search';

// const API_URL = "https://api.tvmaze.com";

function ShowsOverview() {
  const [shows, setShows] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const fetchShows = async () => {
    const response = await fetch('/data/shows.json');
    const data = await response.json();
    setShows(data);
  };

  useEffect(() => {
    if (!searchValue) {
      fetchShows();
    }
  }, [searchValue]);

  const handleSearch = (searchValue) => {
    const foundShows = shows.filter((show) =>
      show.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setShows(foundShows);
  };

  return (
    <div className="w-full">
      <header class="bg-white flex justify-between align-center">
        <div class="max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Series</h1>
        </div>
        <Search
          search={handleSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </header>
      <div className="antialiased font-sans flex flex-wrap mb-4 p-6 ">
        {shows.map((show) => {
          const shortSummary = show.description.slice(0, 100) + '...';
          return (
            <div
              className="image-container w-1/4 max-w-sm p-2"
              key={`${show.name}-${show.id}`}
            >
              <div className="container rounded overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer pt-1">
                <img
                  className="w-full image"
                  src={show.image}
                  alt={show.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-l mb-2">{show.name}</div>
                  <p
                    className="text-gray-700 text-base"
                    dangerouslySetInnerHTML={{__html: shortSummary}}
                  ></p>
                  <button className="my-6 text-blue-500 hover:text-blue-800">
                    Show full description
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
        })}
      </div>
    </div>
  );
}

export default ShowsOverview;
