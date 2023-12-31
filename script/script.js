'use strict';

const temp = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const cloudiness = document.querySelector('.cloudiness');

let valueCity = document.getElementById('inputCity');
let wrapperVector = document.getElementById('wrapper-vector');
let weatherLocation = document.getElementById('weather-location');
let imgCloudiness = document.getElementById('imgCloudiness');
let loupeClick = document.getElementsByClassName('button-loupe')[0];
let backgroundStule = document.querySelector('.bg-image');

let city = 'minsk';

valueCity.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') {
		city = valueCity.value;
		weatherData(city);
		valueCity.value = '';
	}
});

loupeClick.addEventListener('click', () => {
	city = valueCity.value;
	weatherData(city);
	valueCity.value = '';
});

function weatherData(city) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c46d10d1c142ac6c1cfe635c49e83765`
	)
		.then((Response) => Response.json())
		.then((data) => dataHandlerWeather(data));
}

function dataHandlerWeather(data) {
	if (data.cod == 200) {
		backgroundImage(data.name);
		temp.innerText = `${(data.main.temp - 273.15).toFixed(2)}°C`;
		humidity.innerText = `humidityBy: ${data.main.humidity}%`;
		windSpeed.innerText = `wind Speed: ${data.wind.speed}km/h`;
		cloudiness.innerText = `${data.weather[0].description}`;
		weatherLocation.innerText = ` ${data.name}`;
		imgCloudiness.src = `https://openweathermap.org/img/wn/${
			data.weather[0].icon + '@2x.png'
		}`;
	}
}

// альтернативый способ работы с json
/*async function weatherData-test() {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c46d10d1c142ac6c1cfe635c49e83765`
	).then((Response) => Response.json());

	return res;
}

async function dataHandlerWeather() {
	let data = await weatherData-test();
	if (data.cod == 200) {
		backgroundImage(data.name);
		temp.innerText = `${(data.main.temp - 273.15).toFixed(2)}°C`;
		humidity.innerText = `humidityBy: ${data.main.humidity}%`;
		windSpeed.innerText = `wind Speed: ${data.wind.speed}km/h`;
		cloudiness.innerText = `${data.weather[0].description}`;
		weatherLocation.innerText = ` ${data.name}`;
		imgCloudiness.src = `https://openweathermap.org/img/wn/${
			data.weather[0].icon + '@2x.png'
		}`;
	}
}*/

function backgroundImage(city) {
	fetch(
		`https://api.unsplash.com/search/photos?query=${city}&client_id=5Qh9rBeWz9My7VQZPJCAZO_TppyHIH_n853s4dqU44w`
	)
		.then((Response) => Response.json())
		.then((data) => valueBackgroundImage(data));

	function valueBackgroundImage(data) {
		if (data.total != 0) {
			backgroundStule.style.backgroundImage = `url(${
				data.results[Math.floor(Math.random() * data.results.length)].urls.full
			})`;
		}
	}
}

weatherData(city);
