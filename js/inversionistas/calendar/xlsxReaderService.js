export class Event {
  
  id;
  day;
  month;
  year;
  hour;
  minute;

  type;
  qoute;
  quoteColor;

  name;
  link;
  resource;

  get date() {  
    return new Date(this.year, this.month - 1, this.day, this.hour, this.minute);
  }
  
  getShortMonth() {
    const monthValues = {
      1: 'Enero',
      2: 'Febrero',
      3: 'Marzo',
      4: 'Abril',
      5: 'Mayo',
      6: 'Junio',
      7: 'Julio',
      8: 'Agosto',
      9: 'Septiembre',
      10: 'Octubre',
      11: 'Noviembre',
      12: 'Diciembre'
    }
    return monthValues[this.month];
  }
}

export const monthDictionary = {
  'jan': 1,
  "feb": 2,
  "mar": 3,
  "apr": 4,
  "may": 5,
  "jun": 6,
  "jul": 7,
  "aug": 8,
  "sep": 9,
  "oct": 10,
  "nov": 11,
  "dec": 12
}

let xlsxUrl;
if(window.location.href.includes('github')) {
  xlsxUrl = 'https://edcan-dev.github.io/planigrupo-edcan-dev/data/inversionistas_xlsx/agenda.xlsx'
} else {
  xlsxUrl ='../../../data/inversionistas_xlsx/agenda.xlsx';
}

const response = await fetch(xlsxUrl);
const xlsx = await response.blob();

const _events = [];

await readXlsxFile(xlsx, { sheet: 1 }).then(function(rows) {
  rows.shift();

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    const event = new Event();

    event.id = index + 1;
    event.day = row[0];
    event.month = row[1];
    event.year = row[2]
    event.hour = row[3];
    event.minute = row[4];
    event.type = row[5];
    event.qoute = row[6];
    event.quoteColor = row[7];
    event.name = row[8];
    event.link = row[9];
    event.resource = row[10];

    _events.push(event)
  }

})



export const events = [..._events];