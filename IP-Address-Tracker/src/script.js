// IP Geolocation API key
const apiKey = 'at_JW9F4IuPCoPZB4HhSZJE0XnHnVXHS';

let map;
let marker;

// Initialize map
function initMap(latitude = 40.7128, longitude = -74.0060) {
  if (map) {
    map.setView([latitude, longitude], 13);
  } else {
    map = L.map('map').setView([latitude, longitude], 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 13,
    }).addTo(map);
  }

  // Remove existing marker
  if (marker) {
    map.removeLayer(marker);
  }

  // Add custom marker
  marker = L.marker([latitude, longitude], {
    icon: L.icon({
      iconUrl: '/public/icon-location.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
  }).addTo(map);
}

// Fetch IP or Domain information
async function fetchIPInfo(userInput = '') {

  // Clean the input: Remove http protocol as per API requirement
  let cleanInput = userInput.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

  // Check input for Domain or IP
  const isDomain = /[a-zA-Z]/.test(cleanInput);

  // Dynamically set parameter
  const queryParam = isDomain ? `domain=${cleanInput}` : `ipAddress=${cleanInput}`;

  // Construct URL
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&${queryParam}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = await response.text();

      alert(`HTTP error! \nstatus: ${response.status} \nDetails: ${errorMessage}`);

      throw new Error(`HTTP error! status: ${response.status} Details: ${errorMessage}`);
    }

    const data = await response.json();

    // Update UI
    document.getElementById('ipAddress').textContent = data.ip;
    document.getElementById('location').textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    document.getElementById('timezone').textContent = `UTC ${data.location.timezone}`;
    document.getElementById('isp').textContent = data.isp;

    // Update map
    initMap(data.location.lat, data.location.lng);

  } catch (error) {
    console.error("Error fetching data:", error);
    
    // Check if the error is likely caused by an ad blocker
    if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
      alert("Oops! Please disable your ad blocker to use this tool.");
    }
  }
}

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const ipInput = document.getElementById('ipInput').value.trim();
  if (ipInput) {
    fetchIPInfo(ipInput);
  }

  e.target.reset();
});

// Initialize with default IP
initMap();
fetchIPInfo();