const apikey = "986469d255dd6f052bf5403e84e20cf0";
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const forecastInfo = document.getElementById("forecast-info");
const forecastList = document.getElementById("forecast-list");

getWeatherBtn.addEventListener("click", getWeather);

function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("please enter your city name");
    return;
  }
  fetchWeatherData(city);
}

function fetchWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  const forecastUrl = `https://api.openWeathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      cityName.textContent = `Weather in ${data.name}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      description.textContent = `Description: ${data.weather[0].description}`;

      // Fetch 5-day forecast data
      fetch(forecastUrl)
        .then((response) => response.json())
        .then((forecastData) => {
          displayForecast(forecastData);
        });
    })
    .catch((error) => {
      alert("Error fetching weather data");
    });
}

function displayForecast(forecastData) {
  forecastList.innerHTML = "";
  // data is in 3 -hours intervals , so 8 times give a full day
  for (let i = 0; i < forecastData.list.length; i += 8) {
    const dayForecast = forecastData.list[i];
    const listItem = document.createElement("li");
    listItem.textContent = `${new Date(
      dayForecast.dt * 1000
    ).toLocaleDateString()}-Temp : ${dayForecast.main.temp}°C - ${
      dayForecast.weather[0].description
    }`;
    forecastList.appendChild(listItem);
  }
}

// queryParaString