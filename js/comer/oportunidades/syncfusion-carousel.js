const response = await fetch('../../../data/oportunidades.carousel.properties.json')
const jsonDatasource = await response.json();

const PropertyCard = (
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
          <span class="comercializacion">Contacto para comercializacion</span>
          <span class="date">INAUGURACION</span>    
          <span class="area">ESPACIO M2</span>    
        </div>  
        <div class="oportunidades__carousel__item__text__title__item oportunidades__carousel__item__text__title__item--desc">
          <p class="name">${ propertyLocation }</p>    
          <p class="contact">${ propertyContactEmail }</p>                
          <p class="date">${ propertyStartDate }</p>   
          <p class="area">${ propertyArea }</p>    
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

const customInterval = 3000;

const items = jsonDatasource.properties.map(property => {
  return ({
    template: PropertyCard(
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
  autoPlay: true
});
tenantsCarouselObj.appendTo("#tenants_carousel");