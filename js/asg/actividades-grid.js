// const jsonResponse = await fetch('../../data/asg/actividades-data.json');
const jsonResponse = await fetch('https://edcan-dev.github.io/planigrupo-edcan-dev/data/asg/actividades-data.json');
const actividades = await jsonResponse.json();

const createGridItem = (json) => {

    const item = document.createElement('div');
    item.classList.add('actividades__grid__item');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('actividades__grid__item__title');
    const titleContainerP = document.createElement('p');
    titleContainerP.innerHTML = json.name;
    titleContainer.appendChild(titleContainerP);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('actividades__grid__item__img');
    imgContainer.style.backgroundImage = "url('" + json.image_url + "')";

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('actividades__grid__item__description');
    const descriptionContainerP = document.createElement('p');
    descriptionContainerP.innerHTML = json.description;
    descriptionContainer.appendChild(descriptionContainerP);

    const anchorContainer = document.createElement('div');
    anchorContainer.classList.add('actividades__grid__item__a');
    const anchorContainerA = document.createElement('a');
    anchorContainerA.innerHTML = 'VER MÁS';
    anchorContainer.appendChild(anchorContainerA);


    item.appendChild(titleContainer)
    item.appendChild(imgContainer)
    item.appendChild(descriptionContainer)
    item.appendChild(anchorContainer)

    document.querySelector('.actividades__grid').appendChild(item);
}
const createGridItemFromRow = (row) => {

    console.log(row);

    const json = ''

    const item = document.createElement('div');
    item.classList.add('actividades__grid__item');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('actividades__grid__item__title');
    const titleContainerP = document.createElement('p');
    titleContainerP.innerHTML = row[1];
    titleContainer.appendChild(titleContainerP);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('actividades__grid__item__img');
    imgContainer.style.backgroundImage = "url('" + row[8] + "')";

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('actividades__grid__item__description');
    const descriptionContainerP = document.createElement('p');
    descriptionContainerP.innerHTML = row[9];
    descriptionContainer.appendChild(descriptionContainerP);

    const anchorContainer = document.createElement('div');
    anchorContainer.classList.add('actividades__grid__item__a');
    const anchorContainerA = document.createElement('a');
    anchorContainerA.innerHTML = 'VER MÁS';
    anchorContainer.appendChild(anchorContainerA);


    item.appendChild(titleContainer)
    item.appendChild(imgContainer)
    item.appendChild(descriptionContainer)
    item.appendChild(anchorContainer)

    document.querySelector('.actividades__grid').appendChild(item);
}

//const xslxPath = './../../data/asg/asg_actividades.xlsx';

const xslxPath = 'https://edcan-dev.github.io/planigrupo-edcan-dev/data/asg/asg_actividades.xlsx';
const response = await fetch(xslxPath);
const xlsx = await response.blob();

readXlsxFile(xlsx, { sheet: 1 }).then(function(rows) {
    rows.shift();
    rows.forEach(row => createGridItemFromRow(row))
})


//actividades.forEach( json => createGridItem(json));


const je =
{
    "id": 1,
    "name": "Máquinas de Reciclaje-AIEn",
    "image_url": "https://planiesg.herokuapp.com/static/images/eventos_soc/Reciclar-para-ganar-abril-2022-1.png",
    "description": "De enero-abril 2022 se reciclaron más de 300 mil botellas de plástico equivalentes a una reducción de 17,642 kg de CO2",
    "date": "2022-06-17",
    "category": "Ambientales"  
  }