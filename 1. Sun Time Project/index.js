// Create a widget that allows you to search by location (cities) and display hours of sunrise and sunset
// understand how to connect API & sync
 
// 1. create search bar and connect it with API locations -- time of sunrise/sunset has to be updated by syncronizing to underlying database
// OK // 1.1 create the design for the page
// OK // 1.2 create search bar
// OK // create a Sarch button, so when typed you can confirm
const searchInput = document.getElementById("search-input") 
const searchBtn = document.getElementById("search-btn")
let sunrise = document.getElementById("sunrise")
let sunset = document.getElementById("sunset")
let cityName = ""
// access key is taken from "OpenWeather API"
const accessKey = "7abd9140ffaee6ecffd6022f8f27c79e"

// OK // the Search button triggers a function(): get a JSON request for the typed location 
function render() {
    // render name of city below
    sunrise.innerHTML = searchInput.value
}


async function getData() {
    // fetch data that will then be assigned to a variable
    const cityFound = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${accessKey}`)
    return cityFound.json()
}

// // return the result in a text below (first, then i will change it to a box) if found, return NO if not found/error  
searchBtn.addEventListener("click", async function clickedButton() {
    if (searchInput.value !== "") {
        cityName = searchInput.value

        // fetch data
        getData()
        
        // assign fetch data to a variable "data"
        // remember to add "await" in front of the getData() function, or clickButton will not work with "async"
        const data = await getData()
        console.log({data})
       
        const sunriseTime = format_time(data.sys.sunrise)
        const sunsetTime = format_time(data.sys.sunset)

        console.log(`Sunrise time in ${cityName} is ${sunriseTime} locale time`)
        console.log(`Sunset time in ${cityName} is ${sunsetTime} locale time`)
        // render name of city below
        render()

        // delete name of city in search bar
        searchInput.value = ""
    }
})


// old way to fetch data:    
//fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${accessKey}`)
//.then(response => response.json())
//.then(data=> console.log((`${cityName} sunset time is ${data.sys.sunset}`)))
//}


// this function works for converting UNIX time to current time
function format_time(s) {

    // this only returns UTC format
    //return new Date(s * 1e3).toISOString().slice(-13, -5);

    // let us convert UTC format to locale format (according to client side machine request)
    // use 'new Date("UTC ISO format")', where "UTC ISO format" is "new Date(s * 1e3).toISOString()"
    let d = new Date(new Date(s * 1e3).toISOString());
    let formattedDate = Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format(d);

      return formattedDate
}
  

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
// // 2.2 create: Location name, Sunrise time, Sunset time and snapshot of location on world map
// OK // 2.3 import sunset and sunrise emoji and display them in proper boxes on the side
// // 2.3.1 adjust overall size of div, so that it not go outside the webpage and proportion are maintained equal (both hight and width)

// 3. create button to save that search and add it below permanently
// // 3.1 save button to save last search
// // 3.2 saved location will be displayed on a line (bar) below
// // 3.3 add possibility to click on previous saved location to change main box displayed ("VIEW" button near each saved location)
// // 3.4 if changed, last location will be lost if not saved. If saved will be simply added below (and in localStorage)
// // 3.3 create button DELETE if the user wants to delete what previously saved near each saved location ("DELETE" button near each saved location)

// 4. When new search and select it, substitute new search with wath displayed in box
