import { FaSpinner } from "react-icons/fa";

function FavoritesBar({ favorites, onSelectFavorite, loading, isExiting }) {
  if (loading) {
    return (
      <div
        className={`favorites-bar bg-gray-800 text-white rounded-md p-2 w-64 transition-transform duration-500 ease-in-out
            ${
              isExiting
                ? "-translate-y-10 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
      >
        <FaSpinner className="animate-spin text-xl" />
        <span>Search in progress…</span>
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <div className="text-center text-gray-400 py-2">
        No favorites yet. Search and save cities to see them here.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {favorites.map((fav, idx) => (
        <button
          id="fav-btn"
          key={idx}
          onClick={() => onSelectFavorite(fav.city, fav.country)}
          className="w-full flex justify-between items-center px-3 py-2 rounded-md transition"
        >
          <span>{fav.city}</span>
        </button>
      ))}
    </div>
  );
}

export default FavoritesBar;
