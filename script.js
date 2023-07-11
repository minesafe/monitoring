// Inisialisasi Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoTX56wPp38NGitcsBKA3NGiYZvB5mvNk",
  authDomain: "minesafe-2023.firebaseapp.com",
  databaseURL: "https://minesafe-2023-default-rtdb.firebaseio.com",
  projectId: "minesafe-2023",
  storageBucket: "minesafe-2023.appspot.com",
  messagingSenderId: "825845917831",
  appId: "1:825845917831:web:7f05202d47d07d29e93022",
};

firebase.initializeApp(firebaseConfig);

// Referensi ke Firebase Realtime Database
const database = firebase.database();

// Mendapatkan nilai GPS lokasi alat
var gpsRef = database.ref("gps");
gpsRef.on("value", function (snapshot) {
  var latitude = snapshot.child("latitude").val();
  var longitude = snapshot.child("longitude").val();

  document.getElementById("latitude").textContent = latitude;
  document.getElementById("longitude").textContent = longitude;
});

// Mendapatkan nilai deteksi gas LPG
const gasRef = database.ref("gas");
gasRef.on("value", function (snapshot) {
  const gasValue = snapshot.child("gasValue").val();

  document.getElementById("gasValue").textContent = gasValue;
});

// Mendapatkan nilai detak jantung
const heartRateRef = database.ref("heartRate");
heartRateRef.on("value", function (snapshot) {
  const heartValue = snapshot.child("heartValue").val();

  document.getElementById("heartValue").textContent = heartValue;
});

var maxZoomLevel = 18; // Zoom level maksimum yang diinginkan

function initMap() {
  var map = L.map("map").setView([0, 0], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: maxZoomLevel, // Atur zoom level maksimum
  }).addTo(map);

  var marker = L.marker([0, 0]).addTo(map);

  var gpsRef = database.ref("gps");
  gpsRef.on("value", function (snapshot) {
    var latitude = snapshot.child("latitude").val();
    var longitude = snapshot.child("longitude").val();

    marker.setLatLng([latitude, longitude]);

    // Set view dengan zoom level yang lebih besar
    map.setView([latitude, longitude], maxZoomLevel);
  });
}

gpsRef.on("value", function (snapshot) {
  var latitude = snapshot.child("latitude").val();
  var longitude = snapshot.child("longitude").val();

  document.getElementById("latitude").textContent = latitude;
  document.getElementById("longitude").textContent = longitude;

  initMap(latitude, longitude);
});
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Format waktu menjadi HH:MM:SS
  var timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  // Perbarui isi elemen dengan ID "clock" dengan waktu terbaru
  document.getElementById("clock").textContent = timeString;
}

// Panggil fungsi updateClock setiap detik
setInterval(updateClock, 1000);

//--------------------------------------------------------------------------------------
