const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

const form = document.querySelector("form")
const footer = document.querySelector("main footer")
const amount = document.getElementById('amount');
const currency = document.getElementById("currency");
const description = document.getElementById("description")
const result = document.getElementById("result")

amount.addEventListener("input", () => {
    amount.value = amount.value.replace(/\D/g,'');
})

form.onsubmit = function (event) {
    event.preventDefault()
    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, 'US$');
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, '€');
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, '£');
            break;
    }
}

function convertCurrency(amount, price, symbol) {
    try {
        footer.classList.add("show-result");
        description.textContent = `${symbol} 1 = ${formatBRL(price, "currency")}`
        result.textContent = `${formatBRL(price * amount)} Reais`
    } catch (e) {
        footer.classList.remove("show-result");
    }
}

function formatBRL(value, style = "decimal") {
    if(style === "currency") {
        return Number(value).toLocaleString("pt-br", { style: "currency", currency: "BRL"});
    }
    return Number(value).toLocaleString("pt-br", {style});
}