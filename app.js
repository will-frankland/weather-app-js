window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector('.temperature-description');
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
  const locationIcon = document.querySelector('.weather-icon');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=45d14f33fabe16763a7406c21cb0a722`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const temperature = data.main.temp;
          const { description, icon } = data.weather[0];
          const weatherDescription = data.weather[0].main

          temperatureDegree.textContent = Math.round(temperature - 273.15);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.name;
          locationIcon.innerHTML= `<img src="icons/${icon}.png">`;
          // Formula for Farenheit
          const farenheit = temperature * (9 / 5) - 459.67;


          // Celsius / Farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "°C") {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = Math.floor(farenheit);
            } else {
              temperatureSpan.textContent === "°F";
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = Math.floor(temperature - 273.15)
            }
          })

        })
    });
  }
});