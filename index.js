
const url = "/.netlify/functions/get-weather?city=";

const searchInput = document.querySelector(".ip");
const searchBtn = document.querySelector(".searchbtn");

const weatherInfo = document.querySelector(".weather-info");
const errorMessage = document.querySelector(".invalid");

const weatherIcon = document.querySelector(".weather-icon");
const description = document.querySelector(".description");

async function checkWeather(city) {
    city = city.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        errorMessage.style.display = "block";
        weatherInfo.style.display = "none";
        return;
    }

    searchBtn.disabled = true;
    searchBtn.textContent = "⏳";

    try {
            const response = await fetch(
            url + encodeURIComponent(city)
        );

        if (!response.ok) {
            errorMessage.textContent =
                response.status === 404
                    ? "City not found. Please try again."
                    : "Unable to fetch weather. Please try again.";

            errorMessage.style.display = "block";
            weatherInfo.style.display = "none";
            return;
        }

        const data = await response.json();
        // Change the background based on weather
        document.body.classList.remove(
            "sunny", "cloudy", "rainy", "snowy"
        );

        const condition = data.weather[0].main.toLowerCase();

        if (condition === "clear") {
            document.body.classList.add("sunny");
        } else if (condition === "clouds") {
            document.body.classList.add("cloudy");
        } else if (
            condition === "rain" ||
            condition === "drizzle" ||
            condition === "thunderstorm"
        ) {
            document.body.classList.add("rainy");
        } else if (condition === "snow") {
            document.body.classList.add("snowy");
        }

        document.querySelector(".temp").textContent =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".city").textContent = data.name;

        document.querySelector(".humidity").textContent =
            data.main.humidity + "%";

        document.querySelector(".wind").textContent =
            data.wind.speed + " m/s";

        description.textContent = data.weather[0].description;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.alt = data.weather[0].description;

        weatherInfo.style.display = "block";
        errorMessage.style.display = "none";

    } catch (error) {
        errorMessage.textContent =
            "Network error. Please check your internet connection.";

        errorMessage.style.display = "block";
        weatherInfo.style.display = "none";

    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "🔍";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchInput.value);
    }
});

