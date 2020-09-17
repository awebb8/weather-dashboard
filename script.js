$(document).ready(function() {

// Declare variable for search button
var searchBtn = $("#search-button");
var input = $("#search-input");
// Declare variables for city information
var temperatureEl = $("#temperature");
var humidityEl = $("#humidity");
var windSpeedEl = $("#wind-speed");
var uvIndexEl = $("#uv-index");

var cityName = $(".city-name-card");




// WHEN I search for a city 
// THEN I am presented with current and future conditions for that city and that city is added to the search history
searchBtn.on("click", function(e) {
    console.log("search button clicked");
    e.preventDefault();

    $("#forecast-section").empty();

    // LOCAL STORAGE
var citiesPreviouslySearched = JSON.parse(localStorage.getItem("weatherHistory"));

if (!citiesPreviouslySearched) {
    citiesPreviouslySearched = [];
}

var citiesList = {
    city: input.val()
};
console.log(citiesList);

citiesPreviouslySearched.push(citiesList);
localStorage.setItem("weatherHistory", JSON.stringify(citiesPreviouslySearched));

// var citySearchedName = $(".city-searched-name");
// citySearchedName.text(citiesList.city[i]);
// $(".city-searched-name").text(citiesList.city[0]);
// .prepend(citySearchedName);



    console.log(input.val());
    var date = moment().format("MM/DD/YYYY");
    console.log(date);

    cityName.text(input.val() + "  " + date);

$.ajax ({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + input.val() + "&appid=26c03499d95767da96d6275ea42c7a28",
    method: "GET"
}).then(function(response){
    console.log(response);



    temperatureEl.text(Math.floor(((((response.main.temp)- 273.15)*(9/5))+32)) + " °F");
    var currentWeatherImage = $("<img>");
    
    humidityEl.text(response.main.humidity + "%");
    
    windSpeedEl.text(response.wind.speed + "MPH");
    

    currentWeatherImage.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
    console.log(response.weather[0].icon);
    cityName.append(currentWeatherImage);
    // currentWeatherImage.style.width = '50%';
    // currentWeatherImage.style.height = auto;

});

$.ajax ({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + input.val() + "&appid=26c03499d95767da96d6275ea42c7a28",
    method: "GET"
}).then(function(response) {
    console.log(response);


    for (var i = 0; i < 5; i++) {
    // Display the date at the top of the card

    var newCardDiv = $('<div class="card forecast-card" style="width: 8rem;">');
    var cardBodyDiv = $('<div class="card-body">');
    var cardTitle = $('<h3 class="card-title">');
    var cardWeatherImage = $('<img>');
    var cardTemp = $('<p>');
    var cardHumidity = $('<p>');

    cardTitle.attr("id", "title" + i);
    cardTemp.attr("id", "temp" + i);
    cardHumidity.attr("id", "humidity" + i);

    cardWeatherImage.attr("src", "https://openweathermap.org/img/wn/" + response.list[i*8].weather[0].icon + "@2x.png");

    $("#forecast-section").append(newCardDiv);
    newCardDiv.append(cardBodyDiv);
    cardBodyDiv.append(cardTitle);
    cardBodyDiv.append(cardWeatherImage);
    cardBodyDiv.append(cardTemp);
    cardBodyDiv.append(cardHumidity);

    $("#title" + i).text(moment().add(i + 1, 'days').format("MM/DD/YYYY"));
    // i is multiplied by 8 because every day has 8 forecasts (for different times throughout the day)
    var temperatureForecast = (response.list[i*8].main.temp);
    var forecastTempKelvinToF = (((parseInt(temperatureForecast) - 273.15)*(9/5))+32);


    $("#temp" + i).text("Temp: " + Math.floor(forecastTempKelvinToF) + " °F");
    $("#humidity" + i).text("Humidity: " + response.list[i*8].main.humidity + "%");

    }

    var latitude = response.city.coord.lat;
    var longitude = response.city.coord.lon;
    console.log("lat:" + latitude + "lon: " + longitude);

    $.ajax ({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=26c03499d95767da96d6275ea42c7a28&lat=" + latitude + "&lon=" + longitude,
        method: "GET"
    }).then(function(uvResponse) {
        console.log(uvResponse);
        uvIndexEl.text(uvResponse.value);
    });

    });
});





// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast 
});