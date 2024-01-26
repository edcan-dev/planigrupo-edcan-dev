import { events, Event, monthDictionary } from "./xlsxReaderService.js";

const language = document.head.querySelector("[property~=language][content]").content;
// var scheduleData = [
//   {
//     Id: 1,
//     Subject: "Explosion of Betelgeuse Star",
//     StartTime: new Date(),
//     EndTime: new Date(2024, 2, 1)
//     } 
//   //   {
//   //     Id: 2,
//   //     Subject: 'Thule Air Crash Report',
//   //     StartTime: new Date(2018, 1, 12, 12, 0),
//   //     EndTime: new Date(2018, 1, 12, 14, 0)
//   //   }, {
//   //     Id: 3,
//   //     Subject: 'Blue Moon Eclipse',
//   //     StartTime: new Date(2018, 1, 13, 9, 30),
//   //     EndTime: new Date(2018, 1, 13, 11, 0)
//   //   }, {
//   //     Id: 4,
//   //     Subject: 'Meteor Showers in 2018',
//   //     StartTime: new Date(2018, 1, 14, 13, 0),
//   //     EndTime: new Date(2018, 1, 14, 14, 30)
    
//   // },
// ];

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
        //eventSettings: { dataSource: scheduleData}
      });
      scheduleObj.appendTo("#Schedule");

// document
//   .querySelectorAll("calendar-event-item-icons > span")
//   .forEach((button) => {

//     button.addEventListener("click", async (ev) => {
//       console.log(ev.target);

      
//       scheduleObj.exportToICalendar();

//     });
//   });



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
  //console.log(year);
  //console.log(month);

  const monthIndex = monthDictionary[month]

  // console.log(events);

  const filteredEvent = events.filter(event => {
    return event.year == year && event.month == monthIndex
  });


  document.querySelector('calendar-events').innerHTML = '';
  document.querySelector('calendar-event-detail').innerHTML = '';

  if(filteredEvent.length == 0) {

    const activitiesTitle = language == 'english'
    ? 'NO ACTIVITIES FOUND FOR THIS MONTH'
    : 'NO HAY ACTIVIDADES EN ESTE MES';

    document.querySelector('calendar-title > span').innerHTML = activitiesTitle;
  }

  filteredEvent.forEach(appendEventItem);

}

monthSelect.value = Object.keys(monthDictionary)[new Date().getMonth()]
yearSelect.value = new Date().getFullYear();
renderEventElementsByYearAndMonth(yearSelect.value, monthSelect.value);


/**
 * 
 * @param { Event } event 
 */
function appendEventItem(event) {
  
  const { name, day, qoute } = event;
  const container = document.querySelector('calendar-events');

  const activitiesTitle = language == 'english'
  ? 'ACTIVITIES'
  : 'ACTIVIDADES';

  document.querySelector('calendar-title > span').innerHTML = activitiesTitle;
  
  container.innerHTML += `
  <calendar-event-item>
    <calendar-event-item-date>
      <span>${ day }</span>
      <small>${ event.getShortMonth().substring(0, 3).toUpperCase() }</small>
    </calendar-event-item-date>
    
    <calendar-event-item-title>
      <span>${ name }</span>
      <small>${ qoute }</small>
    </calendar-event-item-title>
    
    <calendar-event-item-icons>
      <span>
        <i class="fa-regular fa-newspaper " style="color: #545859;"></i>
      </span>
      <span>
        <!--
        <i class="fa-regular fa-calendar " style="color: #545859;"></i>
        -->
      </span>
    </calendar-event-item-icons>
    <calendar-event-item-id class="inactive">${ event.id }</calendar-event-item-id>
  </calendar-event-item>
  `;

  document.querySelectorAll("calendar-event-item-icons > span")
    .forEach((button) => {
        button.addEventListener("click", async (ev) => {

          const eventId = ev.target.parentElement.parentElement.parentElement.lastElementChild.innerHTML;

          const selectedEvent = events.find(event => event.id == eventId);

          document.querySelector('calendar-event-detail').innerHTML = '';
          renderEventDetail(selectedEvent);
        
        });
  });

}
/**
 * 
 * @param { Event } event 
 */
function renderEventDetail(event) {

  // TODO: Cambiar esta parte por el prefix
  const resourceURL = 'https://planigrupo.blob.core.windows.net/planigrupo/data/inversionistas_agenda/Planigrupo-1T23-ES.pdf';

  const { name, day, year, resource, link } = event;

  document.querySelector('calendar-event-detail').innerHTML = `
  <calendar-event-detail-title>
    <h3>${ name }</h3>
    <span>${ day } ${ event.getShortMonth().toUpperCase() }, ${ year }</span>
  </calendar-event-detail-title>
  
  <calendar-event-detail-content>
    ${
      resource == null
      ? ''
      : `
      <calendar-event-detail-content-resource>
        <p>Recurso:</p>
        <a href="${ resourceURL }" target="_BLANK">${ resource }</a>
      </calendar-event-detail-content-resource>` 
    }
    ${
      link == null
      ? ''
      : `
      <calendar-event-detail-content-link>
        <p>Enlace:</p>
        <a href="${ link }" target="_BLANK">${ link }</a>
      </calendar-event-detail-content-link>`
    }
  </calendar-event-detail-content>
  `;
  
}