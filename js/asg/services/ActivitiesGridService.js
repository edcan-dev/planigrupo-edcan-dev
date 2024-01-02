import { activitiesReaderService } from "./XSLXActivitiesReaderService.js";
import { activitiesASGModal } from "./ActivitiesASGModal.js";

const ASG_ACTIVITIES_DIRECTORY_URL = 'https://planigrupo.blob.core.windows.net/planigrupo/assets/images/asg/imagenes-asg/';


export let activities = activitiesReaderService.getActivities();


// activities.forEach((activity) => {
//   const activityGridItem = getDialogGridItem(activity);
//   document.querySelector(".forthSection__grid").innerHTML += activityGridItem;

// });

export function addDialogEventListener() {
   
  document.querySelectorAll('.actividades__grid__item__a')
  .forEach(activityAnchor => {
    activityAnchor.addEventListener('click',(ev) => {
      const activityId = ev.target.parentElement.nextElementSibling.innerHTML;
      const activity = activitiesReaderService.getActivityById(activityId);
      
      const dialogContent = getDialogContent(activity);
      
      activitiesASGModal.renderASGActivityModal(dialogContent);
    })
  })
}

renderPagination(6, [...activities]);


export function renderGridByCategory(category) {

    activities = activitiesReaderService.getActivities();
    
    console.log(activities);
    
    if(category != 'all') {

        activities = activities.filter(activity => {
            console.log(activity.category);
            return activity.category == category
        })
    }
        
    document.querySelector(".forthSection__grid").innerHTML = ''


    renderPagination(6, [...activities]); 

}

export function renderGridByYear(year) {

    activities = activitiesReaderService.getActivities();
        
    if(year != 'all') {

        activities = activities.filter(activity => {
            console.log(activity.year);
            return activity.year == year
        })
    }
        
    document.querySelector(".forthSection__grid").innerHTML = ''

    renderPagination(6, [...activities])
    // activities.forEach((activity) => {
    //     const activityGridItem = getDialogGridItem(activity);
    //     document.querySelector(".forthSection__grid").innerHTML += activityGridItem;
    // });

    // document.querySelectorAll('.actividades__grid__item__a')
    //     .forEach(activityAnchor => {
    //         activityAnchor.addEventListener('click',(ev) => {
    //     const activityId = ev.target.parentElement.nextElementSibling.innerHTML;
    //     const activity = activitiesReaderService.getActivityById(activityId);

    //     const dialogContent = getDialogContent(activity);
    //         activitiesASGModal.renderASGActivityModal(dialogContent);
    // })
    // })

}


function getDialogGridItem({ title, description, id, imageUrl }) { 
  return `
  <div class="actividades__grid__item">
      <div class="actividades__grid__item__title">
          <p>${ title }</p>
      </div>
      <div class="actividades__grid__item__img"
          style="background-image: url('${ imageUrl }');
      "></div>
      <div class="actividades__grid__item__description">
          <p>
          ${ description == undefined ? "" : description }
          </p>
      </div>
      <div class="actividades__grid__item__a">
          <a>VER MÁS</a>
      </div>
      <small class="inactive">${ id }</small>
  </div>
  `;
}

function getDialogContent({ title, dateString, category, description, imageUrl, specification, quantity, id}) {

  return `
  <section class="detail__dialog">

    ${
      getImageContent(title, specification, quantity, imageUrl, id)
    }
    
    <div class="detail__dialog__title">
      <h5>${ title }</h5>
    </div>

    <div class="detail__dialog__date__category">

      <div>
        <i class="fa-regular fa-calendar-days" style="color: #000000;" aria-hidden="true"></i>
        <span>${ dateString }</span>
      </div>

      <div>
        <i class="fa-solid fa-folder" style="color: #000000;" aria-hidden="true"></i>
        <span>${ category }</span>
      </div>

    </div>
        
    <div class="detail__dialog__desc">
      <p>${ description == undefined ? '' : description }</p>
    </div>

    <div class="detail__dialog__close">
      <button>Cerrar</button>
    </div>
  </section>
  `;
}


function getImageContent(title, specification, quantity, imageUrl, id) {

  console.log(id);
  renderPagination
  let content = '';

  if(specification == 'Imágenes') {

    let carouselItems = '';

    for (let index = 1; index <= quantity; index++) {


      let urlTitle = `act${ id }-img${ index }`;      
      const imageURL = ASG_ACTIVITIES_DIRECTORY_URL + urlTitle + `.png`;
      const jpg = imageURL.replace('.png','.jpg');
      carouselItems +=
      `
      <div class="carousel-cell">
          <img src="${ imageURL }" onerror="this.src='${ jpg }';">
      </div>
      `

    }

    content =
    `
    <div class="main-carousel" style="margin-bottom: 20px">
      ${ carouselItems }
    </div>
    `;

  } else {
    content =
    `
    <div class="detail__dialog__img">
      <img src="${ imageUrl }">
      <a href="${ quantity }" target="_BLANK">Enlance al video</a>
    </div>
    `;
  }

  return content;

}


/**
 * 
 * @param { number } itemsPerPage
 * @param { Array } activities 
 */
export function renderPagination(itemsPerPage, activities) {

  const pagesNumber = Math.floor(activities.length / itemsPerPage)

  for (let index = 1; index <= pagesNumber; index++) {

    const gridPage = document.createElement('div');
    gridPage.classList.add('grid_page');
    gridPage.id = 'grid_page--' + index;

    const pageItems = activities
      .splice(0, itemsPerPage)
      .map(activity => getDialogGridItem(activity))
      .join('');

//     console.log(pageItems);

    gridPage.innerHTML = pageItems;
    document.querySelector('.forthSection__grid').appendChild(gridPage);

  }
  document.querySelectorAll('.grid_page')
    .forEach(item => item.classList.add('inactive'))
  
  document.querySelector('#grid_page--1').classList.remove('inactive')

  addDialogEventListener()


  // const pages = Math.floor((activities.length / itemsPerPage))

  // const grid = document.querySelector('.forthSection__grid');
  // grid.innerHTML = ''


  // for (let index = 1; index < pages; index++) {

  //   const gridPage = document.createElement('div');
  //   gridPage.classList.add('grid_page');
  //   gridPage.id = 'grid_page--' + index;

  //   gridPage.style.display = 'grid';
  //   gridPage.style.gridTemplateColumns = 'repeat(3, 1fr)'
  //   gridPage.style.rowGap = '20px';
            



  //   var removed = [...activities].splice(0, 6).map(item => getDialogGridItem(item));

  //   gridPage.innerHTML = removed.join('')

  //   grid.appendChild(gridPage);
  // }

  // document.querySelectorAll('.grid_page').forEach((page, list, index) => {
  //   page.classList.add('inactive')
  // })

  // document.querySelector('#grid_page--1').classList.remove('inactive')


}