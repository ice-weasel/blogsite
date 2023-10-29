import React, { useState, useEffect, KeyboardEvent } from "react";

interface SearchBarProps {
  content: string[];
  onSearchResults: (results: number[]) => void;
}

export default function SearchBar({ content, onSearchResults }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchText = searchQuery.toLowerCase();
      const results: number[] = [];

      content.forEach((text, index) => {
        if (text.toLowerCase().includes(searchText)) {
          results.push(index);
        }
      });

      onSearchResults(results);
    } catch (err) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

 ;

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex  py-2 px-6 rounded-full bg-gray-50 border focus-within:border-gray-300">
      <input
        type="text"
        placeholder="Search anything"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={(e) => handleKeyPress(e)}
        className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
      />
      <button
        onClick={handleSearch}
        className="min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 -mr-3"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
     
    </div>
  );
}
