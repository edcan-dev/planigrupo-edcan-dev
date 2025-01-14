/* import  * as propertyDetailDialogService  from "../../services/PropertDetailDialogService.js";
import  { getPropertyDetailById }  from "../../portafolio/xlsx-reader.js"; */
//const response = await fetch('../data/oportunidades.carousel.properties.json')

const language = document.head.querySelector("[property~=language][content]").content;

const urlPrefix = window.location.href.includes('github')
? 'https://edcan-dev.github.io/planigrupo-edcan-dev/'
: '../../../'

const url  = language == 'english'
? urlPrefix + 'data/EN_oportunidades.carousel.properties.json'
: urlPrefix + 'data/oportunidades.carousel.properties.json';

console.log(url);

const response = await fetch(url)

console.log(language);


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

  if(
    propertyTitle == 'GRAN PLAZA CANCÚN'
  ) item.style.backgroundPositionY = 'bottom';
  
  if(
    propertyTitle == 'PLAZA BELLA MEXIQUENSE'
  ) item.style.backgroundPositionY = 'center';


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
          <span class="area">${ propertyArea } m2</span>    
        </div>  
        <div class="oportunidades__carousel__item__text__title__item oportunidades__carousel__item__text__title__item--desc">
          <p class="name">${ propertyLocation }</p>    
          <p class="contact">${ 
            language == 'english'
            ? 'Leasing Contact Mail'
            : 'Contacto para comercialización'
          
          }</p>                
          <p class="date">${ 
            language == 'english'
            ? 'Start of Operation'
            : 'Inauguración'
          }</p>   
          <p class="area">${
          
            language == 'english'
            ? 'Commercial Space'
            : 'Espacio comercial'
          }</p>    
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


if(localStorage.getItem('propertiesArray') != null) {

  import('../../services/PropertDetailDialogService.js')
  .then(m => {

    import("../../portafolio/xlsx-reader.js")
      .then(m2 => {
        
        document.querySelectorAll('.oportunidades__carousel__div').
        forEach(div => {
          div.addEventListener('click',(ev)=> {
            ev.stopPropagation();
            const propId = div.id;
            const propertyDetail = m2.getPropertyDetailById(propId)
            m.renderDetail(propertyDetail);  
          })
        })

      })

  })

}