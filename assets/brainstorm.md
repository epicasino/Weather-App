<!-- fdd47a31742f20a780b4991da19c107b

api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

https://openweathermap.org/forecast5

https://openweathermap.org/api/geocoding-api

in current weather:
data.name for city name
data.main.temp for current temp
data.main.temp_max for max day temp
data.main.temp_min for min day temp
data.weather[0].description for weather desc.
data.weather[0].icon for weather icon

let currentWeatherData = {
        city: data.name,
        currentTemp: data.main.temp,
        maxDayTemp: data.main.temp_max,
        minDayTemp: data.main.temp_min,
        weatherDesc: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
        wind
      };

2, 10, 18, 26, 34 array in weather -->

<!-- TO-DO:

Save City input in localStorage into a button for access later -->