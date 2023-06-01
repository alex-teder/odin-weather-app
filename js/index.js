import { weatherData } from "./weather-data";
import { renderError, renderWeather } from "./display";

weatherData
  .getData("Tbilisi")
  .then((data) => {
    renderWeather(data);
  })
  .catch((error) => {
    renderError(error.message);
  });
