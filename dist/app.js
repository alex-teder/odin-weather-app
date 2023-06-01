(()=>{"use strict";function e(){const e=document.querySelector(".page-container");document.querySelectorAll("main").forEach((t=>{e.removeChild(t)}))}({forecast:{today:{},tomorrow:{},dayAfterTomorrow:{}},getData:async function(e){const t=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=baccad5e87644ed197c133503233005&q=${e}&days=3`);if(!t.ok)throw new Error("Error fetching data: "+t.status);const n=await t.json();this.cityName=n.location.name,this.currentTemp=n.current.temp_c+"°C",this.currentCondIcon=n.current.condition.icon,this.currentCondText=n.current.condition.text,this.isDayNow=n.current.is_day;const o=n.forecast.forecastday;return this.dayAfterTomorrow=function(e){const t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],n=new Date(e).getDay();return t[n+2]||t[n-5]}(n.location.localtime),this.forecast.today.maxtemp=o[0].day.maxtemp_c.toFixed(0)+"°C",this.forecast.today.mintemp=o[0].day.mintemp_c.toFixed(0)+"°C",this.forecast.today.condIcon=o[0].day.condition.icon,this.forecast.tomorrow.maxtemp=o[1].day.maxtemp_c.toFixed(0)+"°C",this.forecast.tomorrow.mintemp=o[1].day.mintemp_c.toFixed(0)+"°C",this.forecast.tomorrow.condIcon=o[1].day.condition.icon,this.forecast.dayAfterTomorrow.maxtemp=o[2].day.maxtemp_c.toFixed(0)+"°C",this.forecast.dayAfterTomorrow.mintemp=o[2].day.mintemp_c.toFixed(0)+"°C",this.forecast.dayAfterTomorrow.condIcon=o[2].day.condition.icon,this.feelsLike=n.current.feelslike_c+"°C",this.chanceOfPrecip=function(e,t){const n=new Date(t),o=e.slice(n.getHours());let r=0,a=0;for(const e of o)e.chance_of_rain>r&&(r=e.chance_of_rain),e.chance_of_snow>a&&(a=e.chance_of_snow);const i=o[0].temp_c<=0;return r>a?"Chance of rain: "+r+"%":r<a?"Chance of snow: "+a+"%":0===r&&0===a?i?"Chance of snow: 0%":"Chance of rain: 0%":void 0}(n.forecast.forecastday[0].hour,n.location.localtime),this.visibility=n.current.vis_km+" km",this.airPressure=n.current.pressure_mb+" mbar",this.windSpeed=n.current.wind_kph.toFixed(0)+" km/h",this.windDegree=n.current.wind_degree,this.humidity=n.current.humidity+"%",this.uvLevel=function(e){let t="";switch(!0){case e<4:t="low";break;case e>=4&&e<=7:t="moderate";break;case e>7:t="high";break;default:t="?"}return t}(n.current.uv),this}}).getData("Tbilisi").then((t=>{!function(t){e();const n=document.querySelector(".page-container"),o=document.createElement("main");o.classList.add("main"),o.innerHTML=`\n    <div class="main__head-container">\n      <h2 id="city-name">${t.cityName}</h2>\n      <div class="main__temp-container">\n        <span id="current-temp">${t.currentTemp}</span>\n        <img class="icon" id="current-cond-icon" src="${t.currentCondIcon}" alt="${t.currentCondText}" width="64" height="64">\n      </div>\n      <p id="current-cond-text">${t.currentCondText}</p>\n    </div>\n\n    <div class="main__info-container">\n\n      <div class="forecast">\n        <div class="forecast__item" data-index="0">\n          <p class="forecast__text">\n            Today:<br>\n            <span id="forecast-temp-today">max ${t.forecast.today.maxtemp}, min ${t.forecast.today.mintemp}</span>\n          </p>\n          <img class="forecast__icon" src="${t.forecast.today.condIcon}" alt="" width="32" height="32">\n        </div>\n        <div class="forecast__item">\n          <p class="forecast__text">\n            Tomorrow:<br>\n            <span id="forecast-temp-tomorrow">max ${t.forecast.tomorrow.maxtemp}, min ${t.forecast.tomorrow.mintemp}</span>\n          </p>\n          <img class="forecast__icon" src="${t.forecast.tomorrow.condIcon}" alt="" width="32" height="32">\n        </div>\n        <div class="forecast__item">\n          <p class="forecast__text">\n            <span id="day-after-tomorrow">${t.dayAfterTomorrow}</span>:<br>\n            <span id="forecast-temp-day-after-tomorrow">max ${t.forecast.dayAfterTomorrow.maxtemp}, min ${t.forecast.dayAfterTomorrow.mintemp}</span>\n          </p>\n          <img class="forecast__icon" src="${t.forecast.dayAfterTomorrow.condIcon}" alt="" width="32" height="32">\n        </div>\n      </div>\n\n      <div class="main__current-info">\n        <p>Feels like <span id="feels-like">${t.feelsLike}</span></p>\n        <p><span id="chance-of-precip">${t.chanceOfPrecip}</span></p>\n        <p>Visibility: <span id="visibility">${t.visibility}</span></p>\n        <p>Air pressure: <span id="air-pressure">${t.airPressure}</span></p>\n        <p>Wind: <span id="wind-speed">${t.windSpeed}</span>\n          <img class="icon" id="wind-direction-arrow" src="./assets/img/Arrow.svg"\n            alt="arrow pointing to the direction of the wind" height="18px" style="transform: rotate(${t.windDegree}deg)">\n        </p>\n        <p>Humidity: <span id="humidity">${t.humidity}</span></p>\n        <p>UV index: <span id="uv-index">${t.uvLevel}</span></p>\n      </div>\n\n    </div>\n  `,n.appendChild(o),document.querySelector("#uv-index")}(t)})).catch((t=>{!function(t){e();const n=document.querySelector(".page-container"),o=document.createElement("main");o.classList.add("error"),o.innerHTML='<p class="error__text"></p>',n.appendChild(o),document.querySelector(".error__text").textContent=t}(t.message)}))})();