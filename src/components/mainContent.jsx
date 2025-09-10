import iconSunny from "../assets/images/icon-sunny.webp";

function MainContent() {
  return (
    <main className="main-content flex mt-8 px-24 gap-8">
      <div className="daily-forecast-container flex-2">
        <div className="weather-conditions-container h-52 border-red-500 flex justify-between items-center px-8">
          <div className="weather-text-container">
            <h2 className="weather-location">Berlin, Germany</h2>
            <p className="weather-date">Tuesday,Aug 5 2025</p>
          </div>
          <div className="weather-icon-temp-container flex items-center gap-8">
            <div className="weather-icon">
              <img src={iconSunny} alt="Sunny" />
            </div>
            <p className="weather-temp text-8xl">20°</p>
          </div>
        </div>
        <div className="weather-conditions-metrics-container flex">
          <div className="weather-metric">
            <h3 className="weather-metric-header">Feels like</h3>
            <p className="weather-metric-value">18°</p>
          </div>
          <div className="weather-metric">
            <h3 className="weather-metric-header">Humidity</h3>
            <p className="weather-metric-value">46%</p>
          </div>
          <div className="weather-metric">
            <h3 className="weather-metric-header">Wind</h3>
            <p className="weather-metric-value">14km/h</p>
          </div>
          <div className="weather-metric">
            <h3 className="weather-metric-header">Precipitation</h3>
            <p className="weather-metric-value">0 mm</p>
          </div>
        </div>
      </div>
      <div className="hourly-forecast-container flex-1"></div>
    </main>
  );
}

export default MainContent;
