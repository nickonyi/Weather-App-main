import Navbar from "./components/navbar";
import SearchBox from "./components/searchBox";
import MainContent from "./components/mainContent";
import Error from "./pages/Error";
import { ErrorBoundary } from "react-error-boundary";
import "./styles/App.scss";
import "./styles/index.css";
import { useEffect, useState } from "react";
import CompareDrawer from "./components/CompareDrawer";
import CompareUI from "./pages/CompareUI";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showFavoritesBar, setShowFavoritesBar] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [units, setUnits] = useState({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [compareCities, setCompareCities] = useState([]);
  const [view, setView] = useState("main");

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

  useEffect(() => {
    setLoadingFavorites(true);
    //setShowFavoritesBar(true);

    const timer = setTimeout(() => {
      setIsExiting(true);
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(stored);

      if (stored.length === 0) {
        // hide bar after a delay if there are no favorites
        setTimeout(() => {
          setShowFavoritesBar(false);
          setIsExiting(false);
        }, 4000);
      }

      setLoadingFavorites(false);
    }, 1500);

    return () => clearTimeout(timer);
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

  const handleSelectFavorite = async (city, country) => {
    setLoading(true);
    setShowFavoritesBar(false);
    try {
      // run same logic as handleSearch but using city+country
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&country=${country}`
      );
      const geoData = await geoRes.json();
      const { latitude, longitude, name, country: ctry } = geoData.results[0];

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
      const weatherRes = await fetch(url);
      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        country: ctry,
        current: weatherData.current,
        daily: weatherData.daily,
        hourly: weatherData.hourly,
      });
    } catch (err) {
      console.error("Error fetching favorite weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (cities) => {
    setCompareCities(cities);
    setView("compare");
    setShowCompareDrawer(false);
  };

  return (
    <>
      <Navbar
        units={units}
        setUnits={setUnits}
        favorites={favorites}
        onSelectFavorite={handleSelectFavorite}
      />
      <ErrorBoundary FallbackComponent={Error}>
        {view === "main" && (
          <>
            <SearchBox
              setWeather={setWeather}
              setLoading={setLoading}
              units={units}
              favorites={favorites}
              loadingFavorites={loadingFavorites}
              showFavoritesBar={showFavoritesBar}
              setShowFavoritesBar={setShowFavoritesBar}
              isExiting={isExiting}
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
              onOpenCompare={() => setShowCompareDrawer(true)}
            />
            <CompareDrawer
              isOpen={showCompareDrawer}
              onClose={() => setShowCompareDrawer(false)}
              onCompare={handleCompare}
            />
          </>
        )}
        {view === "compare" && (
          <CompareUI cities={compareCities} onBack={() => setView("main")} />
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
