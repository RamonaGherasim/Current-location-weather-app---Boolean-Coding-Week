const weatherIcon = document.querySelector(".weather-icon")
const weatherLocation = document.querySelector(".weather-location")
const weatherTemperature = document.querySelector(".weather-temperature")
const descriptionElem = document.querySelector(".description")
const htmlElem = document.documentElement

navigator.geolocation.getCurrentPosition(onSuccess, onError)

function onSuccess(data) {
    console.log(data)

    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;

    const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '5eabfe88b69ebff8b2d2c1968bc189ae';
    const UNITS = 'metric';
    const LANGUAGE = 'en';

    // example: https://openweathermap.org/current#one
    const url = `${ENDPOINT}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${UNITS}&lang=${LANGUAGE}`;

    
    // Send the location data to the API

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // Once we get the data, extract it, we will update the webpage:
            const iconCode = data.weather[0].icon
            const description = data.weather[0].description
            const temp = Math.floor(data.main.temp)

            // Choose the right image based on the weather data
            weatherIcon.src = `images/${iconCode}.png`
            weatherIcon.alt = description

            weatherLocation.innerText = data.name

            // Show the temperature
            weatherTemperature.innerText = `${temp}°`
            
            // Choose the right description
            descriptionElem.innerText = descriptions[iconCode]
            
            htmlElem.classList.remove('js-loading')
        });

}

function onError(error) {
    console.error(error)
}

// a list of weather descriptions stored by key that corresponds to the Open Weather Map API response data
const descriptions = {
    '01d': 'Remember to apply suncream!',
    '01n': 'Good night!',
    '02d': 'Variable...',
    '02n': 'Beware werewolves...',
    '03d': 'Perfect lighting for photos!',
    '03n': 'Sleep well :)',
    '04d': 'Today: a case of the classic British overcast sky :)',
    '04n': 'So cloudy, you won\'t even see the moon!',
    '09d': 'You might need a brolly.',
    '09n': 'Cover up well today',
    '10d': 'You\'ll need two umbrellas',
    '10n': 'Don\'t expose bare skin to the sun!',
    '11d': 'Wear rubber boots!',
    '11n': 'Might be one or two sparks in the sky',
    '13d': 'Weather for snow-men and snow-angels.',
    '13n': 'Perfect night to be under the stars outside!',
    '50d': 'Fog lights should be on!',
    '50n': 'Drive carefully!',
}