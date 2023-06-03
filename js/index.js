import { weatherData } from "./weather-data";
import { renderError, renderWeather } from "./display";

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Your browser doesn't support geolocation!");
    }
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const latitude = data.coords.latitude;
        const longitude = data.coords.longitude;
        resolve(`${latitude},${longitude}`);
      },
      (error) => {
        reject("Couldn't get your location!");
      }
    );
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
  try {
    document.querySelector("#search-field").value = "";
    const position = await getUserLocation();
    getWeather(position);
  } catch (error) {
    renderError(error);
  }
});