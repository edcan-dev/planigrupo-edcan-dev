import { activitiesReaderService } from "../../services/XSLXActivitiesReaderService.js";
import { activitiesASGModal } from "../../services/ActivitiesASGModal.js";

const activities = activitiesReaderService.getActivitiesByCategory("Ambiental");

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

function getDialogContent({ title, dateString, category, description, imageUrl}) {
  return `
  <section class="detail__dialog">
    <div class="detail__dialog__img">
      <img src="${ imageUrl }">
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
}