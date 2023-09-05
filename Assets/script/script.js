
// 'DOMContentLoaded' event handler 
let weatherApi = '67524d354333919cc2f64508479d327c';

$(document).ready(function(){
  
  $('#userSubmit').on('submit', function(event){
    event.preventDefault();
    
    // clears exiting data, if user enters another city 
    $("#curretWeather").empty();
    $("#forecast").empty();
    $("#cityNameDiv").children('img').remove(); //removes the element 

    
    let cityInput = $('#userInput').val();
    if (cityInput === "") {
      alert("Please enter a city.");
      return;
    }else{
    console.log(cityInput); // CheckPoint --- PASS
    weekfetchRequest(cityInput);
    currentDayRequest(cityInput);
    saveSearch(cityInput);
    }

  });

});

  $('#buttonHistory').on('click', '.cityBtn', function(event){
    
    // clears exiting data, if user enters another city 
    $("#curretWeather").empty();
    $("#forecast").empty();
    $("#cityNameDiv").children('img').remove(); //removes the element 
  
    
    let btnInput = event.target.getAttribute('data-city');
    console.log(btnInput);
    weekfetchRequest(btnInput);
    currentDayRequest(btnInput);
   
  });



// *** gets curret weather conditions
function currentDayRequest(cityInput){
     
  let enteredCity = cityInput; 
  let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + enteredCity + '&appid=' + weatherApi +'&units=imperial';

  console.log(apiUrl) // check point --- PASS
  
  // *** API request for 5 day forecast ***
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
          console.log(data)
          currentDayDisplay(data)
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });

}


// *** displays current weather 
function currentDayDisplay(today){

  let day = today;
  let date = dayjs().format('MM/DD/YYYY');
  let city = day.name;
  let dayTemp = day.main.temp; 
  let dayHumidity = day.main.humidity;
  let daywind = day.wind.speed;
  let iconImage = day.weather[0].icon; 

  let rootDiv = $('#curretWeather'); //html parent element
  let cityName = $('#city');
  let icon =$('<img class = "w-12 ml-4  rounded-full " src = "http://openweathermap.org/img/w/' + iconImage + '.png"></img>');

  //
  let rootCityNameDiv = $('#cityNameDiv');
  cityName.text(city + '(' + date + ')');
  rootCityNameDiv.append(icon); 

  let P_temp = $('<p class = "w-4/12 h-24 text-center mx-2 bg-gradient-to-r from-sky-500 via-transparent to-sky-500 rounded-lg text-zinc-900 font-serif font-bold text-3xl pt-2 antialiased shadow-md shadow-slate-900">Temperature: <br>' + dayTemp + 'F</p>').hide();
  let P_humidity = $('<p class = "w-4/12 h-24 text-center mx-2 bg-gradient-to-r from-sky-500 via-transparent to-sky-500 rounded-lg text-zinc-900 font-serif font-bold text-3xl pt-2 antialiased shadow-md shadow-slate-900">Humidity: <br>' + dayHumidity  + '%</p>').hide();
  let P_wind = $('<p class = "w-4/12 h-24 text-center mx-2 bg-gradient-to-r from-sky-500 via-transparent to-sky-500 rounded-lg text-zinc-900 font-serif font-bold text-3xl pt-2 antialiased shadow-md shadow-slate-900">Wind: <br>' + daywind + 'MPH</p>').hide();
  
  rootDiv.append(P_temp);
  P_temp.fadeIn('slow');
  rootDiv.append(P_humidity);
  P_humidity.fadeIn('slow');
  rootDiv.append(P_wind);
  P_wind.fadeIn('slow');
  
}



// *** gets the week forecast from openweathermap
function weekfetchRequest(cityInput){
  
  let enteredCity = cityInput; 
  let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + enteredCity + '&appid=' + weatherApi +'&units=imperial';

  console.log(apiUrl) // check point --- PASS
  
  // *** API request for 5 day forecast ***
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
          response.json().then(function (data) {
          console.log(data)
          fiveDayForecast(data);

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });

  };

// *** gets the forecast for the week and created html elements
  function fiveDayForecast(week){

    let forecast = week.list; 
    let rootDiv = $('#forecast'); //html parent element

   $.each(forecast, function(i, value) {
    if(i % 8 === 0){  // goes through array but skips every 8 to get the each day
      
      let date = dayjs(value.dt_txt).format('MM/DD/YYYY');
      let icon = value.weather[0].icon;

      let dayDiv = $('<div class = "pt-2 bg-gradient-to-r from-sky-500 via-transparent to-sky-500 w-1/3 h-64 m-2 shadow-md shadow-slate-900 shrink"></div> ').hide();
      let divDate = $('<p class = "text-zinc-900 text-left text-xl justify-self-center font-serif font-bold antialiased bg-gradient-to-r from-sky-200 to-transparent mt-2 pl-4" >' + date + '</p>');
      let divImg = $('<img class = "w-12 ml-4  rounded-full " src = "http://openweathermap.org/img/w/' + icon + '.png"></img>');
      let divTemp = $('<p class = "text-zinc-900 text-left text-lg justify-self-center font-serif font-bold antialiased bg-gradient-to-r from-sky-200 to-transparent pl-4 mt-2" >Temp:' + value.main.temp + 'F </p>');
      let divHumidity = $('<p class = "text-zinc-900 text-left text-lg justify-self-center font-serif font-bold antialiased bg-gradient-to-r from-sky-200 to-transparent pl-4" >Humidity:' + value.main.humidity + '% </p>');
      let divWind = $('<p class = "text-zinc-900 text-left text-lg justify-self-center font-serif font-bold antialiased bg-gradient-to-r from-sky-200 to-transparent pl-4" >Wind:' + value.wind.speed + 'MPH </p>');

      rootDiv.append(dayDiv);
      dayDiv.fadeIn('slow'); //causes the divs to appears slowly on the page !* used with .hide();
      dayDiv.append(divDate);
      dayDiv.append(divImg);
      dayDiv.append(divTemp);
      dayDiv.append(divHumidity);
      dayDiv.append(divWind);

    }
   });

  }

function saveSearch(cityInput){

  let cities = JSON.parse(localStorage.getItem('cities')) || []; // check for array, defults to an empty array
  cities.push(cityInput);
  localStorage.setItem("cities", JSON.stringify(cities)); // saves it to local storage 
  renderCities();
}

function renderCities(){

  let cities = JSON.parse(window.localStorage.getItem('cities')) || [];
  let oneCityEach = [...new Set(cities)];
  let historyBtnsDiv = $('#buttonHistory');
  historyBtnsDiv.empty();
  for (let i = 0; i < oneCityEach.length; i += 1) {
    let city = oneCityEach[i]; 
    
    // 
    let cityBtn = $('<button data-city = " ' + city + ' " class = "cityBtn text-sky-100 text-center text-3xl font-serif antialiased bg-gradient-to-r from-sky-900 via-sky-300 to-sky-900 rounded-lg w-9/12 h-14 mb-2.5 shadow-inner shadow-slate-100"></button>'); 
    cityBtn.text(city);
    historyBtnsDiv.append(cityBtn);

   }

}

renderCities();






  /*
 <button class = "text-sky-100 text-center text-3xl font-serif antialiased bg-gradient-to-r from-sky-900 via-sky-300 to-sky-900 rounded-lg w-9/12 h-14 mb-2.5 shadow-inner shadow-slate-100">Sun Valley </button>
      <button class = "text-sky-100 text-center text-3xl font-serif antialiased bg-gradient-to-r from-sky-900 via-sky-300 to-sky-900 rounded-lg w-9/12 h-14 mb-2.5 shadow-inner shadow-slate-100 ">San Francisco </button>
      <button class = "text-sky-100 text-center text-3xl font-serif antialiased bg-gradient-to-r from-sky-900 via-sky-300 to-sky-900 rounded-lg w-9/12 h-14 mb-2.5 shadow-inner shadow-slate-100">Mexico City </button>


    <div class = "bg-gradient-to-r from-sky-500 via-transparent to-sky-500 w-1/3 h-64 m-2 shadow-md shadow-slate-900 shrink">


        <p class = "text-zinc-900 text-left text-2xl justify-self-center font-serif font-bold 
        antialiased bg-gradient-to-r from-sky-200 to-transparent mt-2 pl-4" >Date:</p>


        <img class = "w-12 ml-4  rounded-full "src = "./Assets/images/weather-icon.jpeg">


        <p class = "text-zinc-900 text-left text-lg justify-self-center font-serif font-bold 
        antialiased bg-gradient-to-r from-sky-200 to-transparent pl-4 mt-2" >Temp: 70F</p>


        <p class = "text-zinc-900 text-left text-lg justify-self-center font-serif font-bold 
        antialiased bg-gradient-to-r from-sky-200 to-transparent pl-4" >Wind: 8.42 MPH</p>


        <p class = "text-zinc-900 text-left text-lg justify-self-center font-serif font-bold 
        antialiased bg-gradient-to-r from-sky-200 to-transparent pl-4"  >Humidity: 44%</p>  


      </div>

-----------------------------
// Comments show the vanilla JavaScript equivalent statements

// var rootEl = document.getElementById("root");
var rootEl = $('#root');

// var titleEl = document.createElement("h1");
var titleEl = $('<h1>');

// titleEl.textContent = "Hello friends";
titleEl.text('Hello friends');

// titleEl.className = 'fancy';
titleEl.attr('class', 'fancy');

// titleEl.classList.add('p-5') - (`p-5` is for padding)
titleEl.addClass('p-5');

// titleEl.style.border = "rgb(122, 242, 242) 3px solid";
titleEl.css('border', 'rgb(122, 242, 242) 5px solid');

// rootEl.appendChild(titleEl);
rootEl.append(titleEl);

// titleEl.append("Welcome to jQuery");
rootEl.append('<h2>With jQuery we can:</h2>');

var abilities = [
  'Select',
  'Create',
  'Style',
  'Animate',
  'Traverse',
  'Event Listen',
  'much more',
];

for (var i = 0; i < abilities.length; i++) {
  // Create a new `<div>` for each ability and its text content
  var abilityEl = $('<li>');

  // abilityEl.textContent = abilities[i];
  abilityEl.text(abilities[i]);


-------------------------------------







Endpoint:
- Please, use the endpoint api.openweathermap.org for your API calls
- Example of API call:
api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

Useful links:
- API documentation https://api.openweathermap.org
- Details of your plan https://openweathermap.org/price

5-day forecast 

let FiveWeekCast = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

Current day cast 
let curretnDayCast = https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


 --- elements and classes for search history ---

   

 --- elements and classes for current city temp, wind and humidity ---

 

 --- elements and classes for 5 day forcast section ---

let todayWeather = day;
  let todayDate = dayjs().format('MM/DD/YYYY');



  function saySomething(phrase) {
  console.log(phrase);
}

setTimeout(saySomething, 2000, 'Hello, World!');

*/