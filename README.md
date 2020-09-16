# weather-dashboard

## The Repository
This site is stored in the "weather-dashboard" repository on Alix's github account (username: awebb8). This repository is public. 
Link to Repository:  https://awebb8.github.io/weather-dashboard/
Link to the project's web page:  https://github.com/awebb8/weather-dashboard 


## Project Goal
Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

## Weather Dashboard
![Weather Dashboard]()

## About the Weather Dashboard
The weather dashboard is for travelers that want to see the weather outlook for various cities, so that trips can be planned accordingly.  

## Sources
The [OpenWeather API](https://openweathermap.org/api) was used to retrieve weather data for cities. `localStorage` is used to store any persistent data.



## Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```


