import { useState } from "react";

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
        className={`fixed top-0 right-0 lg:w-80 w-full h-full  shadow-lg z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 mt-8 flex flex-col  gap-4 h-80 border">
          <p>Select Location to compare</p>
          {/* Search bar */}
          <div className="search-bar flex gap-2 ">
            <input
              type="text"
              placeholder="Search city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border p-2 rounded "
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
                className="flex justify-between items-center p-2 bg-gray-100 rounded"
              >
                <span>{city}</span>
                <button
                  onClick={() =>
                    setSelectedCities(selectedCities.filter((c) => c !== city))
                  }
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Compare button */}
          <button
            onClick={() => onCompare(selectedCities)}
            className="mt-auto bg-green-500 text-white p-2 rounded"
          >
            Compare Now
          </button>
        </div>
      </div>
    </>
  );
}
