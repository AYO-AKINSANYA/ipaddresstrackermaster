var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

document.getElementById("search-button").addEventListener("click", async () => {
  const ip = document.getElementById("ip-input").value;
  const apiKey = "at_5DxDv3NhoZQV9n1vrU4gqPBZISCRp";
  const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    console.log(data); // Add this line to log the response data
    const postalCode = data.location.postalCode
      ? data.location.postalCode
      : "N/A";

    document.getElementById("ip-address").textContent = data.ip;
    document.getElementById(
      "location"
    ).textContent = `${data.location.country}, ${data.location.region}, ${postalCode}`;
    document.getElementById(
      "timezone"
    ).textContent = `UTC ${data.location.timezone}`;
    document.getElementById("isp").textContent = data.isp;

    const { lat, lng } = data.location;
    map.setView([lat, lng], 13);
    marker
      .setLatLng([lat, lng])
      .bindPopup(
        `${data.location.country}, ${data.location.region}, ${postalCode}`
      )
      .openPopup();
    document.getElementById("error-message").textContent = "";
  } catch (error) {
    console.error("Error fetching IP data:", error);
    document.getElementById("error-message").textContent =
      "Error: Invalid IP address or IP address not found.";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const genApi =
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_5DxDv3NhoZQV9n1vrU4gqPBZISCRp";
  async function apiFetcher() {
    const response = await fetch(genApi);
    try {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      console.log(data); // Add this line to log the response data
      const postalCode = data.location.postalCode
        ? data.location.postalCode
        : "N/A";

      document.getElementById("ip-address").textContent = data.ip;
      document.getElementById(
        "location"
      ).textContent = `${data.location.country}, ${data.location.region}, ${postalCode}`;
      document.getElementById(
        "timezone"
      ).textContent = `UTC ${data.location.timezone}`;
      document.getElementById("isp").textContent = data.isp;

      const { lat, lng } = data.location;
      map.setView([lat, lng], 13);
      marker
        .setLatLng([lat, lng])
        .bindPopup(
          `${data.location.country}, ${data.location.region}, ${postalCode}`
        )
        .openPopup();
    } catch (error) {
      console.error("Error fetching IP data:", error);
      document.getElementById("error-message").textContent =
        "Error fetching initial IP data.";
    }
  }
  apiFetcher();
});
