'use strict';

// IIFE--> theme toggle
$(function() {
    // initialize theme from localStorage
    const stored = localStorage.getItem('data-theme');
    if (stored === 'light') {
        $('body').attr('data-theme', 'light');
        $('.theme-toggle').text('🌙 Try Dark');
    }

    $('.theme-toggle').on('click', function() {
        const currentTheme = $('body').attr('data-theme');

        if (currentTheme === 'dark') {
            $('body').attr('data-theme', 'light');
            $('.theme-toggle').text('🌙 Try Dark');

            localStorage.setItem('data-theme', 'light');
        }else {
            $('body').attr('data-theme', 'dark');
            $('.theme-toggle').text('🌞 Need Light?');

            localStorage.setItem('data-theme', 'dark');
        }
    });
});

// Fetch only the basics for home page cards
const listUrl = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital";

fetch(listUrl)
    .then((response) => response.json())
    .then((result) => {

        // Clear the container first
        let container = $(".cardsContainer");
        container.empty();

        // Loop through the data
        $.each(result, function(index, country) {
            let cardHtml = `
                <article class="country-card" data-region="${country.region}">
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                    <div class="info">
                        <h3>${country.name.common}</h3>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    </div>
                </article>
            `;

        // Append the card to the container
        container.append(cardHtml);
    });

}).catch((err) => console.log('E: ',err));

// Search country by their name
// Filter country based on their region
function filterCards() {
    const searchTerm = $('.search-input').val().toLowerCase();
    const selectedRegion = $('.region-filter').val();

    $(".country-card").each(function() {
        const countryName = $(this).find("h3").text().toLowerCase();
        const countryRegion = $(this).data("region"); // Grabs the data-region attribute

        // Logic: Card must match the text AND (be the right region OR region filter is 'all')
        const matchesName = countryName.includes(searchTerm);
        const matchesRegion = (selectedRegion === "all" || countryRegion === selectedRegion);

        $(this).toggle(matchesName && matchesRegion);
    });
}

// Trigger the filter whenever the user types OR changes the dropdown
$(".search-input, .region-filter").on("input change", function() {
    filterCards();
});


// ====== Detailed Page logic ======
$('.cardsContainer').on('click', '.country-card', function() {
    // 'this' refers to the card that was clicked
    let countryName = $(this).find('h3').text().trim();
    
    if (countryName) {
        window.location.href = `detail.html?name=${encodeURIComponent(countryName)}`;
    } else {
        console.error("Could not find country name in <h3>");
    }
});

