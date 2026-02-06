import { routeData } from "./data.js";

const map = L.map('map').setView([60.908479414005015, 10.810253805299897], 7);
const inputBoxButton = document.querySelector('.inputBoxButton');
const inputBoxInput = document.querySelector('.inputBoxInput');
const displayBox = document.querySelector('.displayBox');

new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

async function searchLocationApi(x) {
    displayBox.innerHTML = '';
    const url = `https://nominatim.openstreetmap.org/search?q=${x}&format=json&limit=25`;
    const response = await fetch(url).then(respons => respons.json());
    let locNum = 0; 
    if (response.length > 1) {
        response.forEach(x => {
            locNum++
            console.log(x.display_name);
            console.log(response[x]);
            displayBox.innerHTML += `
                <div class="displayBoxRender">
                    <div class="displayBoxLocNumber">Location: ${locNum}</div>
                    <div class="displayBoxLocResult">${x.display_name}</div>
                </div>
            `;
        });
    } else {
        L.marker([response[0].lat, response[0].lon]).addTo(map);
    }
}

inputBoxButton.addEventListener('click', () => {
    searchLocationApi(inputBoxInput.value);
});


































/*

//Legger til en markører på kartet.
routeData.osterdal.forEach(x => {
    L.marker(x.latLng).addTo(map);
});


/*

//Legger til stopp utenfor ruten. 
inputBoxButton.addEventListener('click', () => {
    L.marker(
        [
            Number(newLoc.value.slice(0, newLoc.value.search(/ /i) - 1)),
            Number(newLoc.value.slice(newLoc.value.search(/ /i) + 1, newLoc.value.length)),
        ]
    ).addTo(map);
});

*/