async function fetchCountries() {
    let res = await fetch('https://restcountries.com/v3.1/all');
    let countries = await res.json();
    displayCountries(countries);
}

function displayCountries(countries) {
    let container = document.getElementById('countries');
    container.innerHTML = '';
    countries.forEach(country => {
        let card = document.createElement('div');
        card.classList.add('country-card');
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <p>${country.name.common}</p>
        `;
        card.onclick = () => openModal(`https://en.wikipedia.org/wiki/${country.name.common}`);
        container.appendChild(card);
    });
}

function openModal(url) {
    document.getElementById('countryIframe').src = url;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('countryIframe').src = '';
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function filterCountries() {
    let query = document.querySelector('.input').value.toLowerCase();
    let cards = document.querySelectorAll(".country-card p");
    cards.forEach(card => {
        let match = card.innerText.toLowerCase().includes(query);
        card.parentElement.style.display = match ? "block" : "none";
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

window.onscroll = function () {
    document.getElementById("backToTop").style.display = 
        document.documentElement.scrollTop > 200 ? "block" : "none";
};

function showRandomCountry() {
    let cards = document.querySelectorAll(".country-card");
    if (cards.length > 0) {
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[randomIndex].scrollIntoView({ behavior: "smooth", block: "center" });
        cards[randomIndex].click();
    }
}

fetchCountries();