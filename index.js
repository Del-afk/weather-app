let weatherApiKey = "eef545a795cae9fca6e032ee8406884a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${weatherApiKey}&units=metric`;

function displaytemp(temp) {
  let weatherDegree = document.getElementById("degree");
  weatherDegree.innerHTML = Math.round(temp);
}

function displayCity(data) {
  let cityName = document.getElementById("cityname");
  cityName.innerHTML = data;
}

function realTime(data) {
  let realTimeElement = document.getElementById("realtime");
  let currentTime = new Date();
  let date =
    currentTime.getFullYear() +
    "/" +
    (currentTime.getMonth() + 1) +
    "/" +
    currentTime.getDate();
  let time = currentTime.getHours() + ":" + currentTime.getMinutes();
  let dateTime = time + " - " + date;
  realTimeElement.innerHTML = dateTime;
}

function weatherDescription(data) {
  let weatherStatus = document.getElementById("weatherstatus");
  weatherStatus.innerHTML = data;
}

function windSpeed(data) {
  let windSpeedElement = document.getElementById("windspeed");
  windSpeedElement.innerHTML = `Wind Speed : ${data} Km/h`;
}

function humidity(data) {
  let humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `Humidity : ${data}% `;
}

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    displaytemp(data.main.temp);
    displayCity(data.name);
    weatherDescription(data.weather[0].description);
    windSpeed(data.wind.speed);
    humidity(data.main.humidity);
  });
realTime();
