let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

const fetchCountryData = () => {
    let countryName = countryInp.value.trim();

    if (!countryName) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        return;
    }

    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    result.innerHTML = `<h3>Loading data...</h3>`;

    axios.get(finalURL)
        .then((response) => {
            const data = response.data; 

            const countryData = data[0];
            
            const currencyKey = Object.keys(countryData.currencies)[0];
            const currencyName = countryData.currencies[currencyKey].name;
            const languagesList = Object.values(countryData.languages).join(", ");

            result.innerHTML = `
                <img src="${countryData.flags.svg}" class="flag-img">
                <h2>${countryData.name.common}</h2>
                
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Capital:</h4>
                        <span>${countryData.capital[0]}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Continent:</h4>
                        <span>${countryData.continents[0]}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Population:</h4>
                        <span>${countryData.population.toLocaleString()}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Currency:</h4>
                        <span>${currencyName} - ${currencyKey}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Common Languages:</h4>
                        <span>${languagesList}</span>
                    </div>
                </div>
            `;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            let errorMessage = "An error occurred. Please check your input or connection.";

            if (error.response && error.response.status === 404) {
                 errorMessage = "The country name is invalid or not found.";
            } else if (error.message) {
                 errorMessage = `An error occurred: ${error.message}. Please check your input or connection.`;
            }

            result.innerHTML = `<h3>${errorMessage}</h3>`;
        });
};

searchBtn.addEventListener("click", fetchCountryData);
countryInp.addEventListener("keyup", (e) => e.key === "Enter" && fetchCountryData());