const apiKey = "fdd47a31742f20a780b4991da19c107b";
const locationTextInputEl = document.querySelector("#location-text-input");

const searchBtnEl = document.querySelector("#searchBtn");
const cityNameEl = document.querySelector("#city-name");
const currentDayCardEl = document.querySelector("#weather-day0");
const currentWeatherEl = currentDayCardEl.children[0];
const weatherForecastEl = document.querySelector(".weather-forecast");
const sidebarListGroupEl = document.querySelector(".list-group");

// Sets San Diego as first localStorage entry for default reload location
localStorage.setItem(
  "San Diego",
  JSON.stringify({ city: "San Diego", lat: "32.7174202", lon: "-117.1627728" })
);

// After search button has been clicked, function will get coordinates from city name.
function retrieveLocation() {
  event.preventDefault();
  let cityName = locationTextInputEl.value;
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      data = data[0];
      console.log("Direct Geolocation Results:");
      console.log(data);
      console.log(`City Name: ${data.name}`);
      console.log(`City Coordinates: ${data.lat}, ${data.lon}`);
      let location = {
        city: data.name,
        lat: data.lat,
        lon: data.lon,
      };
      // Functions are called to get current weather & future 5 day weather
      currentWeather(data.lat, data.lon);
      weatherForecast(data.lat, data.lon);

      // Location data stored to localstorage
      localStorage.setItem(data.name, JSON.stringify(location));
    });
}

// gets current weather
function currentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let currentWeatherData = {
        city: data.name,
        currentTemp: data.main.temp, // in F
        maxDayTemp: data.main.temp_max, // in F
        minDayTemp: data.main.temp_min, // in F
        humidity: data.main.humidity,
        weatherDesc: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
        wind: data.wind.speed, //mph
      };
      currentWeatherText(currentWeatherData);
    });
}

// gets current time, sets data on page
function currentWeatherText(weatherData) {
  console.log(`Current Weather:`);
  console.log(weatherData);

  //Displays City name & current day & hour
  cityNameEl.textContent = weatherData.city;
  let today = dayjs().format("DD MMM, YYYY");
  let currentHour = dayjs().format("h A");
  currentWeatherEl.textContent = `Current Weather Today, ${today}, at ${currentHour}`;
  currentWeatherCard(weatherData);
}

// current weather card
function currentWeatherCard(weatherData) {
  // Create & append new data to current weather box:
  let weatherContainer = document.createElement("div");
  let weatherTitle = document.createElement("p");
  let tempTitle = document.createElement("p");
  let minMaxTempText = document.createElement("p");
  let windText = document.createElement("p");
  let humidityText = document.createElement("p");
  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${weatherData.weatherIcon}.png`
  );

  tempTitle.textContent = `Temp: ${weatherData.currentTemp}F`;
  minMaxTempText.textContent = `Max Temp: ${weatherData.maxDayTemp}F, 
   Min Temp: ${weatherData.minDayTemp}F`;
  windText.textContent = `Wind: ${weatherData.wind}mph`;
  humidityText.textContent = `Humidity: ${weatherData.humidity}%`;

  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(weatherTitle);
  weatherContainer.appendChild(tempTitle);
  weatherContainer.appendChild(minMaxTempText);
  weatherContainer.appendChild(windText);
  weatherContainer.appendChild(humidityText);
  currentDayCardEl.children[0].appendChild(weatherContainer);
}

// gets 5 day forecast
function weatherForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(`5 Day Weather Forecast`);
      console.log(data);
      let fiveDayForecast = [
        {
          time: dayjs(data.list[2].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[2].main.temp, // in F
          humidity: data.list[2].main.humidity,
          weatherDesc: data.list[2].weather[0].description,
          weatherIcon: data.list[2].weather[0].icon,
          wind: data.list[2].wind.speed, //mph
        },
        {
          time: dayjs(data.list[10].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[10].main.temp, // in F
          humidity: data.list[10].main.humidity,
          weatherDesc: data.list[10].weather[0].description,
          weatherIcon: data.list[10].weather[0].icon,
          wind: data.list[10].wind.speed, //mph
        },
        {
          time: dayjs(data.list[18].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[18].main.temp, // in F
          humidity: data.list[18].main.humidity,
          weatherDesc: data.list[18].weather[0].description,
          weatherIcon: data.list[18].weather[0].icon,
          wind: data.list[18].wind.speed, //mph
        },
        {
          time: dayjs(data.list[26].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[26].main.temp, // in F
          humidity: data.list[26].main.humidity,
          weatherDesc: data.list[26].weather[0].description,
          weatherIcon: data.list[26].weather[0].icon,
          wind: data.list[26].wind.speed, //mph
        },
        {
          time: dayjs(data.list[34].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[34].main.temp, // in F
          humidity: data.list[34].main.humidity,
          weatherDesc: data.list[34].weather[0].description,
          weatherIcon: data.list[34].weather[0].icon,
          wind: data.list[34].wind.speed, //mph
        },
      ];
      for (i = 0; i < fiveDayForecast.length; i++) {
        forecastWeatherCard(fiveDayForecast);
      }
    });
}

// forecast card
function forecastWeatherCard(weatherData) {
  // Create & append new data to current weather box:
  let weatherContainer = document.createElement("div");
  let weatherTitle = document.createElement("p");
  let tempTitle = document.createElement("p");
  let windText = document.createElement("p");
  let humidityText = document.createElement("p");
  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${weatherData[i].weatherIcon}.png`
  );

  weatherForecastEl.children[i].children[0].children[0].textContent =
    weatherData[i].time;
  tempTitle.textContent = `Temp: ${weatherData[i].temp}F`;
  windText.textContent = `Wind: ${weatherData[i].wind}mph`;
  humidityText.textContent = `Humidity: ${weatherData[i].humidity}%`;

  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(weatherTitle);
  weatherContainer.appendChild(tempTitle);
  weatherContainer.appendChild(windText);
  weatherContainer.appendChild(humidityText);
  weatherForecastEl.children[i].children[0].children[0].appendChild(
    weatherContainer
  );
}

function loadLocalStorage() {
  for (i = 0; i < localStorage.length; i++) {
    let storedCity = JSON.parse(localStorage.getItem(localStorage.key(i)));
    let locationBtnEl = document.createElement("button");
    locationBtnEl.setAttribute(
      "class",
      "btn btn-primary text-start history-btn"
    );
    locationBtnEl.textContent = storedCity.city;
    sidebarListGroupEl.appendChild(locationBtnEl);
    locationBtnEl.addEventListener("click", () => {
      currentWeather(storedCity.lat, storedCity.lon);
      weatherForecast(storedCity.lat, storedCity.lon);
    });
  }
}

function savedWeather() {
  let storedCity = JSON.parse(localStorage.getItem("San Diego"));
  console.log("Default City Location:");
  console.log(storedCity);
  currentWeather(storedCity.lat, storedCity.lon);
  weatherForecast(storedCity.lat, storedCity.lon);
}

savedWeather();
loadLocalStorage();
searchBtnEl.addEventListener("click", retrieveLocation);
