import React from "react";

function SearchBox() {
  return (
    <div className="search-box-container mt-4 flex gap-10 p-4 flex-col items-center ">
      <p className="searchbox-text w-fit text-5xl">
        How's the sky looking today?
      </p>
      <div className="search-box-input-container w-fit flex gap-4">
        <input
          type="text"
          id="search-input"
          className="border rounded-md px-24 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a place..."
        />
        <button
          id="search-btn"
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
