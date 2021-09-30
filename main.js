// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const notiEle = document.getElementById("notification");
const iconEle = document.getElementById("icon");
const tempEle = document.getElementById("temperature");
const descEle = document.getElementById("description");
const windEle = document.getElementById("wind");
const locEle = document.getElementById("location");


// weather data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;

// this is not my api key, i got it from this --> "http://youtube.com/CodeExplained" person
// just to avoid creating an account on the api provider's site, yes that type of lazy i'm :)
const apiKey = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator) {

    //  on success, call setPosition
    //  on error, call showerror
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    // if not supported by the browser
    notiEle.innerText= "Sorry! your browser doesn't support Geolocation feature";
}

// reading and setting user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;    
    // console.log("latitude: " + latitude);
    // console.log("Longitude: " + longitude);
    getWeather(latitude, longitude);
     
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notiEle.innerText= error.message;
}

// ok, now time to get the weather
function getWeather(latitude, longitude){

    let apiCall = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
    fetch(apiCall)
        .then(function(response){
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.wind = data.wind.speed;
            // console.log("wind is " + weather.wind);
            weather.country = data.sys.country;
        })
        .then(function(){
            showWeather();
        });
}

// to render weather data
function showWeather() {
    //console.log(weather.iconId);
    // weather.iconId = "09d";
    iconEle.src = `icons/${weather.iconId}.png`;
    tempEle.innerHTML = `${weather.temperature.value} °<span>C</span>`;
    let desc = weather.description;
    descEle.innerHTML = desc;
    windEle.innerHTML = `wind ${weather.wind} km/h`;
    locEle.innerHTML = `${weather.city}, ${weather.country}`;
}

// converting weather c to f
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// click event on weather value on html
tempEle.addEventListener("click", function(){
    // console.log("clicked");
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempEle.innerHTML = `${fahrenheit} °<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else {
        tempEle.innerHTML = `${weather.temperature.value} °<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

