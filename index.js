import { routeData } from "./data.js";

// Declaration and init map location.
const map = L.map('map').setView([60.908479414005015, 10.810253805299897], 7);
const inputBoxButton = document.querySelector('.inputBoxButton');
const inputBoxInput = document.querySelector('.inputBoxInput');

//Adding map to the pages.
new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Search button event.
inputBoxButton.addEventListener('click', () => {
    searchLocationApi(inputBoxInput.value);
});

//Search functiion.
async function searchLocationApi(x) {
    const displayBox = document.querySelector('.displayBox');
    //Message to user...............?
    displayBox.innerHTML = ``;
    //Getting search location(s) from the api.
    const url = `https://nominatim.openstreetmap.org/search?q=${x}&format=json&limit=25`;
    const response = await fetch(url).then(respons => respons.json());
    if (response.length > 1) {
        response.forEach(x => {
            //Displaying search result on the page.
            displayBox.innerHTML += `
                <div class="displayBoxRender">
                    <button class="displayBoxLocResultButton" value="${x.lat} ${x.lon}">
                        <div class="displayBoxLocResult">${x.display_name}</div>
                    </button>
                </div>
            `;
        });
        document.querySelectorAll('.displayBoxLocResultButton').forEach((x) => {
            x.addEventListener('click', () => {
                const lat = x.value.slice(0, x.value.search(/ /));
                const lon = x.value.slice(x.value.search(/ /) + 1, x.value.length);
                L.marker([lat, lon]).addTo(map);
                displayBox.innerHTML = '';
            });
        });
    } else {
        //Adding marker to the map.
        L.marker([response[0].lat, response[0].lon]).addTo(map);
    }
}




//Legger til en markører på kartet.
routeData.osterdal.forEach(x => {
    L.marker(x.latLng).addTo(map);
});
