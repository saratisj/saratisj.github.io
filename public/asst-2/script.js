//const { data } = require("cypress/types/jquery");

/** Have to create an endpoint */
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const eat = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => eat.push(...data))

function matchfinder(words, eat){
    return eat.filter(place => { 
        const regex = new RegExp(words,'gi');
        return place.name.match(regex) || place.category.match(regex)
    })};
    
function displayMatch() {
    const matchArray = matchfinder(this.value,eat);
    let html = matchArray.map(place => {
        const regex = new RegExp(this.value,'gi');
       // const placeName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
       // const catName = place.category.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
        <span class="name">${place.name} || </span>
        <span class="category">${place.category} || </span>
        <span class="city">${place.city}</span>
        </li>
        `;
    }).join('');
    if (this.value.length == 0) {
        html = [];}
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.textinput');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatch);
searchInput.addEventListener('keyup', displayMatch);