function setup() {
  fetchCountries();
}


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
      let searchValue = searchCountry.value.toLowerCase();
      if (
        lowerCaseName.includes(searchValue)
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
    selectShowBox.addEventListener("change", (event) => {
      targetCountries.innerHTML = "";
      countryList.forEach((country) => {
        if (event.target.value == country.region) {
          fetchCountries(country.name);
        }
      });
    });
  }
  


function fetchCountries() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      searchBar(data);
      countryInfo(data);
      makePageForCountries(data)
      matchRegion(data)
    }).catch((error) => console.log("error"));
}

window.onload = setup;
