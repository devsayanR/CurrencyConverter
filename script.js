const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropDown = document.querySelectorAll('.select-container select');
const btn = document.getElementById('btn');
const fromSelect = document.querySelector('#select1');
const toSelect = document.querySelector('#select2');
const message = document.getElementById('converted-rate');



const changeFlag = (event) => {
    let country = event.value;
    let countryCode = countryList[country];
    let imgLink = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = event.parentElement.querySelector('img');
    img.src = imgLink;
}

for (let select of dropDown) {
    for (let curCode in countryList) {
        let options = document.createElement('option');
        options.value = curCode;
        options.innerText = curCode;
        if (select.name === "from" && curCode === "USD") {
            options.selected = "selected";
        } else if (select.name === "to" && curCode === "INR") {
            options.selected = "selected";
        }
        select.append(options);
    }
    select.addEventListener('change', (evt) => {
        changeFlag(evt.target);
    });
}

const exchangeRate = async () => {
    let amount = document.querySelector('form input');
    let amountValue = amount.value;
    if (amountValue < 1 || amountValue === "") {
        amountValue = 1;
        amount.value = "1";
    }
    const MAIN_URL = `${URL}/${fromSelect.value.toLowerCase()}/${toSelect.value.toLowerCase()}.json`
    let response = await fetch(MAIN_URL);
    let data = await response.json();
    let amt = data[toSelect.value.toLowerCase()];
    let gotAmount = amountValue * amt;

    message.innerText = `${amountValue} ${fromSelect.value} = ${gotAmount} ${toSelect.value}`;
}

btn.addEventListener("click", (event) => {
    event.preventDefault();
    exchangeRate();
});

window.addEventListener("load", () => {
    exchangeRate();
})
