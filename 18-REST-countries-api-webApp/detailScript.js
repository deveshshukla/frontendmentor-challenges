'use strict';

// Back button
$('.btnBack').on('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html';
});

// Get the name from the 'URL Param'
const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');

if (countryName) {
    // Fetch specific country data using the name
    const detailUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(detailUrl)
        .then((response) => response.json())
        .then((result) => {
            // ✅ Correct: Access the first item in the array
            const country = result[0]; 

            // 1. Flag & Alt (Safe check for nested flags object)
            $('.flagImg').attr('src', country.flags?.png ?? 'placeholder.png');
            $('.flagImg').attr('alt', country.flags?.alt ?? 'Flag image');

            // 2. Names (Safe check for nested official name)
            $('.countryName').text(country.name?.official ?? 'N/A');

            // 3. Native Name (Uses a fallback to official name if nativeName is missing)
            const native = country.name?.nativeName;
            const nativeKey = native ? Object.keys(native)[0] : null;
            const finalNative = nativeKey ? native[nativeKey].common : (country.name?.common ?? 'N/A');
            $('.nativeName').text(finalNative);

            // 4. Numbers (Population & Area)
            $('.population').text(country.population?.toLocaleString() ?? '0');
            $('.area').text(country.area?.toLocaleString() ?? '0');

            // 5. Region & Subregion
            $('.region').text(country.region ?? 'N/A');
            $('.subRegion').text(country.subregion ?? 'N/A');

            // 6. Capital
            $('.capital').text(country.capital?.join(', ') ?? 'No Capital');

            // 7. Domain (TLD is usually an array)
            $('.domain').text(country.tld?.join(', ') ?? 'N/A');

            // 8. Currency (Safe check for dynamic keys)
            const curr = country.currencies;
            if (curr && Object.keys(curr).length > 0) {
                const firstKey = Object.keys(curr)[0];
                $('.currency').text(`'${curr[firstKey]?.symbol ?? ''}' ${curr[firstKey]?.name ?? 'N/A'}`);
            } else {
                $('.currency').text('N/A');
            }

            // 9. Languages
            $('.langs').text(country.languages ? Object.values(country.languages).join(', ') : 'None');

            // 10. Borders: creating separate tags for each
            const borders = country.borders;
            const borderContainer = $('.borderCountry');

            if (borders && borders.length > 0) {
                // Create an array of <a> tags
                const borderButtons = borders.map(code => 
                    `<a href="#" class="border-btn" data-code="${code}">${code}</a>`
                ).join('');
                
                borderContainer.html(borderButtons); 
            } else {
                borderContainer.text('No borders');
            }

            // 11. Map
            $('.gMap').off('click').on('click', (e) => {
                e.preventDefault();
                const url = country.maps?.googleMaps;
                if (url) {
                    window.open(url, '_blank');
                } else {
                    alert("Map not available for this region");
                }
            });

        }).catch((err) => console.log('E: ',err));
};


// Listen for clicks on the border buttons
$('.borderCountry').on('click', '.border-btn', function(e) {
    e.preventDefault();
    const countryCode = $(this).data('code');

    // Step 1: Fetch the full name from the alpha code
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(res => res.json())
        .then(data => {
            const fullName = data[0].name.common;
            
            // Step 2: Redirect to the same detail page with the new name
            window.location.href = `detail.html?name=${encodeURIComponent(fullName)}`;
        })
        .catch(err => console.error("Error fetching border country:", err));
});

