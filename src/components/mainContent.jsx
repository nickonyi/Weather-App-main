import iconSunny from "../assets/images/icon-sunny.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";

function MainContent({ weather }) {
  if (!weather) {
    return null;
  }

  const { city, country, current, daily, hourly } = weather;
  console.log(current);

  return (
    <main className="main-content flex mt-8 pl-24 pr-8 gap-8">
      <div className="daily-forecast-container flex-2 flex flex-col gap-8">
        <div className="weather-banner-section flex flex-col gap-8 px-4 ">
          <div className="weather-conditions-container h-64 border-red-500 flex justify-between items-center px-8">
            <div className="weather-text-container">
              <h2 className="weather-location">
                {city}, {country}
              </h2>
              <p className="weather-date">
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
                <img src={iconSunny} alt="Sunny" />
              </div>
              <p className="weather-temp text-8xl">
                {Math.round(current.temperature)}°
              </p>
            </div>
          </div>
          <div className="weather-conditions-metrics-container flex gap-4">
            <div className="weather-metric">
              <h3 className="weather-metric-header">Feels like</h3>
              <p className="weather-metric-value">
                {Math.round(current.temperature)}°
              </p>
            </div>
            <div className="weather-metric">
              <h3 className="weather-metric-header">Humidity</h3>
              <p className="weather-metric-value">
                {current.humidity ? `${current.humidity}%` : "--"}
              </p>
            </div>
            <div className="weather-metric">
              <h3 className="weather-metric-header">Wind</h3>
              <p className="weather-metric-value">
                {Math.round(current.windspeed)} km/h
              </p>
            </div>
            <div className="weather-metric">
              <h3 className="weather-metric-header">Precipitation</h3>
              <p className="weather-metric-value">
                {" "}
                {current.precipitation ? `${current.precipitation} mm` : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="daily-forecast-section mt-8">
          <h2 className="daily-forecast-header mb-4">Daily Forecast</h2>
          <div className="daily-forecast-cards flex gap-4">
            {daily.time.map((date, i) => (
              <div
                key={date}
                className="daily-forecast-card border p-4 flex flex-col items-center"
              >
                <p className="daily-forecast-day mb-2">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <div className="daily-forecast-icon mb-2">
                  <img src={iconStorm} alt="Sunny" />
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
            ))}
          </div>
        </div>
      </div>

      <div className="hourly-forecast-container flex-1">
        <div className="hourly-forecast-section border p-4">
          <div className="hourly-forecast-header flex justify-between items-center">
            <h2 className="flex item-center ">Hourly Forecast</h2>
            <div className="date-dropdown">
              <select
                name="date"
                id="date-select"
                className="border w-32 rounded-lg  p-2 bg-gray-500"
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>
          </div>
          <div className="hourly-forecast-cards flex flex-col gap-4 mt-4">
            {hourly.time.slice(0, 7).map((time, i) => (
              <div className="hourly-forecast-card border p-4 flex justify-between items-center">
                <div className="time-container flex items-center gap-2">
                  <img src={iconSunny} alt="Sunny" />
                  <p className="time">{new Date(time).getHours()} PM</p>
                </div>
                <div className="temperature-container">
                  <p className="temperature">
                    {Math.round(hourly.temperature_2m[i])}°
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
