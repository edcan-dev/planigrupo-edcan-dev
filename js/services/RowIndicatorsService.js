const xslxPath = window.location.href.startsWith("http:")
  ? "../../data/indicadores_relevantes.xlsx"
  : "https://edcan-dev.github.io/planigrupo-edcan-devdata/indicadores_relevantes.xlsx";

let xlsx;
await fetch(xslxPath)
  .then((response) => {
    return response.blob();
  })
  .then((blob) => {
    xlsx = blob;
  });

class Indicator {
  value;
  description;
}

await readXlsxFile(xlsx, { sheet: 1 }).then(async function (rows) {
  rows.shift();

  const indicators = [];
  for (let index = 0; index < rows.length; index++) {
    const element = rows[index];
    const indicator = new Indicator();
    indicator.value = element[0]
    indicator.description = element[1]
    indicators.push(indicator)
  }

  const list = document.querySelectorAll('.main__row__item');

  list.forEach((item, index) => {

    item.firstElementChild.innerHTML = indicators[index].value;

    if(index == 3 ) {
      item.firstElementChild.innerHTML = (indicators[index].value * 100) + '%';
    }

    if(index == 0 ) {
      
      const indicator0 = indicators[index].value.toString().split('');

      indicator0.splice(3,0,',')
      const indicatorValue = indicator0.join('') 

      item.firstElementChild.innerHTML =  
      indicatorValue + ' <small style="font-size: 16px;">m2</small>'


    }

    item.lastElementChild.innerHTML = indicators[index].description;


  })
});
