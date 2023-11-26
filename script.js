document.getElementById('current-date').innerText = new Date().toLocaleDateString();
document.getElementById('current-day').innerText = new Date().toLocaleDateString('en-US', { weekday: 'long' });

document.getElementById('city-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        getWeather();
    }
});

function getWeather() {
    const apiKey = 'd3149124aef9015b012c0daff3f4e0fb';
    const cityInput = document.getElementById('city-input').value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('city-country').innerText = `${data.city.name}, ${data.city.country}`;
            document.getElementById('latitude-longitude').innerText = `Lat: ${data.city.coord.lat}, Lon: ${data.city.coord.lon}`;
            document.getElementById('temperature').innerText = `Temperature: ${Math.round(data.list[0].main.temp - 273.15)}°C`;
            document.getElementById('humidity').innerText = `Humidity: ${data.list[0].main.humidity}%`;
            document.getElementById('wind-speed').innerText = `Wind Speed: ${data.list[0].wind.speed} m/s`;

                    if (data.list[0].rain) {
                        document.getElementById('precipitation').innerText = `Precipitation: ${data.list[0].rain['1h']} mm in the last hour`;
                    } else {
                        document.getElementById('precipitation').innerText = 'Precipitation: N/A';
                    }

                    
                    const forecastCards = document.getElementById('forecast-cards');
                    const cards = forecastCards.getElementsByClassName('card');

                    for (let i = 0; i < 5; i++) {
                        const forecast = data.list[i * 8]; 
                        const card = cards[i]; 
                        card.innerHTML = `
                            <p>${new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                            <p>${new Date(forecast.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                            <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
                            <p>${(forecast.main.temp - 273.15).toFixed(1)}°C / ${(forecast.main.temp * 9 / 5 - 459.67).toFixed(1)}°F</p>
                        `;
                    }
    })
    .catch(error => console.error('Error fetching weather data:', error));
}