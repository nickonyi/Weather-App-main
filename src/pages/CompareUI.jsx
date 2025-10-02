function CompareUI({ cities, onBack }) {
  console.log(cities);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Comparison</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cities.map((city, idx) => (
          <div key={idx} className="p-4 bg-gray-500 rounded shadow">
            <h2 className="font-bold">
              {city.name}, {city.country}
            </h2>
            <p>Lat: {city.lat}</p>
            <p>Lon: {city.lon}</p>
            {/* later we can display weather data here */}
          </div>
        ))}
      </div>

      <button onClick={onBack} className="mt-6 bg-gray-300 px-4 py-2 rounded">
        Back
      </button>
    </div>
  );
}

export default CompareUI;
