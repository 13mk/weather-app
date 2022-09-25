//clock
let currentTime = document.querySelector(".time");
let currentDate = new Date();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

currentTime.innerHTML = `${hours}:${minutes}`;
//date
let day = currentDate.getDate();
let months = [
  "December",
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
  // let time = response.data.current.dt;
  //let timeElement = document.querySelector(".time");
}

// search city
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let headCity = document.querySelector("#newCity");
  headCity.innerHTML = cityInput.value;
  //w5 api Homework p1
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiurl).then(showTemp);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", showCity);

//w5 geo-button homework

function showLocation(location) {
  let currentLocation = location.data.name;
  let buttonText = document.querySelector("#buttonInfo");
  buttonText.innerHTML = currentLocation;
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
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

showCity("London");
