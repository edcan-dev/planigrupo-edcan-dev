import { events, Event, monthDictionary } from "./xlsxReaderService.js";

var scheduleData = [
  {
    Id: 1,
    Subject: "Explosion of Betelgeuse Star",
    StartTime: new Date(),
    EndTime: new Date(2024, 2, 1)
    } 
  //   {
  //     Id: 2,
  //     Subject: 'Thule Air Crash Report',
  //     StartTime: new Date(2018, 1, 12, 12, 0),
  //     EndTime: new Date(2018, 1, 12, 14, 0)
  //   }, {
  //     Id: 3,
  //     Subject: 'Blue Moon Eclipse',
  //     StartTime: new Date(2018, 1, 13, 9, 30),
  //     EndTime: new Date(2018, 1, 13, 11, 0)
  //   }, {
  //     Id: 4,
  //     Subject: 'Meteor Showers in 2018',
  //     StartTime: new Date(2018, 1, 14, 13, 0),
  //     EndTime: new Date(2018, 1, 14, 14, 30)
    
  // },
];

// var buttonObj = new ej.buttons.Button();
// buttonObj.appendTo('#ics-export');
// buttonObj.element.onclick = function () {
// };


var ele = document.getElementById("container");
      if (ele) {
        ele.style.visibility = "visible";
      }
      
      var scheduleObj = new ej.schedule.Schedule({
        width: "100%",
        height: "520px",
        views: ["Day", "Week", "WorkWeek", "Month", "Agenda"],
        // //selectedDate: new Date(2018, 1, 15),
        // selectedDate: new Date(),
        eventSettings: { dataSource: scheduleData}
      });
      scheduleObj.appendTo("#Schedule");

document
  .querySelectorAll("calendar-event-item-icons > span")
  .forEach((button) => {

    button.addEventListener("click", async (ev) => {
      console.log(ev.target);

      
      scheduleObj.exportToICalendar();

    });
  });



// Set current Date

const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');


monthSelect.addEventListener('change',(ev) => {
  renderEventElementsByYearAndMonth(yearSelect.value, monthSelect.value);
})
yearSelect.addEventListener('change',(ev) => {
  renderEventElementsByYearAndMonth(yearSelect.value, monthSelect.value);
})


function renderEventElementsByYearAndMonth(year, month) {
  console.log(year);
  console.log(month);

  const monthIndex = monthDictionary[month]

  console.log(events);

  const filteredEvent = events.filter(event => {
    return event.year == year && event.month == monthIndex
  });
  console.log(filteredEvent);
}


monthSelect.value = Object.keys(monthDictionary)[new Date().getMonth()]
yearSelect.value = new Date().getFullYear();
renderEventElementsByYearAndMonth(yearSelect.value, monthSelect.value);