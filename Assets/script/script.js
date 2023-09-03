// create event listener for form 
// fetch request function





// 'DOMContentLoaded' event handler 
$(document).ready(function(){

  $('#userSubmit').on('submit', function(event){
    event.preventDefault();
  console.log(event);
  console.log(this);
  });

});














/*

Endpoint:
- Please, use the endpoint api.openweathermap.org for your API calls
- Example of API call:
api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

Useful links:
- API documentation https://openweathermap.org/api
- Details of your plan https://openweathermap.org/price

5-day forecast 

let FiveWeekCast = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

Current day cast 
let curretnDayCast = https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
*/
/*

 --- elements and classes for search history ---

   

 --- elements and classes for current city temp, wind and humidity ---

 

 --- elements and classes for 5 day forcast section ---

    
       
*/