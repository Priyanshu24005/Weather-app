// // JavaScript Code
let city_name = document.getElementById("city_name");
let button = document.getElementById("Search");
let API_KEY = "b3d19abe241041b5d7d4c7cb5f45367a";
let weather = document.getElementById("weather-container");
let error = document.getElementById("error");

button.addEventListener("click", fetchdata);

async function fetchdata() {
    let cityname = city_name.value;
    try {
        error.innerHTML = ""; // Clear any previous errors
        weather.innerHTML = ""; // Clear previous weather details
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        let data = await response.json();
        console.log(data);
        displayweather(data);
    } catch (err) {
        console.error("Error fetching weather data:", err);
        error.innerHTML = "City not found. Please try again.";
    }
}

function displayweather(data) {
    // Clear existing weather data
    weather.innerHTML = '';

    // Use Math.floor to remove the decimal from the temperature
    let temp = Math.floor(data.main.temp);

    // Create a new div for the weather details
    let weatherdata = document.createElement("div");
    weatherdata.innerHTML = `
        <h3 class="head">${data.name}, ${data.sys.country}</h3>
        <div class="temp">${temp}°C</div>
        <div class="condition">${data.weather[0].description}</div>  
    `;
    weather.appendChild(weatherdata);
}