const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "9f43f815be51ed72734e5d4779a0fbc1"; // This key is currently deactivated, so don't try to use it

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}
function displayWeatherInfo(data) {
  console.log(data);

  const {
    name: city,
    main: { temp, humidity, feels_like, temp_min, temp_max },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const feelsLikeDisplay = document.createElement("p");
  const minDisplay = document.createElement("p");
  const maxDisplay = document.createElement("p");
  const celsiusDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherImg = document.createElement("img");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(((temp - 273.15) * 9) / 5 + 32).toFixed(
    1
  )} F (${(temp - 273.15).toFixed(1)} C)`;
  feelsLikeDisplay.textContent = `Feels like ${(
    ((feels_like - 273.15) * 9) / 5 +
    32
  ).toFixed(1)} F (${(feels_like - 273.15).toFixed(1)} C)`;
  minDisplay.textContent = `Min Temp: ${(
    ((temp_min - 273.15) * 9) / 5 +
    32
  ).toFixed(1)} F (${(temp_min - 273.15).toFixed(1)} C)`;
  maxDisplay.textContent = `Max Temp: ${(
    ((temp_max - 273.15) * 9) / 5 +
    32
  ).toFixed(1)} F (${(temp_max - 273.15).toFixed(1)} C)`;
  celsiusDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherImg.src = getWeatherImg(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  feelsLikeDisplay.classList.add("feelsLikeDisplay");
  minDisplay.classList.add("minDisplay");
  maxDisplay.classList.add("maxDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherImg.classList.add("weatherImg");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(feelsLikeDisplay);
  card.appendChild(minDisplay);
  card.appendChild(maxDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherImg);
}
function getWeatherImg(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId <= 232:
      return "img/11d.png";
    case (weatherId >= 300 && weatherId <= 321) ||
      (weatherId >= 520 && weatherId <= 531):
      return "img/9d.png";
    case weatherId >= 500 && weatherId <= 504:
      return "img/10d.png";
    case weatherId === 511 || (weatherId >= 600 && weatherId <= 622):
      return "img/13d.png";
    case weatherId >= 701 && weatherId <= 781:
      return "img/50d.png";
    case weatherId === 800:
      return "img/01d.png";
    case weatherId === 801:
      return "img/02d.png";
    case weatherId === 802:
      return "img/03d.png";
    case weatherId === 803 || weatherId === 804:
      return "img/04d.png";
  }
}
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
