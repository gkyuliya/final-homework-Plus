//function changeTheme() {
// let weatherApp = document.querySelector(".weather-app");
// weatherApp.classList.toggle("dark-theme");}

//let themeButton = document.querySelector(".theme-button");
//themeButton.addEventListener("click", changeTheme);

// feature 1
function formatDate(timestamp) {
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
  return `Last Updated:<br>${day} ${hours}:${min}`;
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

function cityInput(response) {
  console.log(response);
  celsiusElement = response.data.temperature.current;

  document.querySelector(".h1-city").innerHTML = response.data.city;

  document.querySelector(".h1-country").innerHTML = response.data.country;

  document.querySelector("#temperature").innerHTML = Math.round(celsiusElement);

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let dayTime = document.querySelector(".day-time");
  dayTime.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusElement * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusElement);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col" id="weather-forecast-col">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.time
                )}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  width="40"
                  alt=""
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temperature.maximum
                  )}° |</span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temperature.minimum
                  )}° </span>
                </div>
                </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5bd39438od4a5b74b16a2a5f3d6905t4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusElement = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Barcelona");
