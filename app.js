// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiVZn739CJx-nieEy-kZU0FW6i10SyQlU",
    authDomain: "iotwebapp-8cade.firebaseapp.com",
    projectId: "iotwebapp-8cade",
    storageBucket: "iotwebapp-8cade.appspot.com",
    messagingSenderId: "331378942271",
    appId: "1:331378942271:web:02447c2bdfd0e300c4b38a",
    measurementId: "G-ZGMLL9JBDC",
    databaseURL: "https://iotwebapp-8cade-default-rtdb.firebaseio.com"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Initialize variables
  let humidity = 0;
  let temperature = 0;
  let light = 0;
  let water = 0;
  let motorValue = false;
  let lamp = false;
  
  // Database references
  const dbHumidity = database.ref("Humid");
  const dbTemperature = database.ref("Temperature");
  const dbLight = database.ref("Light");
  const dbWater = database.ref("Water");
  const dbMotorStatus = database.ref("motorStatus");
  const dbLamp = database.ref("Lamp");
  
  // Fetch data from Firebase and update UI
  dbHumidity.on("value", snapshot => {
    humidity = snapshot.val();
    document.getElementById("humidity_value").textContent = `${humidity}%`;
  });
  
  dbTemperature.on("value", snapshot => {
    temperature = snapshot.val();
    document.getElementById("temperature_value").textContent = `${temperature}°C`;
  });
  
  dbLight.on("value", snapshot => {
    light = snapshot.val();
    document.getElementById("light_value").textContent = light;
  });
  
  dbWater.on("value", snapshot => {
    water = snapshot.val();
    document.getElementById("water_value").textContent = `${water}%`;
  });
  
  dbMotorStatus.on("value", snapshot => {
    motorValue = snapshot.val();
    updateButtonStatus("motorBtn", motorValue);
  });
  
  dbLamp.on("value", snapshot => {
    lamp = snapshot.val();
    updateButtonStatus("lampBtn", lamp);
  });
  
  // Update button status based on database value
  function updateButtonStatus(btnId, value) {
    const btn = document.getElementById(btnId);
    btn.textContent = value ? "ON" : "OFF";
    btn.classList.toggle("btn-primary", value);
    btn.classList.toggle("btn-outline-danger", !value);
  }
  
  // Button click handlers
  document.getElementById("motorBtn").addEventListener("click", () => {
    firebase.database().ref("motorStatus").set(!motorValue);
  });
  
  document.getElementById("lampBtn").addEventListener("click", () => {
    firebase.database().ref("Lamp").set(!lamp);
  });
  