import { weatherData } from "./weather-data";
import { renderError, renderWeather, renderHistory, renderSuggestions } from "./display";
import { history } from "./history";
import { getSearchSuggestions } from "./search-suggestions";

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
      history.push(data.cityName);
      renderHistory(history.data);
    })
    .catch((error) => {
      renderError(error.message);
    });
}

history.getFromStorage();
renderHistory(history.data);

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

document.querySelector(".cities-list").addEventListener("click", (event) => {
  if (!event.target.classList.contains("city-button")) {
    return;
  }
  document.querySelector("#search-field").value = "";
  getWeather(event.target.dataset.city);
});

document.querySelector("#search-field").addEventListener("input", () => {
  const input = document.querySelector("#search-field").value;
  if (input === "") {
    renderSuggestions([]);
    return;
  }
  getSearchSuggestions(input).then((array) => {
    renderSuggestions(array);
  });
});

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("suggestion")) {
    document.querySelector("#search-field").value = "";
    getWeather(event.target.dataset.coords);
  }
  document.querySelector("#suggestion-list").style.display = "none";
});
