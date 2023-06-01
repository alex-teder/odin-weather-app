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
        <img class="icon" id="current-cond-icon" src="${data.currentCondIcon}" alt="${data.currentCondText}" width="64" height="64">
      </div>
      <p id="current-cond-text">${data.currentCondText}</p>
    </div>

    <div class="main__info-container">

      <div class="forecast">
        <div class="forecast__item" data-index="0">
          <p class="forecast__text">
            Today:<br>
            <span id="forecast-temp-today">max ${data.forecast.today.maxtemp}, min ${data.forecast.today.mintemp}</span>
          </p>
          <img class="forecast__icon" src="${data.forecast.today.condIcon}" alt="" width="32" height="32">
        </div>
        <div class="forecast__item">
          <p class="forecast__text">
            Tomorrow:<br>
            <span id="forecast-temp-tomorrow">max ${data.forecast.tomorrow.maxtemp}, min ${data.forecast.tomorrow.mintemp}</span>
          </p>
          <img class="forecast__icon" src="${data.forecast.tomorrow.condIcon}" alt="" width="32" height="32">
        </div>
        <div class="forecast__item">
          <p class="forecast__text">
            <span id="day-after-tomorrow">${data.dayAfterTomorrow}</span>:<br>
            <span id="forecast-temp-day-after-tomorrow">max ${data.forecast.dayAfterTomorrow.maxtemp}, min ${data.forecast.dayAfterTomorrow.mintemp}</span>
          </p>
          <img class="forecast__icon" src="${data.forecast.dayAfterTomorrow.condIcon}" alt="" width="32" height="32">
        </div>
      </div>

      <div class="main__current-info">
        <p>Feels like <span id="feels-like">${data.feelsLike}</span></p>
        <p><span id="chance-of-precip">${data.chanceOfPrecip}</span></p>
        <p>Visibility: <span id="visibility">${data.visibility}</span></p>
        <p>Air pressure: <span id="air-pressure">${data.airPressure}</span></p>
        <p>Wind: <span id="wind-speed">${data.windSpeed}</span>
          <img class="icon" id="wind-direction-arrow" src="./assets/img/Arrow.svg"
            alt="arrow pointing to the direction of the wind" height="18px" style="transform: rotate(${data.windDegree}deg)">
        </p>
        <p>Humidity: <span id="humidity">${data.humidity}</span></p>
        <p>UV index: <span id="uv-index">${data.uvLevel}</span></p>
      </div>

    </div>
  `;

  container.appendChild(main);

  const uvLevelSpan = document.querySelector("#uv-index");
  // if (data.uvLevel === "low") {
  //   uvLevelSpan.style.color = "green";
  // } else if (data.uvLevel === "moderate") {
  //   uvLevelSpan.style.color = "yellow";
  // } else if (data.uvLevel === "high") {
  //   uvLevelSpan.style.color = "red";
  // }
};

function resetMain() {
  const container = document.querySelector(".page-container");
  const mains = document.querySelectorAll("main");
  mains.forEach((el) => {
    container.removeChild(el);
  });
}
