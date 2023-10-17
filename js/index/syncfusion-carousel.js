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

var carouselObj = new ej.navigations.Carousel({
  items: [
    {
      template: PropertyCard(
        'PASEO Hipódromo',
        'Area Metropolitana, CDMX',
        'DICIEMBRE 2017',
        'Paseo Hipódromo es un centro comercial con un diseño acogedor, sobre una de las avenidas más transitadas en el área. Cuenta con Cinemex Platino, la perfecta opción de entretenimiento para toda la familia. Además, el lugar se distingue por sus diversas opciones gastronómicas. Por si fuera poco, es ideal para los amantes de las mascotas ya que cuenta también con Petco.',
        'CONTACTO para COMERCIALIZACIÓN',
        'comercial@Gminmobiliaria.com',
        'properties-carousel__item__img--1'
        ),
        interval: customInterval
      },
    {
      template: PropertyCard(
        'GRAN PLAZA CANCÚN',
        'Cancún, Quintana Roo',
        'OCTUBRE 2013',
        'En este centro comercial podrás encontrar una gran variedad de tiendas para toda la familia. Podrás disfrutar de una gran diversidad gastronómica y comprar todo lo que necesites. Es el lugar ideal para pasar un buen día en compañía de amigos, en un entorno tranquilo y ambiente familiar.',
        'CONTACTO para COMERCIALIZACIÓN',
        'comercial@Gminmobiliaria.com',
        'properties-carousel__item__img--2'
        ),
        interval: customInterval
    },
    {
      template: PropertyCard(
        'CIUDADELA URBAN VILLAGE',
        'Guadalajara, Jalisco',
        'DICIEMBRE 2014',
        'Este centro comercial es distinto los demás, ya que ofrece una amplia variedad de tiendas de calidad de todo tipo. Se encuentra en una zona estratégica de la ciudad. Cuenta con diversas áreas para recorrer en un ambiente fresco y natural tanto al aire libre como techadas.',
        'CONTACTO para COMERCIALIZACIÓN',
        'comercial@Gminmobiliaria.com',
        'properties-carousel__item__img--3'
        )
    },
    {
      template: PropertyCard(
        'URBAN VILLAGE GARZA SADA',
        'Monterrey, Nuevo León',
        'NOVIEMBRE 2017',
        'Centro comercial con una arquitectura sofisticada donde se puede ir de compras o ir a comer en alguno de sus restaurantes. Un lugar moderno donde se puede encontrar de todo, incluyendo tiendas de ropa, restaurantes, supermercado, cafeterías y área de juegos para niños. Tiene una terraza que hará que quieras disfrutar todo el día con amigos.',
        'CONTACTO para COMERCIALIZACIÓN',
        'comercial@Gminmobiliaria.com',
        'properties-carousel__item__img--4'
        )
    }
  ],
  partialVisible: true,
  autoPlay: true
});
carouselObj.appendTo("#carousel");




// properties-carousel__item__img--1