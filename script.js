function setup() {
  fetchCountries();
}

const checkbox= document.getElementById("checkbox");

checkbox.addEventListener("change", ()=>{
  document.body.classList.toggle("dark")
})

function makePageForCountries(countryList){
  return countryList.forEach((country) => {
    countryInfo(country)
  })
}


let targetCountries = document.querySelector(".allCountries");

function countryInfo(country){
  
  // let targetCountries = document.querySelector(".allCountries");
  let  countryCard =document.createElement('div')
  countryCard.className = "countryCard col-12 sm-col-12 md-col-5 lg-col-3"
  countryCard.innerHTML = `<img src = "${country.flag}" alt = "country flag">
  <p>${country.name}</p>
  <p>Population: ${country.population.toLocaleString()}</p>
  <p>Region: ${country.region}</p>
  <p>Capital: ${country.capital}</p>`;
  
  targetCountries.append(countryCard)
}

function searchBar(countryList) {
  let searchCountry = document.querySelector(".countrySearch")
  
  searchCountry.addEventListener("keyup", () => {
    let filteredCountries = countryList.filter((country) => {
      let lowerCaseName = country.name.toLowerCase();
      let lowerCaseCapital = country.capital.toLowerCase();
      let searchValue = searchCountry.value.toLowerCase();
      if (
        lowerCaseName.includes(searchValue) || lowerCaseCapital.includes(searchValue)
      ) {
        return country;
      }
    });
    targetCountries.innerHTML = " "
    return makePageForCountries(filteredCountries)
  })
}


function matchRegion(countryList){
  let targetSelectRegion = document.querySelector(".regionSelect")
  targetSelectRegion.addEventListener("change",()=>{

      let selectedValue = document.querySelector(".regionSelect").value
     

     let filteredByRegion = countryList.filter((country) => {
        if (selectedValue == country.region) {
          
          return country
          
        }
      
    });
    targetCountries.innerHTML = " "
    return makePageForCountries(filteredByRegion)
  })
}

  


function fetchCountries() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      makePageForCountries(data)
      searchBar(data);
      matchRegion(data);
      countryInfo(data);
    }).catch((error) => console.log("error"));
}

window.onload = setup;
