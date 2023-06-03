export const renderError = function (message) {
  resetMain();
  const container = document.querySelector(".page-container");
  const main = document.createElement("main");
  main.classList.add("error");
  main.innerHTML = `<p class="error__text"></p>`;

  container.appendChild(main);

  const errorText = document.querySelector(".error__text");
  errorText.textContent = message;
};

export const renderWeather = function (data) {
  resetMain();
  const container = document.querySelector(".page-container");
  const main = document.createElement("main");
  main.classList.add("main");
  main.innerHTML = `
    <div class="main__head-container">
      <h2 id="city-name">${data.cityName}</h2>
      <div class="main__temp-container">
        <span id="current-temp">${data.currentTemp}</span>
        <img class="icon" id="current-cond-icon" src="https:${data.currentCondIcon}" alt="${
    data.currentCondText
  }" width="64" height="64">
      </div>
      <p id="current-cond-text">${data.currentCondText}</p>
    </div>

    <div class="main__info-container">

      <div class="forecast">
        <div class="forecast__item" data-index="0">
          <p class="forecast__text">
            Today:<br>
            <span id="forecast-temp-today">max ${data.forecast.today.maxtemp}, min ${
    data.forecast.today.mintemp
  }</span>
          </p>
          <img class="forecast__icon" src="https:${
            data.forecast.today.condIcon
          }" alt="" width="32" height="32">
        </div>
        <div class="forecast__item">
          <p class="forecast__text">
            Tomorrow:<br>
            <span id="forecast-temp-tomorrow">max ${data.forecast.tomorrow.maxtemp}, min ${
    data.forecast.tomorrow.mintemp
  }</span>
          </p>
          <img class="forecast__icon" src="https:${
            data.forecast.tomorrow.condIcon
          }" alt="" width="32" height="32">
        </div>
        <div class="forecast__item">
          <p class="forecast__text">
            <span id="day-after-tomorrow">${data.dayAfterTomorrow}</span>:<br>
            <span id="forecast-temp-day-after-tomorrow">max ${
              data.forecast.dayAfterTomorrow.maxtemp
            }, min ${data.forecast.dayAfterTomorrow.mintemp}</span>
          </p>
          <img class="forecast__icon" src="https:${
            data.forecast.dayAfterTomorrow.condIcon
          }" alt="" width="32" height="32">
        </div>
      </div>

      <div class="main__current-info">
        <p>Feels like <span id="feels-like">${data.feelsLike}</span></p>
        <p><span id="chance-of-precip">${data.chanceOfPrecip}</span></p>
        <p>Visibility: <span id="visibility">${data.visibility}</span></p>
        <p>Air pressure: <span id="air-pressure">${data.airPressure}</span></p>
        <p>Wind: <span id="wind-speed">${data.windSpeed}</span>
          <img class="icon" id="wind-direction-arrow" src="./assets/img/Arrow.svg"
            alt="arrow pointing to the direction of the wind" height="18px" style="transform: rotate(${
              data.windDegree + 180
            }deg)">
        </p>
        <p>Humidity: <span id="humidity">${data.humidity}</span></p>
        <p>UV index: <span id="uv-index">${data.uvLevel}</span></p>
      </div>

    </div>
  `;

  container.appendChild(main);

  const uvLevelSpan = document.querySelector("#uv-index");
  if (data.uvLevel === "low") {
    uvLevelSpan.style.color = "#00d300";
  } else if (data.uvLevel === "moderate") {
    uvLevelSpan.style.color = "yellow";
  } else if (data.uvLevel === "high") {
    uvLevelSpan.style.color = "#ff1d1d";
  }
};

export const renderHistory = function (data) {
  const list = document.querySelector(".cities-list");
  list.innerHTML = "";
  for (let item of data) {
    list.innerHTML += `<li><button class="button city-button" data-city="${item}">${item}</button></li>`;
  }
};

export const renderSuggestions = function (array) {
  const list = document.querySelector("#suggestion-list");
  list.innerHTML = "";
  if (array.length === 0) {
    list.style.display = "none";
  } else {
    list.style.display = "block";
  }
  for (let item of array) {
    list.innerHTML += `<li class="button suggestion" data-coords="${item.lat},${item.lon}">${item.name}, ${item.country}</li>`;
  }
};

function resetMain() {
  const container = document.querySelector(".page-container");
  const mains = document.querySelectorAll("main");
  mains.forEach((el) => {
    container.removeChild(el);
  });
}
