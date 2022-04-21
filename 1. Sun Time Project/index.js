// Create a widget that allows you to search by location (cities) and display hours of sunrise and sunset
 
// OK 1. create search bar and connect it with API locations -- time of sunrise/sunset has to be updated by syncronizing to underlying database
// OK // 1.1 create the design for the page
// OK // 1.2 create search bar
// OK // create a Sarch button, so when typed you can confirm


const searchInput = document.getElementById("search-input") 
const searchBtn = document.getElementById("search-btn")
const saveBtn = document.getElementById("save-btn")
const mapCity = document.getElementById("mappa")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
let savedItems = document.getElementById("saved-items")
const errorMessage = document.getElementById("error-message")
const deleteAllBtn = document.getElementById("delete-all")
// let's define a variable that contains the values in localStorage, so they will be rendered out when page is refreshed
const itemsFromLocalStorage = JSON.parse(localStorage.getItem("emptyListSavedItems"))

let cityName = ""
// access key is taken from "OpenWeather API"
const accessKey = "7abd9140ffaee6ecffd6022f8f27c79e"
//const accessKeyGoogleMaps = ""

// OK // the Search button triggers a function(): get a JSON request for the typed location 
async function getData() {
    // fetch data that will then be assigned to a variable
    const cityFound = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${accessKey}`)
    return cityFound.json()
}

function capitalize(cityToCap) {
    // Split the whole city name in single words and capitalize each word
    // then recompose those words and assign it to cityName
    let cityNameArray = cityToCap.split(" ")
    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < cityNameArray.length; i++) {
        cityNameArray[i] = cityNameArray[i].charAt(0).toUpperCase() + cityNameArray[i].slice(1);
    }
    cityName = cityNameArray.join(" ")
    return cityName
}

// OK // return the result in a text below (first, then i will change it to a box) if found, return NO if not found/error  
searchBtn.addEventListener("click", async function clickedButton() {   
    if (searchInput.value !== "") {
        cityName = capitalize(searchInput.value)

        // fetch data
        getData()
        
        // assign fetch data to a variable "data"
        // remember to add "await" in front of the getData() function, or clickButton will not work with "async"
        const data = await getData()

        // if city is not found, trowh an exception
        if (data.message === "city not found") {
            errorMessage.innerHTML = "Sorry, city not found! Try again."
        } else {
            console.log({data})
       
            const sunriseTime = format_time(data.sys.sunrise)
            const sunsetTime = format_time(data.sys.sunset)
            const countryCode = data.sys.country
            
            // render time in boxes below
            sunrise.innerHTML = await sunriseTime
            sunset.innerHTML = await sunsetTime
            mapCity.innerHTML = await (`${cityName}, ${countryCode}`)

            // remove error message when searching again successfully
            errorMessage.innerHTML = ""
        }
        // delete name of city in search bar
        searchInput.value = ""
    }
})

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
  

// OK // // find a free API with all the main locations in the world --> search by location name 
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
// OK // 2.1 when clicked, display a centered box below with features below
// // 2.2 create: Location name, Sunrise time, Sunset time and snapshot of location on world map
// OK // 2.3 import sunset and sunrise emoji and display them in proper boxes on the side
// OK // 2.3.1 adjust overall size of div, so that it not go outside the webpage and proportion are maintained equal (both hight and width)

// 3. create button to save that search and add it below permanently
// OK // 3.1 save button to save last search
let emptyListSavedItems = []

// let's create a separate function to render the saved items below
function render(listObject) {
    let listItems = ""
    // iterate throught empty list length. Every time clicked on SAVE, add item on list 
    // display every saved item as a <div> below, with city name & country code   
    // in case it is the first search, always add location to the list
    for (i=0; i<listObject.length; i++) {  
        add = `<div>${listObject[i]}</div>`
        listItems += add
        }
    savedItems.innerHTML = listItems
    console.log(savedItems.innerHTML)
}

// OK // check if the location you want to save is already saved
// // BONUS: capitalize the search so "milano" == "Milano" // //

saveBtn.addEventListener("click", function() {
    

    // first "if" is to avoid saving "LOCATION" in saved items list
    if (mapCity.innerHTML == "LOCATION") {
    } else {
        if (emptyListSavedItems.length > 0) {
            for (i=0; i<emptyListSavedItems.length; i++) {
                if (emptyListSavedItems.includes(mapCity.innerHTML)) {
                    errorMessage.innerHTML = "Sorry, it looks like this location is already saved!"
                    break
                } else {
                    emptyListSavedItems.push(mapCity.innerHTML)
                    break
                }
            }       
        } else {
            emptyListSavedItems.push(mapCity.innerHTML)
        }
    }
    render(emptyListSavedItems)
    
    localStorage.setItem("emptyListSavedItems", JSON.stringify(emptyListSavedItems))
    let retrieveLocalStorage = localStorage.getItem("emptyListSavedItems")
    console.log(`This is the local storage: ${JSON.parse(retrieveLocalStorage)}`)
})

// OK // setting localStorage to true, we will render items saved in local storage when page is refreshed
if (itemsFromLocalStorage) {
    emptyListSavedItems = itemsFromLocalStorage
    render(itemsFromLocalStorage)
}

// OK // implement a DELETE ALL button to clear local storage
deleteAllBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    emptyListSavedItems = []
    render(emptyListSavedItems)
})

// // 3.2 saved location will be displayed on a line (bar) below
// // 3.3 add possibility to click on previous saved location to change main box displayed ("VIEW" button near each saved location)
// // 3.4 if changed, last location will be lost if not saved. If saved will be simply added below (and in localStorage)
// // 3.3 create button DELETE if the user wants to delete what previously saved near each saved location ("DELETE" button near each saved location)

// 4. When new search and select it, substitute new search with wath displayed in box
