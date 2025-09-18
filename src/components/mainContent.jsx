import iconSunny from "../assets/images/icon-sunny.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";

function MainContent({ weather }) {
  if (!weather) {
    return null;
  }
  return (
    <main className="main-content flex mt-8 pl-24 pr-8 gap-8">
      <div className="daily-forecast-container flex-2 flex flex-col gap-8">
        <div className="weather-banner-section flex flex-col gap-8 px-4 ">
          <div className="weather-conditions-container h-64 border-red-500 flex justify-between items-center px-8">
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
          <div className="weather-conditions-metrics-container flex gap-4">
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
        <div className="daily-forecast-section mt-8">
          <h2 className="daily-forecast-header mb-4">Daily Forecast</h2>
          <div className="daily-forecast-cards flex gap-4">
            <div className="daily-forecast-card border p-4 flex flex-col items-center">
              <p className="daily-forecast-day mb-2">Tue</p>
              <div className="daily-forecast-icon mb-2">
                <img src={iconSunny} alt="Sunny" />
              </div>
              <div className="daily-forecast-temp-container flex justify-between w-16">
                <p className="daily-forecast-temp high">18°</p>
                <p className="daily-forecast-temp low">12°</p>
              </div>
            </div>
            <div className="daily-forecast-card border p-4 flex flex-col items-center">
              <p className="daily-forecast-day mb-2">Wed</p>
              <div className="daily-forecast-icon mb-2">
                <img src={iconStorm} alt="Sunny" />
              </div>
              <div className="daily-forecast-temp-container flex justify-between w-16">
                <p className="daily-forecast-temp high">18°</p>
                <p className="daily-forecast-temp low">12°</p>
              </div>
            </div>
            <div className="daily-forecast-card border p-4 flex flex-col items-center">
              <p className="daily-forecast-day mb-2">Thur</p>
              <div className="daily-forecast-icon mb-2">
                <img src={iconSunny} alt="Sunny" />
              </div>
              <div className="daily-forecast-temp-container flex justify-between w-16">
                <p className="daily-forecast-temp high">18°</p>
                <p className="daily-forecast-temp low">12°</p>
              </div>
            </div>
            <div className="daily-forecast-card border p-4 flex flex-col items-center">
              <p className="daily-forecast-day mb-2">Fri</p>
              <div className="daily-forecast-icon mb-2">
                <img src={iconRain} alt="Rain" />
              </div>
              <div className="daily-forecast-temp-container flex justify-between w-16">
                <p className="daily-forecast-temp high">18°</p>
                <p className="daily-forecast-temp low">12°</p>
              </div>
            </div>
            <div className="daily-forecast-card border p-4 flex flex-col items-center">
              <p className="daily-forecast-day mb-2">sat</p>
              <div className="daily-forecast-icon mb-2">
                <img src={iconSnow} alt="Snow" />
              </div>
              <div className="daily-forecast-temp-container flex justify-between w-16">
                <p className="daily-forecast-temp high">18°</p>
                <p className="daily-forecast-temp low">12°</p>
              </div>
            </div>
            <div className="daily-forecast-card border p-4 flex flex-col items-center">
              <p className="daily-forecast-day mb-2">sun</p>
              <div className="daily-forecast-icon mb-2">
                <img src={iconSunny} alt="Sunny" />
              </div>
              <div className="daily-forecast-temp-container flex justify-between w-16">
                <p className="daily-forecast-temp high">18°</p>
                <p className="daily-forecast-temp low">12°</p>
              </div>
            </div>
            <div className="daily-forecast-card border p-4 flex flex-col items-center">
              <p className="daily-forecast-day mb-2">Mon</p>
              <div className="daily-forecast-icon mb-2">
                <img src={iconSunny} alt="Sunny" />
              </div>
              <div className="daily-forecast-temp-container flex justify-between w-16">
                <p className="daily-forecast-temp high">18°</p>
                <p className="daily-forecast-temp low">12°</p>
              </div>
            </div>
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
            <div className="hourly-forecast-card border p-4 flex justify-between items-center">
              <div className="time-container flex items-center gap-2">
                <img src={iconSunny} alt="Sunny" />
                <p className="time">3 PM</p>
              </div>
              <div className="temperature-container">
                <p className="temperature">18°</p>
              </div>
            </div>
            <div className="hourly-forecast-card border p-4 flex justify-between items-center">
              <div className="time-container flex items-center gap-2">
                <img src={iconSunny} alt="Sunny" />
                <p className="time">4 PM</p>
              </div>
              <div className="temperature-container">
                <p className="temperature">12°</p>
              </div>
            </div>
            <div className="hourly-forecast-card border p-4 flex justify-between items-center">
              <div className="time-container flex items-center gap-2">
                <img src={iconSnow} alt="Snow" />
                <p className="time">5 PM</p>
              </div>
              <div className="temperature-container">
                <p className="temperature">18°</p>
              </div>
            </div>
            <div className="hourly-forecast-card border p-4 flex justify-between items-center">
              <div className="time-container flex items-center gap-2">
                <img src={iconSunny} alt="Sunny" />
                <p className="time">6 PM</p>
              </div>
              <div className="temperature-container">
                <p className="temperature">23°</p>
              </div>
            </div>
            <div className="hourly-forecast-card border p-4 flex justify-between items-center">
              <div className="time-container flex items-center gap-2">
                <img src={iconSnow} alt="Sunny" />
                <p className="time">7 PM</p>
              </div>
              <div className="temperature-container">
                <p className="temperature">15°</p>
              </div>
            </div>
            <div className="hourly-forecast-card border p-4 flex justify-between items-center">
              <div className="time-container flex items-center gap-2">
                <img src={iconOvercast} alt="Sunny" />
                <p className="time">8 PM</p>
              </div>
              <div className="temperature-container">
                <p className="temperature">12°</p>
              </div>
            </div>
            <div className="hourly-forecast-card border p-4 flex justify-between items-center">
              <div className="time-container flex items-center gap-2">
                <img src={iconSunny} alt="Sunny" />
                <p className="time">9 PM</p>
              </div>
              <div className="temperature-container">
                <p className="temperature">11°</p>
              </div>
            </div>
            <div className="hourly-forecast-card border p-4 flex justify-between items-center">
              <div className="time-container flex items-center gap-2">
                <img src={iconStorm} alt="Sunny" />
                <p className="time">10 PM</p>
              </div>
              <div className="temperature-container">
                <p className="temperature">17°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
