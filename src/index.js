function changeTheme() {
  let weatherApp = document.querySelector(".weather-app");
  weatherApp.classList.toggle("dark-theme");
}

let themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", changeTheme);

// feature 1
let now = new Date();

let dayTime = document.querySelector(".parameters");

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
let time = now.getHours();
let min = now.getMinutes();

dayTime.innerHTML = `${day}<br>${time}:${min}`;

// feature 2

function searchCity(city) {
  let apiKey = "1bee33f29fcced6b07349e2b6416baf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchLocation(position) {
  apiKey = "1bee33f29fcced6b07349e2b6416baf2";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityInput);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("Barcelona");
