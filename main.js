const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');

const apiKey = "96048dd30ceedbe4c6d289170fe1e20b";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            card.innerHTML = `<p class="errorDisplay">Please enter a valid city</p>`;
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const { main, name, weather } = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
        const temp = Math.floor(main.temp - 273.15);
        const description = weather[0].description;
   
        card.innerHTML = `
            <h1 class="cityName">${city}</h1>
            <h2 class="temp">${temp}°C</h2>
            <img src="${icon}" alt="Weather Icon">
            <h3 class="descDisplay">${description}</h3>
        `;

        card.style.display = 'flex';
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        card.innerHTML = `<p class="errorDisplay">Error: ${error.message}</p>`;
    });
});
