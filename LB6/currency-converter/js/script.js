const dropList = document.querySelectorAll("form select");
const fromCurrency = document.querySelector(".from select");
const  toCurrency = document.querySelector(".to select");
const  getButton = document.querySelector("form button");

const apiKey = "6f500cceb902d0690de44c23";

dropList.forEach((select, index) => {
  for (let currency_code in country_list) {
    let selected = (index === 0 && currency_code === "USD") || (index === 1 && currency_code === "UAH") ? "selected" : "";
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    select.insertAdjacentHTML("beforeend", optionTag);
  }
  select.addEventListener("change", e => loadFlag(e.target));
});

function loadFlag(element) {
  let imgTag = element.parentElement.querySelector("img");
  imgTag.src = `https://flagcdn.com/48x36/${country_list[element.value].toLowerCase()}.png`;
}

window.addEventListener("load", getExchangeRate);

getButton.addEventListener("click", e => {
  e.preventDefault(); 
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");

  let amountVal = amount.value.trim(); 

  if (amountVal === "") {
      exchangeRateTxt.innerText = "Please enter an amount.";
      return;
  }

  let numericAmount = parseFloat(amountVal);
  
  if (isNaN(numericAmount) || numericAmount <= 0) {
      exchangeRateTxt.innerText = "Please enter a valid positive numeric amount.";
      return;
  }

  amountVal = numericAmount; 
  amount.value = amountVal;

  exchangeRateTxt.innerText = "Getting exchange rate...";

  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}
