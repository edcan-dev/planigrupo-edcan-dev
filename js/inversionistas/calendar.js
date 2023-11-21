// initialize Calendar component
var calendar = new ej.calendars.Calendar();

// Render initialized button.
calendar.appendTo("#element");



ej.base.enableRipple(true);

   var month = new Date().getMonth();
   var currentYear = new Date().getFullYear();

   fullYear = 2010;

   console.log(month);
   console.log(fullYear);
   
   var calendar = new ej.calendars.Calendar({
           // Sets the min.
    //Sets the max.
    max: new Date(currentYear, month, 15),
    // Sets the value.
    value: new Date(currentYear, month , 11)
    });
    calendar.appendTo('#element');
