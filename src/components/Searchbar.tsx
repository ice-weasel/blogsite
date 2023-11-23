import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";

export  interface SearchBarProps {
  onSearch: (value:string ) => void; // Use the same structure as your EventCard data
 
}


const SearchBar = (props: SearchBarProps ) => {
  
const {onSearch} = props;
  const [value,setValue] = useState('Enter search...')

  const searchHandler = (event:ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      setValue(target.value)
      console.log(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      onSearch(value)
      console.log(value)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex border-2 rounded">
        <input
          type={'search'}
          name={'search'}
          className="px-4 py-2 w-80"
          placeholder={value}
          onChange={searchHandler}
          onKeyDown={handleKeyDown}
         
        />
        <button className="flex items-center justify-center px-4 border-l">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
            />
          </svg>
        </button>
      </div>

      
    </div>
  );
};

export default SearchBar;
