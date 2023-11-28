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
  });
};

const clearGrid = () => {
  document.querySelector(".actividades__grid").innerHTML = "";
};

const xslxPath =
  "https://edcan-dev.github.io/planigrupo-edcan-dev/data/asg/asg_actividades.xlsx";
const response = await fetch(xslxPath);
const xlsx = await response.blob();

let actividades = [];
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
