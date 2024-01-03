import { renderDetailDialog } from "./asg-detail-dialog.js";

const renderGridItemFromRow = (row) => {
  const item = document.createElement("div");
  item.classList.add("actividades__grid__item");

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("actividades__grid__item__title");
  const titleContainerP = document.createElement("p");
  titleContainerP.innerHTML = row[1];
  titleContainer.appendChild(titleContainerP);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("actividades__grid__item__img");
  imgContainer.style.backgroundImage = "url('" + row[8] + "')";

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("actividades__grid__item__description");
  const descriptionContainerP = document.createElement("p");
  descriptionContainerP.innerHTML = row[9];
  descriptionContainer.appendChild(descriptionContainerP);

  const anchorContainer = document.createElement("div");
  anchorContainer.classList.add("actividades__grid__item__a");
  const anchorContainerA = document.createElement("a");
  anchorContainerA.innerHTML = "VER MÁS";
  anchorContainer.appendChild(anchorContainerA);

  item.appendChild(titleContainer);
  item.appendChild(imgContainer);
  item.appendChild(descriptionContainer);
  item.appendChild(anchorContainer);

  document.querySelector(".actividades__grid").appendChild(item);
};

const renderGridItemsFromRows = (rows) => {
  rows.forEach((row) => {
    const item = document.createElement("div");
    item.classList.add("actividades__grid__item");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("actividades__grid__item__title");
    const titleContainerP = document.createElement("p");
    titleContainerP.innerHTML = row[1];
    titleContainer.appendChild(titleContainerP);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("actividades__grid__item__img");
    imgContainer.style.backgroundImage = "url('" + row[8] + "')";

    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("actividades__grid__item__description");
    const descriptionContainerP = document.createElement("p");
    descriptionContainerP.innerHTML = row[9].substring(0,20);
    descriptionContainer.appendChild(descriptionContainerP);

    const anchorContainer = document.createElement("div");
    anchorContainer.classList.add("actividades__grid__item__a");
    const anchorContainerA = document.createElement("a");
    anchorContainerA.innerHTML = "VER MÁS";
    anchorContainer.appendChild(anchorContainerA);

    
    const idSmallContainer = document.createElement('small');
    idSmallContainer.classList.add('inactive');
    idSmallContainer.innerHTML = rows.indexOf(row) + 1;
    
    const detailData = {
      title: row[1],
      date: `${row[5]}-${row[4]}-${row[3]}`,
      category : row[0],
      description: row[9],
      imgUrl: row[8]
    }

    anchorContainer.addEventListener('click',() => {
      renderDetailDialog(detailData)
    })
    

    item.appendChild(titleContainer);
    item.appendChild(imgContainer);
    item.appendChild(descriptionContainer);
    item.appendChild(anchorContainer);
    item.appendChild(idSmallContainer);
    document.querySelector(".actividades__grid").appendChild(item);

  });

  // Render Pagination

  
  document.querySelector('.actividades__grid__tab__selectors > ul').innerHTML = '';

  const pageElements = 6;

  const gridElements = document.querySelectorAll('.actividades__grid__item');

  if(gridElements.length >= pageElements) {

    document.querySelector('.actividades__grid').classList.remove('grid__tab__content')

    const pageGridItems = [];
    for (let i = 0; i < gridElements.length; i += pageElements) {
        const subarray = Array.from(gridElements).slice(i, i + pageElements);
        pageGridItems.push(subarray);
    }


    
    const gridContainer = document.querySelector('.actividades__grid');
    gridContainer.innerHTML = '';

    pageGridItems.forEach((pageGridItem, index) => {
      const liSelector = document.createElement('li');
      liSelector.classList.add('grid__tab__selector');
      liSelector.id = `grid__tab__selector--${ index + 1 }`;
      liSelector.innerHTML = index + 1;
      if(index == 0) {
        liSelector.classList.add('selected');
      }

      document.querySelector('.actividades__grid__tab__selectors > ul').appendChild(liSelector);

      const divContent =  document.createElement('div');

      divContent.classList.add('grid__tab__content');
      if(index != 0) {
        divContent.classList.add('inactive');
      }
      divContent.id = `grid__tab__content--${ index + 1 }`;

      let tabContent = '';

      pageGridItem.forEach(item => {
        tabContent += item.outerHTML
      })

      divContent.innerHTML = tabContent
      gridContainer.appendChild(divContent);




    })


  } else {
    document.querySelector('.actividades__grid').classList.add('grid__tab__content')
  }
  new GenericTabsComponent('.grid__tab__selector','.grid__tab__content').initialize();

};

const clearGrid = () => {
  document.querySelector(".actividades__grid").innerHTML = "";
};

const xslxPath ="https://edcan-dev.github.io/planigrupo-edcan-dev/data/asg/asg_actividades.xlsx";
//const xslxPath ="../../data/asg/asg_actividades.xlsx";
const response = await fetch(xslxPath);
const xlsx = await response.blob();

export let actividades = [];
let filteredActividades = [];

await readXlsxFile(xlsx, { sheet: 1 }).then(function (rows) {
  actividades = rows;
});

actividades.shift();
renderGridItemsFromRows(actividades);
//actividades.forEach((actividad) => renderGridItemFromRow(actividad));

document.querySelector("#category_select").addEventListener("change", (ev) => {
  const categoryValue = ev.target.value;
  const yearValue = document.querySelector("#year_select").value;

  if (yearValue == "all") {
    if (categoryValue === "all") {
      filteredActividades = actividades;
    } else {
      filteredActividades = actividades.filter(
        (actividad) => actividad[0] === categoryValue
      );
    }
  } else {
    if (categoryValue === "all") {
      filteredActividades = actividades.filter((actividad) => {
        return actividad[5] == yearValue;
      });
    } else {
      filteredActividades = actividades.filter((actividad) => {
        return actividad[0] === categoryValue && actividad[5] == yearValue;
      });
    }
  }

  clearGrid();
  renderGridItemsFromRows(filteredActividades);
});

document.querySelector("#year_select").addEventListener("change", (ev) => {
  const yearValue = ev.target.value;
  const categoryValue = document.querySelector("#category_select").value;

  if(categoryValue == 'all') {
    filteredActividades = actividades.filter(
        actividad => actividad[5] == yearValue
    );

  } else {

    filteredActividades = actividades.filter(
        actividad => 
            actividad[5] == yearValue &&
            actividad[0] == categoryValue
    );
  }

  clearGrid();
  renderGridItemsFromRows(filteredActividades);
});
