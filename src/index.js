let now = new Date();
function formatDate(currentDate) {
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
  let date = document.querySelector("#date");
  date.innerHTML = `${day}, ${hours}: ${min}`;
}
formatDate();

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Friday", "Saturday", "Sunday", "Monday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
          <div class="col-12">
            <div class="forecast-date">${day}</div>
              <div class="weather-forecast">
                <span class="weather-forecast-min"> 12°C </span>
                |
                <span class="weather-forecast-max"> 35°C </span>
                <span class="weather-forecast-icon">
                  <img
                    src="https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png"
                    alt="clear"
                    id="weather-forecast-icon"
                    width="42"
                  />
                </span>
              </div>
              </div>
          </div>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let searchedCity = document.querySelector("#cities");
  searchedCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  //let celciusTemp = `${temperature}°C`;
  let cityTemp = document.querySelector("#temp");
  cityTemp.innerHTML = temperature;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = `Wind: ${wind}km/h`;
  let cityWindSpeed = document.querySelector("#wind");
  cityWindSpeed.innerHTML = windSpeed;
  let humidity = response.data.main.humidity;
  let finalHumidity = `Humidity: ${humidity}%`;
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = finalHumidity;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature = response.data.main.temp;
}
function citySearch(event) {
  event.preventDefault();
  let typeCity = document.querySelector("#search-input");
  searchCity(typeCity.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

getForecast(response.data.coord);

//function getCurrentPosition() {
//navigator.geolocation.getCurrentPosition(showPosition);
//}

//function showPosition(position) {
//let lat = position.coords.latitude;
//let lon = position.coords.longitude;
//let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//axios.get(apiUrl).then(currentCityTemperature);
//}

//function currentCityTemperature(response) {
//let currentCity = document.querySelector("#cities");
//currentCity.innerHTML = response.data.name;
//let searchedCityTemp = Math.round(response.data.main.temp);
// let searchedCityTempCelcius = `${searchedCityTemp}°C`;
//let displayCityTemp = document.querySelector("#temp");
//displayCityTemp.innerHTML = searchedCityTemp;
//}

//function currentCitySearch(event) {
//event.preventDefault();
//let searchCurrentCity = document.querySelector("#current-location");
// searchCity(searchCurrentCity.value);
//}
//let button = document.querySelector("button");
//button.addEventListener("click", currentCitySearch);

function changeCelciusTemp(event) {
  event.preventDefault();
  let newTempCelcius = document.querySelector("#temp");
  newTempCelcius.innerHTML = Math.round(celciusTemperature);
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}
let newTempC = document.querySelector("#celcius-link");
newTempC.addEventListener("click", changeCelciusTemp);

function changeFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let newTempFarenheit = document.querySelector("#temp");
  newTempFarenheit.innerHTML = Math.round(farenheitTemperature);
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

let newTempF = document.querySelector("#farenheit-link");
newTempF.addEventListener("click", changeFarenheitTemp);

let celciusTemperature = null;

//getCurrentPosition();
