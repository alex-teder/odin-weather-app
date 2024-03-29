export const weatherData = {
  forecast: {
    today: {},
    tomorrow: {},
    dayAfterTomorrow: {},
  },

  getData: async function (location) {
    const apiKey = "baccad5e87644ed197c133503233005";
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
    );
    if (!response.ok) {
      throw new Error("Error fetching data: " + response.status);
    }
    const data = await response.json();
    // console.log(data);

    this.cityName = data.location.name;
    this.currentTemp = data.current.temp_c.toFixed(0) + "°C";
    this.currentCondIcon = data.current.condition.icon;
    this.currentCondText = data.current.condition.text;
    this.isDayNow = data.current.is_day;

    const forecastArray = data.forecast.forecastday;
    this.dayAfterTomorrow = getDayAfterTomorrow(data.location.localtime);

    this.forecast.today.maxtemp = forecastArray[0].day.maxtemp_c.toFixed(0) + "°C";
    this.forecast.today.mintemp = forecastArray[0].day.mintemp_c.toFixed(0) + "°C";
    this.forecast.today.condIcon = forecastArray[0].day.condition.icon;

    this.forecast.tomorrow.maxtemp = forecastArray[1].day.maxtemp_c.toFixed(0) + "°C";
    this.forecast.tomorrow.mintemp = forecastArray[1].day.mintemp_c.toFixed(0) + "°C";
    this.forecast.tomorrow.condIcon = forecastArray[1].day.condition.icon;

    this.forecast.dayAfterTomorrow.maxtemp = forecastArray[2].day.maxtemp_c.toFixed(0) + "°C";
    this.forecast.dayAfterTomorrow.mintemp = forecastArray[2].day.mintemp_c.toFixed(0) + "°C";
    this.forecast.dayAfterTomorrow.condIcon = forecastArray[2].day.condition.icon;

    this.feelsLike = data.current.feelslike_c.toFixed(0) + "°C";
    this.chanceOfPrecip = getChanceOfPrecip(
      data.forecast.forecastday[0].hour,
      data.location.localtime
    );
    this.visibility = data.current.vis_km + " km";
    this.airPressure = data.current.pressure_mb + " mbar";
    this.windSpeed = data.current.wind_kph.toFixed(0) + " km/h";
    this.windDegree = data.current.wind_degree;
    this.humidity = data.current.humidity + "%";
    this.uvLevel = getUVLevel(data.current.uv);

    this.currentTemp = removeMinusBeforeZero(this.currentTemp);
    this.forecast.today.maxtemp = removeMinusBeforeZero(this.forecast.today.maxtemp);
    this.forecast.today.mintemp = removeMinusBeforeZero(this.forecast.today.mintemp);
    this.forecast.tomorrow.maxtemp = removeMinusBeforeZero(this.forecast.tomorrow.maxtemp);
    this.forecast.tomorrow.mintemp = removeMinusBeforeZero(this.forecast.tomorrow.mintemp);
    this.forecast.dayAfterTomorrow.maxtemp = removeMinusBeforeZero(
      this.forecast.dayAfterTomorrow.maxtemp
    );
    this.forecast.dayAfterTomorrow.mintemp = removeMinusBeforeZero(
      this.forecast.dayAfterTomorrow.mintemp
    );
    this.feelsLike = removeMinusBeforeZero(this.feelsLike);

    return this;
  },
};

function convertToISO8601(dateString) {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  let [hours, minutes] = timePart.split(":");
  if (hours.length < 2) {
    hours = "0" + hours;
  }
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

function getDayAfterTomorrow(dateString) {
  const formattedDate = convertToISO8601(dateString);
  console.log(formattedDate);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = new Date(formattedDate);
  console.log(today);
  today = today.getDay();
  return daysOfWeek[today + 2] || daysOfWeek[today - 5];
}

function removeMinusBeforeZero(string) {
  if (string === "-0°C") {
    return "0°C";
  }
  return string;
}

function getChanceOfPrecip(data, time) {
  const now = new Date(time);
  const remainingHours = data.slice(now.getHours());
  let chanceOfRain = 0;
  let chanceOfSnow = 0;
  for (const hour of remainingHours) {
    if (hour.chance_of_rain > chanceOfRain) {
      chanceOfRain = hour.chance_of_rain;
    }
    if (hour.chance_of_snow > chanceOfSnow) {
      chanceOfSnow = hour.chance_of_snow;
    }
  }
  const isFreezing = remainingHours[0].temp_c <= 0;
  if (chanceOfRain > chanceOfSnow) {
    return "Chance of rain: " + chanceOfRain + "%";
  } else if (chanceOfRain < chanceOfSnow) {
    return "Chance of snow: " + chanceOfSnow + "%";
  } else if (chanceOfRain === 0 && chanceOfSnow === 0) {
    if (isFreezing) {
      return "Chance of snow: 0%";
    } else {
      return "Chance of rain: 0%";
    }
  }
}

function getUVLevel(data) {
  let result = "";
  switch (true) {
    case data < 4:
      result = "low";
      break;
    case data >= 4 && data <= 7:
      result = "moderate";
      break;
    case data > 7:
      result = "high";
      break;
    default:
      result = "?";
  }
  return result;
}
