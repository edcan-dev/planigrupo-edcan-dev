var ele = document.getElementById('inversionistas_calendar_container');
if(ele) {
  ele.style.visibility = "visible";
}   

function loadCultureFiles(name) {
  var files = ['ca-gregorian.json', 'numbers.json', 'timeZoneNames.json'];
  var loader = ej.base.loadCldr;
  var loadCulture = function (prop) {
      var val, ajax;

      if(prop != 1) {

        ajax = new ej.base.Ajax('https://raw.githubusercontent.com/unicode-cldr/cldr-dates-full/master/main/' + name + '/' + files[prop], 'GET', false);
        ajax.onSuccess = function (value) {
            val = value;
        };
        ajax.send();
        loader(JSON.parse(val));

      } else {

        ajax = new ej.base.Ajax('https://raw.githubusercontent.com/unicode-cldr/cldr-numbers-full/master/main/' + name + '/' + files[prop], 'GET', false);
        ajax.onSuccess = function (value) {
            val = value;
        };
        ajax.send();
        loader(JSON.parse(val));
      }
  };
  for (var prop = 0; prop < files.length; prop++) {
      loadCulture(prop);
  }
}

var month = new Date().getMonth();
var fullYear = new Date().getFullYear();
const startDate = new Date(2000,1,1);
const maxDate = getMaxDate(month);

ej.base.enableRipple(true);

var L10n = ej.base.L10n;
   L10n.load({
    'es-MX': {
        'calendar': { today:'hoy'}
    }
  });

loadCultureFiles('es-MX');



// Fecha de Eventos


class CalendarEvent {
  day;
  month;
  year;
  hour;
  minute;
  type;
  label;
  color;
  name;
  link;
  file;
  dateString;
}

const eventsObject =
{
  1: {
    day: 15,
    month: 10,
    year: 2023,
    hour: 11,
    minute: 45,
    type: 'C',
    label: 'Conferencia',
    color: '#F00',
    name: 'Para acceso a la Teleconferencia de resultados del 1T223',
    link: 'https://teams.microsoft.com/l/meetup-join/19%3ae19d3d2dc1304a2a9f14974b570bddb3%40thread.tacv2/1700754260581?context=%7b%22Tid%22%3a%22a2325cb3-4c18-47bb-a4e9-92a15f138ce6%22%2c%22Oid%22%3a%22a2936ce5-9358-4220-a814-5f0695863ae2%22%7d',
    file: 'RT_XBRL_2017_04.pdf'  
  },
  2: {
    day: 25,
    month: 11,
    year: 2023,
    hour: 3,
    minute: 0,
    type: 'PI',
    label: 'Presentacion',
    color: 'naranja',
    name: 'Presentación de resultados trimestrales con informes detallados',
    link: null,
    file: 'RT_XBRL_2017_04.pdf'  
  },
  3: {
    day: 20,
    month: 12,
    year: 2023,
    hour: 11,
    minute: 30,
    type: 'CP',
    label: 'Comunicado de prensa',
    color: 'azul',
    name: 'Comunicado de Adquisición de empresa Planigrupo',
    link: null,
    file: 'comunicadoPrensaGM.jpg'  
  }
};



const inversionistasEventDates = Object.entries(eventsObject)
  .map(event => {
    const date = new Date(
      event[1].year,
      event[1].month - 1,
      event[1].day,
    )

    eventsObject[event[0]].dateString = date.toDateString()
    return date;
  })


function getMaxDate(currentMonth) {
  let maxDateMonth = currentMonth >= 11 ? 0 : currentMonth + 1    
  let maxDateYear = currentMonth >= 11 ? new Date().getFullYear() + 1 : new Date().getFullYear();
  return new Date(maxDateYear,maxDateMonth, 1);
}


var calendar = new ej.calendars.Calendar(
  {
    min: startDate,
    max: maxDate,
    isMultiSelection: true,
    values: inversionistasEventDates,
    locale: 'es-MX'
  }
);



//PostConstruct
calendar.appendTo("#inversionistas_calendar_container > #element");
document.querySelector(".e-footer-container").style.display = "none";



try {

  const eventInfoComponent = document.querySelector(".event-info-component");

  calendar.addEventListener("change", (ev) => {

    const valueDateStrings = ev.values.map(value => value.toDateString());

    const dateObject = Object.entries(eventsObject).find( eventObject => {
      if(! valueDateStrings.includes(eventObject[1].dateString)) {
        return true;
      }
      return false;
    });

    
    calendar.values = inversionistasEventDates    
    
    eventInfoComponent.classList.toggle("event-info-component--hidden");
    
    document.querySelector(".table_container").scrollTop =
    document.querySelector(".table_container").scrollHeight;
    
    renderEventInfo(eventsObject[dateObject[0]]);

  });

  document
    .querySelector(".event-info-top-scroller > button")
    .addEventListener("click", (ev) => {
      eventInfoComponent.classList.toggle("event-info-component--hidden");
      document.querySelector(".table_container").scrollTop = 0;
    });

  
} catch (e) {}

/**
 * @param { CalendarEvent } dateObject 
 */
function renderEventInfo(dateObject) {
  
  console.log(dateObject);

  const spanTitle = document.querySelector('.event-info-component-title > span');
  const aLink = document.querySelector('.event-info-component-link > a');
  const file = document.querySelector('.event-info-component-file > a');
  const description = document.querySelector('.event-info-component-description > p');

  spanTitle.innerHTML = '';
  spanTitle.innerHTML = dateObject.name;
  description.innerHTML = '';
  description.innerHTML = `${dateObject.day}/${dateObject.month}/${dateObject.year}`

  if(dateObject.link == null) {
    aLink.parentElement.style.display = 'none';
  } else {

    aLink.href = '' 
    aLink.innerHTML = '';
    aLink.href = dateObject.link 
    aLink.innerHTML = dateObject.link;
  }
  if(dateObject.file == null) {
    file.parentElement.style.display = 'none';
  } else {

    file.href = '' 
    file.innerHTML = '';
    file.href = dateObject.file 
    file.innerHTML = dateObject.file;
  }

}