//function changeTheme() {
// let weatherApp = document.querySelector(".weather-app");
// weatherApp.classList.toggle("dark-theme");}

//let themeButton = document.querySelector(".theme-button");
//themeButton.addEventListener("click", changeTheme);

// feature 1
function fixTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}<br>${hours}:${min}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

// feature 2

function searchCity(city) {
  let apiKey = "5bd39438od4a5b74b16a2a5f3d6905t4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityInput);
}

function displayCityName(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;

  searchCity(city);
}

let searchInput = document.querySelector(".weather-form");
searchInput.addEventListener("submit", displayCityName);

// bonus feature

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

// homework week 5

function cityInput(response) {
  document.querySelector("h1").innerHTML = response.data.city;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let dayTime = document.querySelector(".day-time");
  dayTime.innerHTML = fixTime(response.data.time * 1000);
}

function searchLocation(position) {
  apiKey = "5bd39438od4a5b74b16a2a5f3d6905t4";
  apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityInput);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("Barcelona");
