import { weatherData } from "./weather-data";

weatherData
  .getData("Tbilisi")
  .then()
  .catch((error) => {
    console.log("🙂", error);
  });
