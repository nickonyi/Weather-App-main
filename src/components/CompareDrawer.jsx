import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function CompareDrawer({ isOpen, onClose, onCompare }) {
  const [selectedCities, setSelectedCities] = useState([]);
  const [query, setQuery] = useState("");

  const handleAddCity = () => {
    if (query && !selectedCities.includes(query)) {
      setSelectedCities([...selectedCities, query]);
      setQuery("");
    }
  };

  return (
    <>
      {/* Modal backdrop */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />
      )}

      {/* Side drawer */}

      <div
        id="side-drawer"
        className={`fixed top-0 right-0 lg:w-80 w-full h-full  shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div id="drawer-card" className="p-4 mt-8 flex flex-col  gap-4 h-80 ">
          <p>Select Location to compare</p>
          {/* Search bar */}
          <div className="search-bar flex gap-2 ">
            <input
              type="text"
              placeholder="Search for a place..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className=" p-2 rounded "
            />
            <button
              onClick={handleAddCity}
              className="bg-blue-500 text-white p-2 rounded "
            >
              Add
            </button>
          </div>

          {/* Selected cities */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {selectedCities.map((city, idx) => (
              <div
                key={idx}
                className="city-bar flex justify-between items-center p-2  rounded"
              >
                <span>{city}</span>
                <button
                  onClick={() =>
                    setSelectedCities(selectedCities.filter((c) => c !== city))
                  }
                  className="p-1 "
                >
                  <FiX className="w-4 h-4 text-white-600 cursor-pointer" />
                </button>
              </div>
            ))}
          </div>

          {/* Compare button */}
          <button
            onClick={() => onCompare(selectedCities)}
            className="mt-auto bg-blue-500 text-white p-2 rounded"
          >
            Compare Now
          </button>
        </div>
      </div>
    </>
  );
}
