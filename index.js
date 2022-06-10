const weatherApiKey = "eef545a795cae9fca6e032ee8406884a";
let degreeState = 10;

function displaytemp(temp) {
  degreeState = temp;
  let weatherDegree = document.getElementById("degree");
  weatherDegree.innerHTML = `${Math.round(degreeState)}`;
}

function displayCity(data) {
  let cityName = document.getElementById("cityname");
  cityName.innerHTML = data;
}

function realTime() {
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

function changeImage(icon) {
  let imageUrl = "src/sunny.svg";
  if (icon == "01d") {
    imageUrl = "src/sunny.svg";
  } else if (icon == "02d") {
    imageUrl = "src/sunny mid cloudy.svg";
  } else if (icon == "03d") {
    imageUrl = "src/cloud.svg";
  } else if (icon == "04d") {
    imageUrl = "src/cloud.svg";
  } else if (icon == "09d") {
    imageUrl = "src/sun cloud mid rain.svg";
  } else if (icon == "10d") {
    imageUrl = "src/sun cloud little rain.svg";
  } else if (icon == "11d") {
    imageUrl = "src/cloud 3 zap.svg";
  } else if (icon == "13d") {
    imageUrl = "src/big snow.svg";
  } else if (icon == "50d") {
    imageUrl = "src/mid snow fastwind.svg";
  } else if (icon == "01n") {
    imageUrl = "src/clearmoon.svg";
  } else if (icon == "02n") {
    imageUrl = "src/moon cloud fast wind.svg";
  } else if (icon == "03n") {
    imageUrl = "src/nightcloud.svg";
  } else if (icon == "04n") {
    imageUrl = "src/nightcloud.svg";
  } else if (icon == "09n") {
    imageUrl = "src/moon cloud mid rain.svg";
  } else if (icon == "10n") {
    imageUrl = "src/night rain.svg";
  } else if (icon == "11n") {
    imageUrl = "src/night zap.svg";
  } else if (icon == "13n") {
    imageUrl = "src/nightsnow.svg";
  } else if (icon == "50n") {
    imageUrl = "src/nightmist.svg";
  }
  let imageElement = document.getElementById("weathericon");
  imageElement.src = imageUrl;
}

function changeCity(event) {
  let searchInput = document.getElementById("searchinput");
  let city = searchInput.value;
  callApi(city);
  event.preventDefault();
}

function callApi(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.cod == "404") {
        displayCity("this city doesn't exist!");
      } else {
        displaytemp(data.main.temp);
        displayCity(data.name);
        weatherDescription(data.weather[0].description);
        windSpeed(data.wind.speed);
        humidity(data.main.humidity);
        changeImage(data.weather[0].icon);

        // let lan = data.lan;
        // let lon = data.lon;
        // let forcastUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
        // fetch(forcastUrl).then().then()
        forcastApi(data.coord.lat, data.coord.lon);
      }
    });
}

function forcastApi(lat, lon) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&appid=${weatherApiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.cod == "404") {
        displayCity("this city doesn't exist!");
      } else {
        console.log(data.daily[0]);

        for (let i = 0; i < 2; i++) {
          let forcastDegree = document.getElementById(`degree_d${i}`);
          forcastDegree.innerHTML = Math.round(data.daily[i].temp.day);

          let forcastHumidity = document.getElementById(`humidity_d${i}`);
          forcastHumidity.innerHTML = `H: ${Math.round(
            data.daily[i].humidity
          )}%`;

          let forcastWindSpeed = document.getElementById(`windspeed_d${i}`);
          forcastWindSpeed.innerHTML = `WS : ${Math.round(
            data.daily[i].wind_speed
          )}Km/h`;

          let forcaststatus = document.getElementById(`status_d${i}`);
          forcaststatus.innerHTML = data.daily[i].weather[0].main;
        }
      }
    });
}

function changeToFarenhite(event) {
  let farenhit = (degreeState * 9) / 5 + 32;
  let weatherDegree = document.getElementById("degree");
  weatherDegree.innerHTML = `${Math.round(farenhit)}`;
}
function backToCelicus(event) {
  let weatherDegree = document.getElementById("degree");
  weatherDegree.innerHTML = `${Math.round(degreeState)}`;
}

let celicus = document.getElementById("cel");
let farenhit = document.getElementById("far");
farenhit.addEventListener("click", changeToFarenhite);
celicus.addEventListener("click", backToCelicus);

let searchButton = document.getElementById("button-addon2");
searchButton.addEventListener("click", changeCity);

let searchForm = document.getElementById("searchform");
searchForm.addEventListener("submit", changeCity);

realTime();
callApi("Amsterdam");
