const mapDiv = document.getElementById("map");

const coords = JSON.parse(mapDiv.dataset.coords);
const title = mapDiv.dataset.title;

const map = L.map("map").setView([coords[1], coords[0]], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

const redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.marker([coords[1], coords[0]], { icon: redIcon })
  .addTo(map)
  .bindPopup(title)
  .openPopup();
