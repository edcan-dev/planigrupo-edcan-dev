// initialize Calendar component
var calendar = new ej.calendars.Calendar();

// Render initialized button.
calendar.appendTo("#element");

function getMaxDate(currentMonth) {
   let maxDateMonth = currentMonth >= 11 ? 0 : currentMonth + 1    
   let maxDateYear = currentMonth >= 11 ? new Date().getFullYear() + 1 : new Date().getFullYear();
   return new Date(maxDateYear,maxDateMonth, 1);
}

var month = new Date().getMonth();
var fullYear = new Date().getFullYear();
const startDate = new Date(2000,1,1);
const maxDate = getMaxDate(month);



ej.base.enableRipple(true);

   var month = new Date().getMonth();
   var currentYear = new Date().getFullYear();

   fullYear = 2010;

//   console.log(month);
//   console.log(fullYear);
   
   var calendar = new ej.calendars.Calendar({
           // Sets the min.
    //Sets the max.    min: startDate,
    min: startDate,
    max: maxDate,
    // Sets the value.
    value: new Date(currentYear, month , 11),
    value: new Date(currentYear, month , 12),
    value: new Date(currentYear, month , 13),

});
calendar.appendTo('#element');
