import iconSunny from "../assets/images/icon-sunny.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import { useEffect, useState } from "react";

function MainContent({ weather, loading }) {
  if (!weather) {
    return null;
  }

  const { city, country, current, daily, hourly } = weather;
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    return today;
  });

  const groupHourlyByDay = (hourly) => {
    const grouped = {};

    hourly.time.forEach((t, i) => {
      const date = new Date(t);
      const dayLabel = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      if (!grouped[dayLabel]) {
        grouped[dayLabel] = [];
      }

      grouped[dayLabel].push({
        time: t,
        temp: Math.round(hourly.temperature_2m[i]),
      });
    });
    return grouped;
  };
  const grouped = groupHourlyByDay(hourly);
  const days = Object.keys(grouped);

  useEffect(() => {
    if (!selectedDay && days.length > 0) {
      selectedDay[days[0]];
    }
  }, [days, selectedDay]);

  const getWeatherIcon = (tempMax) => {
    if (tempMax >= 30) {
      return iconSunny;
    } else if (tempMax >= 20) {
      return iconOvercast;
    } else if (tempMax >= 10) {
      return iconRain;
    } else if (tempMax >= 0) {
      return iconStorm;
    } else {
      return iconSnow;
    }
  };

  const currentTemp = Math.round(current.temperature_2m);
  const currentIcon = getWeatherIcon(currentTemp);

  const now = new Date();
  const startIndex = hourly.time.findIndex(
    (t) => new Date(t).getHours() === now.getHours()
  );
  const safeIndex = startIndex !== -1 ? startIndex : 0;

  return (
    <main className="main-content flex mt-8 pl-24 pr-8 gap-8">
      <div className="daily-forecast-container flex-2 flex flex-col gap-8">
        <div className="weather-banner-section flex flex-col gap-8 px-4 ">
          <div className="weather-conditions-container rounded-lg h-64 border-red-500 flex justify-between items-center px-8">
            <div className="weather-text-container flex flex-col gap-2">
              <h2 className="weather-location text-2xl font-semibold">
                {city}, {country}
              </h2>
              <p className="weather-date text-white-200 font-light">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="weather-icon-temp-container flex items-center gap-8">
              <div className="weather-icon">
                <img src={currentIcon} alt="Sunny" />
              </div>
              <p className="weather-temp text-8xl">
                {Math.round(current.temperature_2m)}°
              </p>
            </div>
          </div>
          <div className="weather-conditions-metrics-container flex gap-4">
            <div className="weather-metric">
              <h3 className="weather-metric-header">Feels like</h3>
              <p className="weather-metric-value">
                {loading ? "--" : Math.round(current.temperature_2m)}°
              </p>
            </div>
            <div className="weather-metric">
              <h3 className="weather-metric-header">Humidity</h3>
              <p className="weather-metric-value">
                {current.relative_humidity_2m}%
              </p>
            </div>
            <div className="weather-metric">
              <h3 className="weather-metric-header">Wind</h3>
              <p className="weather-metric-value">
                {Math.round(current.windspeed_10m)} km/h
              </p>
            </div>
            <div className="weather-metric">
              <h3 className="weather-metric-header">Precipitation</h3>
              <p className="weather-metric-value">
                {" "}
                {current.precipitation} mm
              </p>
            </div>
          </div>
        </div>
        <div className="daily-forecast-section mt-8">
          <h2 className="daily-forecast-header mb-4">Daily Forecast</h2>
          <div className="daily-forecast-cards flex gap-4">
            {daily.time.map((date, i) => {
              const maxTemp = Math.floor(daily.temperature_2m_max[i]);
              const icon = getWeatherIcon(maxTemp);

              return (
                <div
                  key={date}
                  className="daily-forecast-card  p-4 flex flex-col items-center"
                >
                  <p className="daily-forecast-day mb-2">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <div className="daily-forecast-icon mb-2">
                    <img src={icon} alt="Weather icon" />
                  </div>
                  <div className="daily-forecast-temp-container flex justify-between w-16">
                    <p className="daily-forecast-temp high">
                      {Math.floor(daily.temperature_2m_max[i])}°
                    </p>
                    <p className="daily-forecast-temp low">
                      {Math.floor(daily.temperature_2m_min[i])}°
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hourly-forecast-container flex-1">
        <div className="hourly-forecast-section p-4">
          <div className="hourly-forecast-header flex justify-between items-center pt-6">
            <h2 className="flex item-center ">Hourly Forecast</h2>
            <div className="date-dropdown">
              <select
                name="date"
                id="date-select"
                className="w-32 rounded-lg  p-2 bg-gray-500"
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {Object.keys(grouped).map((day) => {
                  const date = new Date(grouped[day][0].time);
                  const dayOnly = date.toLocaleDateString("en-US", {
                    weekday: "long",
                  });

                  return (
                    <option key={day} value={day}>
                      {dayOnly}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="hourly-forecast-cards flex flex-col gap-4 mt-4">
            {grouped[selectedDay]?.slice(0, 7).map((entry) => {
              const currentIcon = getWeatherIcon(entry.temp);
              return (
                <div
                  key={entry.time}
                  className="hourly-forecast-card  p-4 flex justify-between items-center"
                >
                  <div className="time-container flex items-center gap-2">
                    <img src={currentIcon} alt="Weather icon" />
                    <p className="time">
                      {new Date(entry.time).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div className="temperature-container">
                    <p className="temperature">{entry.temp}°</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
