"use strict";

const form = document.querySelector("#search");
let input__field = document.querySelector(".input-field");

form.addEventListener("submit" , function (e) {
    e.preventDefault();
    console.log();

    getCountryData(input__field.value);
    input__field.value = "";

});

const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/all/${country}`)
    .then(function(res) {
    console.log(res);
    if(!res.ok) throw new Error(`pais no encontrado${res.status}`)
    return res.json();

    })
    .then((data) => {
        console.log(data);
        renderCountry(data[0]);
    })
    .catch((err) => {
        console.error(err);
    });
};



const renderCountry = function (data) {

    const currency = data.currencies;
    console.log(currency);
    const [curr] = [Object.values(currency)];
   

    //language

    const language = data.languages;
    const [lang] = [...Object.values(language)];
    console.log(lang);

    const html = `
    <div class="country-card">
        <img src="${data.flags.png}" class="country-flag" alt="country flag">
        <div class="card-body">
            <h2 class="country-name">${data.name.common}</h2>
            <p class="country-detail">Capital : ${data.capital}</p>
            <p class="country-detail">Currency : ${curr.name}</p>
            <p class="country-detail">Population : ${(data.population/1000000).toFixed(1)} M </p>
            <p class="country-detail">Continent : ${data.continents}</p>
            <p class="country-detail">Language : ${lang}</p>
        </div>
    </div>
    
    `;
    
    document.querySelector(".container").insertAdjacentHTML("beforeend", html);
    
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
};