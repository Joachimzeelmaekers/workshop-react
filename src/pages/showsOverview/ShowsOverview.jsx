import React, {useEffect, useState, useMemo} from 'react';
import Card from '../../components/Card';
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

  const genres = useMemo(() => {
    return [...new Set(shows.map((show) => show.genres).flat())];
  }, [shows]);

  console.log(genres);

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
      <div className="antialiased font-sans flex flex-wrap mb-4 p-6">
        {shows.map((show) => (
          <Card show={show} key={`${show.name}-${show.id}`} />
        ))}
      </div>
    </div>
  );
}

export default ShowsOverview;
