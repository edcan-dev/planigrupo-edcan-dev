const response = await fetch('../../data/index.carousel.properties.json')
const jsonDatasource = response.json();
const PropertyCard = (
  propertyTitle,
  propertyLocation,
  propertyStartDate,
  propertyDescription,
  propertyContactName,
  propertyContactEmail,
  propertyImageClass
) => {
  return (
    `
      <div class="properties-carousel__item">
      <div class="properties-carousel__item__text">
        <div>
          <div class="properties-carousel__item__text__title">
            <span>
              ${propertyTitle}
            </span>
          </div>
          <div class="properties-carousel__item__text__location-date">
            <span>
              ${propertyLocation}
            </span>
            <span>
              ${propertyStartDate}
            </span>
          </div>
        <div class="properties-carousel__item__text__desc">
          <p>
            ${propertyDescription}
          </p>
        </div>
      </div>

      <div class="properties-carousel__item__text__contact">
        <span>${propertyContactName}</span>
        <span>${propertyContactEmail}</span>
      </div>
    </div>
    <div class="properties-carousel__item__img ${propertyImageClass}"></div>
    </div>
            `
  )
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
      property.propertyImageClass
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