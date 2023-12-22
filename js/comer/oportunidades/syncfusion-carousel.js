import  * as propertyDetailDialogService  from "../../services/PropertDetailDialogService.js";
import  { getPropertyDetailById }  from "../../portafolio/xlsx-reader.js";
const response = await fetch('https://edcan-dev.github.io/planigrupo-edcan-dev/data/oportunidades.carousel.properties.json')
//const response = await fetch('../data/oportunidades.carousel.properties.json')
const jsonDatasource = await response.json();

const PropertyCard = (
  propertyId,
  propertyTitle,
  propertyLocation,
  propertyStartDate,
  propertyDescription,
  propertyContactName,
  propertyContactEmail,
  propertyImageUrl,
  propertyArea,
  propertyFeaturedTenants
) => {

  const container = document.createElement('div');

  container.classList.add('oportunidades__carousel__div');
  container.id = propertyId
  
  const item = document.createElement('div');
  item.classList.add('oportunidades__carousel__item');
  item.style.backgroundImage = "url(" + propertyImageUrl + ")";

  if(propertyTitle == 'PLAZA PALMIRA') item.style.backgroundPositionY = '';

  let tenantDivs = ''

  propertyFeaturedTenants.forEach(tenant => {
    const tenantDiv = document.createElement('div');
    tenantDiv.style.backgroundImage = "url(" + tenant.tenantImageUrl + ")";
    tenantDivs += tenantDiv.outerHTML;
  });


  const cardContent = `
    <div class="oportunidades__carousel__item__text">
      <div class="oportunidades__carousel__item__text__title">
        <div class="oportunidades__carousel__item__text__title__item oportunidades__carousel__item__text__title__item--title">
          <span class="title">${ propertyTitle }</span>    
          <span class="comercializacion">${ propertyContactEmail }</span>
          <span class="date">${ propertyStartDate }</span>    
          <span class="area">${ propertyArea }</span>    
        </div>  
        <div class="oportunidades__carousel__item__text__title__item oportunidades__carousel__item__text__title__item--desc">
          <p class="name">${ propertyLocation }</p>    
          <p class="contact">${ 'Contacto para comercialización' }</p>                
          <p class="date">${ 'Inauguración' }</p>   
          <p class="area">${ 'Espacio M2' }</p>    
        </div>
      </div>

      <div class="oportunidades__carousel__item__text__desc">
        <div class="oportunidades__carousel__item__text__desc__item">
          <p>${ propertyDescription }</p>
        </div>
        <div class="oportunidades__carousel__item__text__desc__item">
            ${ tenantDivs }
        </div>
      </div>          
    </div>  
  `;

  item.innerHTML = cardContent;
  container.appendChild(item)
  return (container.outerHTML)
}

const customInterval = 10000;

const items = jsonDatasource.properties.map(property => {
  return ({
    template: PropertyCard(
      property.propertyId,
      property.propertyTitle,
      property.propertyLocation,
      property.propertyStartDate,
      property.propertyDescription,
      property.propertyContactName,
      property.propertyContactEmail,
      property.propertyImageUrl,
      property.propertyArea,
      property.propertyFeaturedTenants
      ),
      interval: customInterval
    }
  )    
})

var carouselObj = new ej.navigations.Carousel({
  items: items,
  partialVisible: true,
  autoPlay: true
});
carouselObj.appendTo("#carousel");





var tenantsCarouselObj = new ej.navigations.Carousel({
  items: items,
  partialVisible: true,
  autoPlay: true,
});
tenantsCarouselObj.appendTo("#tenants_carousel");


document.querySelectorAll('.oportunidades__carousel__div').
forEach(div => {

  div.addEventListener('click',(ev)=> {
    ev.stopPropagation();
    const propId = div.id;
    const propertyDetail = getPropertyDetailById(propId)

/*     console.log(propertyDetail);
 */    propertyDetailDialogService.renderDetail(propertyDetail);  
  })
})
/* 
propertyDetailDialogService.renderDetail()*/
function getPropertyDetailDialogContent() {
  
}