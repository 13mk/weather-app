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

//w5 Homework p2
function showTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let h1temp = document.querySelector("#headTemp");
  h1temp.innerHTML = currentTemp + "°";
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
  let headCity = document.querySelector("#newCity");
  headCity.innerHTML = currentLocation;
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
//function showFahr() {
//celTemp = 17;
//let f = (celTemp * 9) / 5 + 32;
// defTemp.innerHTML = f + "°";
//}
//function showCel() {
// defTemp.innerHTML = 17 + "°";
//}
//let defTemp = document.querySelector("#headTemp");
//let celTemp = document.querySelector("#celsius");
//let fahrTemp = document.querySelector("#farenheit");

//fahrTemp.addEventListener("click", showFahr);
//celTemp.addEventListener("click", showCel);
