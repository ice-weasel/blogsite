"use client"
import React, { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<number[]>([]);

  const handleSearch = () => {
    const searchText = searchQuery.toLowerCase();
    const paragraphs = document.querySelectorAll("p"); // Change this selector to match your content structure

    const results: number[] = [];
    paragraphs.forEach((paragraph, index) => {
      const text = paragraph.textContent?.toLowerCase() || "";
      if (text.includes(searchText)) {
        results.push(index);
        paragraph.innerHTML = text.replace(
          new RegExp(searchText, "gi"),
          (match) => `<span class="highlight">${match}</span>`
        );
      }
    });

    setSearchResults(results);
  };

  const clearHighlights = () => {
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach((paragraph) => {
      paragraph.innerHTML = paragraph.textContent || "";
    });
    setSearchResults([]);
  };

  return (
    <main>
      <div className=" py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
        <input
          type="text"
          placeholder="Search anything"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
        />
        <div className="flex flex-rows ">
        <button onClick={handleSearch} className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3">
          Search
        </button>
       
        </div>
      </div>
      
    </main>
  );
}
