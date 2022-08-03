window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureTimezone = document.querySelector('.temperature-timezone');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position);
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
          const temperature = data.main.temp
          console.log('temp ->', temperature)
          const {description} = data.weather[0]

          temperatureDegree.textContent = Math.round(temperature - 273.15);
          temperatureDescription.textContent = description;
        })

    });

  }
});