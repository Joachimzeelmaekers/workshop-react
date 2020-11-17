import React from 'react';

function Select({
  selectedValue,
  label = '',
  options = [],
  updateSelectedValue,
}) {
  const handleChange = (event) => {
    const value = event.target.value;
    updateSelectedValue(value);
  };

  return (
    <div className="inline-block relative w-64 flex text-sm h-10 mt-5 mr-5">
      <label
        className="w-full flex"
        style={{alignItems: 'center', fontWeight: 'bold'}}
      >
        {label}
      </label>
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value=""></option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}

export default Select;
