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

    console.log(input.val());
    var date = moment().format("MM/DD/YYYY");
    console.log(date);

    cityName.text(input.val() + "  " + date);

$.ajax ({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + input.val() + "&appid=26c03499d95767da96d6275ea42c7a28",
    method: "GET"
}).then(function(response){
    console.log(response);



    temperatureEl.text(response.main.temp);
    console.log(temperatureEl);
    humidityEl.text(response.main.humidity);
    console.log(humidityEl);
    windSpeedEl.text(response.wind.speed);
    console.log(windSpeedEl);

    $(temp).append(temperatureEl);

});

$.ajax ({
    url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=26c03499d95767da96d6275ea42c7a28",
    method: "GET"
}).then(function(response) {
    console.log(response);


    for (var i = 0; i < 5; i++) {
    // Display the date at the top of the card

    var newCardDiv = $('<div class="card" style="width: 8rem;">');
    var cardBodyDiv = $('<div class="card-body">');
    var cardTitle = $('<h3 class="card-title">');
    var cardList = $('<ul class="list-group list-group-flush">');
    var cardListTemp = $('<li class="list-group-item forecast-temp">');
    var cardListHumidity = $('<li class="list-group-item forecast-humidity">');

    cardTitle.attr("id", "title" + i);
    cardListTemp.attr("id", "temp" + i);
    cardListHumidity.attr("id", "humidity" + i);

    $("#forecast-section").append(newCardDiv);
    newCardDiv.append(cardBodyDiv);
    cardBodyDiv.append(cardTitle);
    cardBodyDiv.append(cardList);
    cardBodyDiv.append(cardListTemp);
    cardBodyDiv.append(cardListHumidity);

    $("#title" + i).text(moment().add(i, 'days').format("MM/DD/YYYY"));
    // $("#temp" + i).text.response.list[i].main.temp;
    // $("#humidity" + i).text.response.list[i].main.humidity;

    }

    var latitude = response.city.coord.lat;
    var longitude = response.city.coord.lon;
    console.log("lat:" + latitude + "lon: " + longitude);

    $.ajax ({
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=26c03499d95767da96d6275ea42c7a28&lat=" + latitude + "&lon=" + longitude,
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