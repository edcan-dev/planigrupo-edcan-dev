/* import { activitiesReaderService } from "../../services/XSLXActivitiesReaderService.js";
import { activitiesASGModal } from "../../services/ActivitiesASGModal.js";

const activities = activitiesReaderService.getActivitiesByCategory("Ambiental");



let sliderActivitiesArray; 

const tempActivities = [...activities];
const subarrays = [];

tempActivities.forEach((activity) => {

    const obj = tempActivities.shift();
    const obj2 = tempActivities.shift();

    const arr = [obj, obj2];
    subarrays.push(arr);
});



let currentActivitiesIndex = 0;

document.querySelectorAll('.thirdSection__carousel__selector')
    .forEach(selector => {
        selector.addEventListener('click',(ev) => {

            if(ev.target.id == 'prev') {

                currentActivitiesIndex--;


            } else {

                currentActivitiesIndex++;

            }

            currentActivitiesIndex = currentActivitiesIndex < 0 ? subarrays.length - (currentActivitiesIndex * -1 ) : currentActivitiesIndex;

            currentActivitiesIndex = currentActivitiesIndex > subarrays.length - 1 ? 0 : currentActivitiesIndex;

            renderAmbientalActivitiesContent(subarrays[currentActivitiesIndex]);

        })
    });


renderAmbientalActivitiesContent(subarrays[currentActivitiesIndex]);






function renderAmbientalActivitiesContent(arr) {

    document.querySelector('.thirdSection__carousel__container__content').innerHTML =
    `
    <div class="thirdSection__carousel__container__content__item">
        <div class="thirdSection__carousel__container__content__item__title">
            <p>${arr[0].title}</p>
        </div>
        <div class="thirdSection__carousel__container__content__item__image"
        style="background-image: url('${ arr[0].imageUrl }');"
        ></div>
    
        <div class="thirdSection__carousel__container__content__item__description">
        ${ arr[0].description == undefined ? 'Descripcion de la actividad' : arr[0].description }
        </div>

    </div>
    <div class="thirdSection__carousel__container__content__item">
        <div class="thirdSection__carousel__container__content__item__title">
            <p>${arr[1].title}</p>
        </div>
        <div class="thirdSection__carousel__container__content__item__image"
        style="background-image: url('${ arr[1].imageUrl }');"
        ></div>

        <div class="thirdSection__carousel__container__content__item__description">
        ${ arr[1].description == undefined ? 'Descripcion de la actividad' : arr[1].description }
        </div>

    </div>
    `;
}



// Example usage


document.querySelectorAll('.actividades__grid__item__a')
  .forEach(activityAnchor => {
    activityAnchor.addEventListener('click',(ev) => {
      const activityId = ev.target.parentElement.nextElementSibling.innerHTML;
      const activity = activitiesReaderService.getActivityById(activityId);

      const dialogContent = getDialogContent(activity);

      activitiesASGModal.renderASGActivityModal(dialogContent);


  })
})


function getDialogGridItem({ title, description, id}) { 
  return `
  <div class="actividades__grid__item">
      <div class="actividades__grid__item__title">
          <p>${ title }</p>
      </div>
      <div class="actividades__grid__item__img"
          style="background-image: url('https://reporteasg.com/download/multimedia.normal.b22b61ac01c80f3b.YmFuY2EgdmVyZGVfbm9ybWFsLndlYnA%3D.webp');
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

function getDialogContent({ title, dateString, category, description}) {
  return `
  <section class="detail__dialog">
    <div class="detail__dialog__img">
      <img src="https://reporteasg.com/download/multimedia.normal.b22b61ac01c80f3b.YmFuY2EgdmVyZGVfbm9ybWFsLndlYnA%3D.webp">
    </div>
    
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
} */

import { activitiesReaderService } from "../../services/XSLXActivitiesReaderService.js";
import { activitiesASGModal } from "../../services/ActivitiesASGModal.js";

const ASG_ACTIVITIES_DIRECTORY_URL = 'https://planigrupo.blob.core.windows.net/planigrupo/assets/images/asg/imagenes-asg/';

let activities = activitiesReaderService.getActivitiesByCategory("Ambiental");

activities.forEach((activity) => {
  const activityGridItem = getDialogGridItem(activity);
  document.querySelector(".forthSection__grid").innerHTML += activityGridItem;

});

document.querySelectorAll('.actividades__grid__item__a')
  .forEach(activityAnchor => {
    activityAnchor.addEventListener('click',(ev) => {
      const activityId = ev.target.parentElement.nextElementSibling.innerHTML;
      const activity = activitiesReaderService.getActivityById(activityId);

      const dialogContent = getDialogContent(activity);

      activitiesASGModal.renderASGActivityModal(dialogContent);




  })
})

export function renderGrid(category) {

  console.log(activities);

   activities = activities.filter(activity => {
    console.log(activity.category);
    return activity.category == category
  })

  console.log(activities);


  document.querySelector(".forthSection__grid").innerHTML = undefined

  activities.forEach((activity) => {
    const activityGridItem = getDialogGridItem(activity);
    document.querySelector(".forthSection__grid").innerHTML += activityGridItem;
  });

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

function getDialogContent({ title, dateString, category, description, imageUrl, specification, quantity}) {

  return `
  <section class="detail__dialog">

    ${
      getImageContent(title, specification, quantity, imageUrl)
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


function getImageContent(title, specification, quantity, imageUrl) {
  let content = '';

  if(specification == 'Imágenes') {

    let carouselItems = '';

    for (let index = 1; index <= quantity; index++) {

      let urlTitle = title.replaceAll(' ', '%20');
      urlTitle = urlTitle.concat('%20');
      const imageURL = ASG_ACTIVITIES_DIRECTORY_URL + urlTitle + `(${ index }).png`;
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