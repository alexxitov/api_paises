const loadCountryAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}

const displayCountries = countries => {
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    const countriesHTML = countries.map(country => getCountry(country));
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join('');
}

const getCountry = (country) => {
    return `
        <div class="country-div">
            <img src="${country.flags.png}">
            <h2>${country.name.common}</h2>
            <h4>Población: ${(country.population / 1000).toFixed(1)} K</h4>
            <h4>Continente: ${country.region}</h4>
            <h4>Capital: ${country.capital}</h4>
        </div>
    `
}

loadCountryAPI(); // Cargar países en orden alfabético
//BUSCADOOR



let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");
let mapContainer = document.getElementById("map-container");

searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      
      let lat = data[0].latlng[0];
      let lng = data[0].latlng[1];
     

      
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continente:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Poblacion:</h4>
                <span>${(data[0].population/1000000).toFixed(1)} M</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Moneda:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Idioma:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
       
    `;
    mapContainer.innerHTML = `<div id="map"></div>`;
    
    var map = L.map('map').setView([lat, lng], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup(data[0].name.common)
        .openPopup();
  })
  .catch(() => {
    if (countryName.length == 0) {
      result.innerHTML = `<h3>No puedes dejar vacío este campo</h3>`;
    } else {
      result.innerHTML = `<h3>Ingresa un nombre de país válido.</h3>`;
    }
  });
});