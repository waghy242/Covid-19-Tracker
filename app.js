const countries = document.querySelector('datalist');
const search = document.querySelector('#srch');
const date = document.querySelector('#date');
const nameCountry = document.querySelector('#name-country');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const recovered = document.querySelector('.recovered');
const newrecovered = document.querySelector('.new-recovered');
const newconfirmed = document.querySelector('.new-confirmed');
const newdeaths = document.querySelector('.new-deaths');
const chart = document.querySelector('.chart');

let dataChart = [];

const API_URL = "https://api.covid19api.com/summary";

async function covid(country){
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(country)
    if(res.status === 4 || res.status === 200){
        date.textContent = new Date(data.Date).toDateString();

        if(country === '' || country ==='world'){
            const {TotalConfirmed,TotalDeaths,TotalRecovered,NewConfirmed,NewDeaths,NewRecovered} = data.Global;
            //total confirmed cases
            confirmed.children[1].textContent = TotalConfirmed;
            //total deaths
            deaths.children[1].textContent = TotalDeaths;
            //total recovered
            recovered.children[1].textContent = TotalRecovered;
            //new confirmed
            newconfirmed.children[1].textContent = NewConfirmed;
            //new deaths
            newdeaths.children[1].textContent = NewDeaths;
            //new recovered
            newrecovered.children[1].textContent = NewRecovered;

            nameCountry.textContent = "The World";

        };
        
        data.Countries.forEach(item => {
            const option = document.createElement('option');
            option.value = item.Country;
            option.textContent = item.Country;
            countries.appendChild(option);

            if(country === item.Country){
                confirmed.children[1].textContent = item.TotalConfirmed;
                deaths.children[1].textContent = item.TotalDeaths;
                recovered.children[1].textContent = item.TotalRecovered;
                newconfirmed.children[1].textContent = item.NewConfirmed;
                newdeaths.children[1].textContent = item.NewDeaths;
                newrecovered.children[1].textContent = item.NewRecovered;

                nameCountry.textContent = item.Country;

            }
        })
    }else{
        chart.innerHTML ='<h2>Loading.....</h2>';
    }
}
covid(search.value);

const btnSearch = document.querySelector('button');
btnSearch.addEventListener('click', (e)=>{
    e.preventDefault();
    covid(search.value);
})