import React, {useEffect, useState, useMemo} from 'react';
import Card from '../../components/Card';
import Select from '../../components/higherOrderComponents/Select';
import Search from '../../components/Search';

const API_URL = '/data/shows.json';
const SORTABLE_KEYS = ['name', 'rating'];

function ShowsOverview() {
  const [shows, setShows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedSortableKey, setSelectedSortableKey] = useState('');

  const fetchShows = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    setShows(data);
    setGenres([...new Set(data.map((show) => show.genres).flat())]);
  };

  const searchShows = (value) => {};

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (searchValue) {
      searchShows(searchValue);
    }
  }, [searchValue]);

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue.toLowerCase());
  };

  const filteredShows = useMemo(() => {
    let sortedShows = shows;
    if (selectedSortableKey) {
      sortedShows = shows.sort((a, b) => {
        if (a[selectedSortableKey] > b[selectedSortableKey]) return -1;
        if (a[selectedSortableKey] < b[selectedSortableKey]) return 1;
        return 0;
      });
    }

    if (!searchValue && !selectedGenre) {
      return sortedShows;
    }

    return sortedShows.filter(
      (show) =>
        show.genres.includes(selectedGenre) &&
        show.description.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [shows, searchValue, selectedGenre, selectedSortableKey]);

  return (
    <div className="w-full">
      <header className="bg-white flex justify-between align-center">
        <div className="max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Series
          </h1>
        </div>
        <Search
          search={handleSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </header>
      <div className="flex px-4 sm:px-6 lg:px-8">
        <Select
          label={'Sort by'}
          options={SORTABLE_KEYS}
          selectedValue={selectedSortableKey}
          updateSelectedValue={setSelectedSortableKey}
        />
        <Select
          label={'Select genre'}
          options={genres}
          selectedValue={selectedGenre}
          updateSelectedValue={setSelectedGenre}
        />
      </div>
      <div className="antialiased font-sans flex flex-wrap mb-4 p-6">
        {filteredShows.map((show) => (
          <Card show={show} key={`${show.name}-${show.id}`} />
        ))}
      </div>
    </div>
  );
}

export default ShowsOverview;
