import React from "react";

function SearchBox() {
  return (
    <div className="search-box-container mt-4 flex gap-10 p-4 flex-col items-center ">
      <p className="searchbox-text w-fit text-5xl">
        How's the sky looking today?
      </p>
      <div className="search-box-input-container w-fit">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a place..."
        />
        <button id="search-btn">Search</button>
      </div>
    </div>
  );
}

export default SearchBox;
