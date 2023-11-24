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

actividades.forEach( json => createGridItem(json));