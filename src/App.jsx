import Navbar from "./components/navbar";
import SearchBox from "./components/searchBox";
import MainContent from "./components/mainContent";
import Error from "./pages/Error";
import { ErrorBoundary } from "react-error-boundary";
import "./styles/App.scss";
import "./styles/index.css";
import { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [units, setUnits] = useState({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        setLoading(true);
        try {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;

          const geourl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
          const georesp = await fetch(geourl);
          const location = await georesp.json();
          const city = location.city;
          const country = location.countryName;

          const params = new URLSearchParams({
            latitude,
            longitude,
            current:
              "temperature_2m,relative_humidity_2m,precipitation,weathercode,windspeed_10m",
            hourly: "temperature_2m,weathercode",
            daily:
              "temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum",
            timezone: "auto",
            temperature_unit: units.temperature,
            windspeed_unit: units.wind,
            precipitation_unit: units.precipitation,
          });

          const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

          const res = await fetch(url);
          const data = await res.json();

          setWeather({
            city,
            country,
            current: data.current,
            daily: data.daily,
            hourly: data.hourly,
          });
        } catch (error) {
          console.error("Geolocation fetch error:", error);
        } finally {
          setLoading(false);
        }
      });
    }
  }, []);

  //load from the local storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  //save when favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavourite = (city, country) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (fav) => fav.city === city && fav.country === country
      );

      if (exists) {
        return prev.filter(
          (fav) => fav.city !== city || fav.country !== country
        );
      } else {
        return [...prev, { city, country }];
      }
    });
  };

  return (
    <>
      <Navbar units={units} setUnits={setUnits} />
      <ErrorBoundary FallbackComponent={Error}>
        <SearchBox
          setWeather={setWeather}
          setLoading={setLoading}
          units={units}
        />
        <MainContent
          weather={weather}
          loading={loading}
          units={units}
          isFavorite={favorites.some(
            (fav) =>
              fav.city === weather?.city && fav.country === weather?.country
          )}
          onToggleFavorite={() =>
            toggleFavourite(weather?.city, weather?.country)
          }
        />
      </ErrorBoundary>
    </>
  );
}

export default App;
