
function handleSearchClick() { // Function that handles search and click event
    const APIKey = '4111cbeb8fcaf4ceddace197cebe2683'; // APIKey 
    const city = document.querySelector('.search-box input').value; 


    if (city === '') return; // If the city is the same as the input

    fetchWeatherData(APIKey, city); // Fetch the data
}


function fetchWeatherData(APIKey, city) { // Fetch function
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => handleWeatherData(json))
        .catch(error => console.error('Error fetching weather data:', error));
}


function handleWeatherData(json) { // Function to handle data that is fetched from the API
    console.log(json)
    const container = document.querySelector('.container');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');

    if (json.cod === '404') { // If the search input comes with error 404, show the error page
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block'; 
        error404.classList.add('fadeIn');
        return;
    }

    // Defining the different details of weather
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    const title = document.querySelector('.title');

    switch (json.weather[0].main) { // Switch cases for different weathers
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Clouds':
            image.src = 'images/cloud.png';
            break;
        case 'Mist':
            image.src = 'images/mist.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Drizzle':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        default:
            image.src = '';
    }

    // How the details are displayed
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    // What happens when the details are displayed
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('addIn');
    weatherDetails.classList.add('fadeIn');
    title.classList.add('fadeInTitle');
    container.style.height = '590px';
}


const search = document.querySelector('.search-box button');
search.addEventListener('click', handleSearchClick);
