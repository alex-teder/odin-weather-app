import { weatherData } from "./weather-data";
import { renderError, renderWeather } from "./display";

function getLocalWeather() {
  navigator.geolocation.getCurrentPosition((data) => {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    const query = `${latitude},${longitude}`;
    weatherData
      .getData(query)
      .then((data) => {
        renderWeather(data);
      })
      .catch((error) => {
        renderError(error.message);
      });
  });
}

function getWeather(position) {
  weatherData
    .getData(position)
    .then((data) => {
      renderWeather(data);
    })
    .catch((error) => {
      renderError(error.message);
    });
}

document.querySelector("#search-button").addEventListener("click", (event) => {
  event.preventDefault();
  const input = document.querySelector("#search-field").value;
  getWeather(input);
});

document.querySelector("#user-location-button").addEventListener("click", async () => {
  getLocalWeather();
});
