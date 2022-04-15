// Create a widget that allows you to search by location (cities) and display hours of sunrise and sunset
// understand how to connect API & sync
 
// 1. create search bar and connect it with API locations -- time of sunrise/sunset has to be updated by syncronizing to underlying database
// OK // 1.1 create the design for the page
// OK // 1.2 create search bar
// OK // create a Sarch button, so when typed you can confirm
const searchInput = document.getElementById("search-input") 
const searchBtn = document.getElementById("search-btn")
let sunrise = document.getElementById("display-box-sunrise")
let sunset = document.getElementById("display-box-sunset")
let cityName = ""
// access key is taken from "OpenWeather API"
const accessKey = "7abd9140ffaee6ecffd6022f8f27c79e"

// OK // the Search button triggers a function(): get a JSON request for the typed location 
function render() {
    // render name of city below
    sunrise.innerHTML = searchInput.value
}

// // return the result in a text below (first, then i will change it to a box) if found, return NO if not found/error  
searchBtn.addEventListener("click",function() {
    if (searchInput.value !== "") {
        cityName = searchInput.value
        // call API for input city in search bar
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${accessKey}`)
        .then(response => response.json()
        .then(data => console.log(data)))
        // render name of city below
        render()
        // delete name of city in search bar
        searchInput.value = ""
    }
        
})

// OK // // get an API with all the main locations in the world --> search by location name 
// // // get the location when typing in the search bar
// // // create an updatable list with first 3 location similar by name when typing


// // 1.3 display provisional results based on input
// // 1.4 add the possibility to either click on the result 
// OK // (OPTIONAL: or press "enter" when selected instead of clicking on the button)
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click()
        };  
})
// check whether the search bar is empty. If empty do not trigger the search function
    

// 2. connect location searched with sunrise/sunset time and display them with the location on a new "box" below (centered and well designed)
// // 2.1 when clicked, display a centered box below with features below
// // 2.2 create: Location name, Sunrise time, Sunset time (OPTIONAL: snapshot of location on world map)

// 3. create button to save that search and add it below permanently
// // 3.1 save button to save last search
// // 3.2 saved location will be displayed on a line (bar) below
// // 3.3 add possibility to click on previous saved location to change main box displayed
// // 3.4 if changed, last location will be lost if not saved. If saved will be simply added below (and in localStorage)
// // 3.3 create button DELETE if the user wants to delete what previously saved near each saved location

// 4. When new search and select it, substitute new search with wath displayed in box
