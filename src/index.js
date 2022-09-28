//clock
let currentDate = new Date();
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${hours}:${minutes}`;
//date
let day = currentDate.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();
let h3 = document.querySelector("h3");

h3.innerHTML = `${day}, ${month} ${year}`;

//head Temperature (w5 Homework p2) + wind, humidity, description elements
function showTemp(response) {
  celsiusTemperature = response.data.main.temp;

  let currentTemp = Math.round(celsiusTemperature);
  let h1temp = document.querySelector("#headTemp");
  h1temp.innerHTML = currentTemp + "°";

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#headIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

// search city
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
  //w5 api Homework p1
}

function search(city) {
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  let headCity = document.querySelector("#newCity");
  headCity.innerHTML = city;

  axios.get(apiurl).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

//w5 geo-button homework
function showLocation(location) {
  let currentLocation = location.data.name;
  let buttonText = document.querySelector("#buttonInfo");
  buttonText.innerHTML = currentLocation;
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiurl).then(showLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// celsius & fahrenheit

let celsiusTemperature = null;

function showFahr(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#headTemp");
  let toFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  tempElement.innerHTML = toFahrenheit + "°";
}

let fahrLink = document.querySelector("#farenheit");
fahrLink.addEventListener("click", showFahr);

function showCel(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#headTemp");
  tempElement.innerHTML = Math.round(celsiusTemperature) + "°";
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCel);

search("Bali");
