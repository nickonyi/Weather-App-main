import iconSunny from "../assets/images/icon-sunny.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
export const getWeatherIcon = (tempMax) => {
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
