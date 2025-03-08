const API_KEY = '956672a9b21c48513bc339e9c6bb78d5';

async function getWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка получения погоды:', error);
    }
}

async function updateWeatherWidget() {
    const container = document.getElementById('weather-container');
    
    const wonders = [
        { name: "Чарынский каньон", coordinates: [43.35, 79.08] },
        { name: "Поющий бархан", coordinates: [43.9167, 77.3667] },
        { name: "Озеро Каинды", coordinates: [43.0733, 78.2833] },
        { name: "Петроглифы Тамгалы", coordinates: [43.8000, 75.5333] },
        { name: "Мавзолей Ходжи Ахмеда Ясави", coordinates: [43.3000, 68.2667] },
        { name: "Национальный парк Алтын-Эмель", coordinates: [43.7000, 78.3667] },
        { name: "Баянаульский национальный парк", coordinates: [50.8167, 75.7000] }
    ];

    for (const wonder of wonders) {
        const weather = await getWeather(wonder.coordinates[0], wonder.coordinates[1]);
        if (weather) {
            const weatherHtml = `
                <div class="weather-card">
                    <h3>${wonder.name}</h3>
                    <p>${Math.round(weather.main.temp)}°C</p>
                    <img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="Weather icon">
                    <p>${weather.weather[0].description}</p>
                </div>
            `;
            container.innerHTML += weatherHtml;
        }
    }
}

// Вызов функции для обновления виджета погоды
document.addEventListener('DOMContentLoaded', updateWeatherWidget); 