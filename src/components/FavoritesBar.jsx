import { FaSpinner } from "react-icons/fa";

function FavoritesBar({ favorites, onSelectFavorite, loading }) {
  console.log(loading);

  if (!favorites.length && !loading) {
    return (
      <div className="text-center text-gray-400 py-2">
        No favorites yet. Search and save cities to see them here.
      </div>
    );
  }

  if (loading) {
    <div className="favorites-bar w-64 lg:w-fit bg-gray-800 text-white rounded-md mt-2 p-2 flex  items-center gap-2">
      <FaSpinner className="animate-spin text-xl" />
      <span>Search in progress…</span>
    </div>;
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
