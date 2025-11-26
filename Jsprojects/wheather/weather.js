const apiKey = "994f3f1244532e76c55331b834d91087";
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const forecasting = document.getElementById("forecast-info");
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
  //queryparastring :-
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      cityName.textContent = `weather in ${data.name}`;
      temperature.textContent = `Temperature : ${data.main.temp}°C`;
      humidity.textContent = `Humidity : ${data.main.humidity}%`;
      description.textContent = `Description :${data.weather[0].description}`;

      //fetch 5-day forecast data
      fetch(forecastUrl)
        .then((response) => response.json())
        .then((forecastData) => {
          displayForeCast(forecastData);
        });
    })
    .catch((error) => {
      alert("Error fetching weather data",error);
    });
}

function displayForeCast(forecastData) {
  forecastList.innerHTML = "";

  //data is in 3 hours intervals , so 8 times give a full day
  for (let i = 0; i < forecastData.list.length; i+= 8) {
    const dayForeCast = forecastData.list[i];
    const listItem = document.createElement("li");
    listItem.textContent = `${new Date(
      dayForeCast.dt * 1000
    ).toLocaleDateString()} -Temp : ${dayForeCast.main.temp}°C -${
      dayForeCast.weather[0].description
    }`;
    forecastList.appendChild(listItem);
  }
}
