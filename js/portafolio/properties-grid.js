const response = await fetch('../../data/portfolio.properties.json')
const jsonDatasource = await response.json();

class PropertiesGrid {
    #properties;
    constructor(properties) {
        this.#properties = properties;
    }

    get properties() {
        return this.#properties;
    }

    render( properties ) {
        
        const container = document.querySelector('.featured_properties__grid');
        container.innerHTML = '';

        properties.forEach(property => {

            const propertyElement = document.createElement('div');
            propertyElement.classList.add(['featured_properties__grid__item']);

            const keyName = this.#clearStateName(this.getKeyName(property.propertyTitle))

            propertyElement.style.backgroundImage = "url('" + property.propertyImageUrl + "')";
            
            propertyElement.innerHTML = `
                <div class="featured_properties__grid__item__text">
                    <span>${ property.propertyTitle }</span>
                    <p>${ property.propertyLocation }</p>
                    <div class="featured_properties__grid__item__contact">
                        <img src='https://planigrupo.blob.core.windows.net/planigrupo/assets/png-icons/email.png'>
                    </div>
                    <p class="inactive">${ keyName }</p>
                </div>
                `
            container.append(propertyElement);
        });    
    }

    init() {
        this.render(this.#properties)
        if(window.innerWidth <= 1000 ) this.renderMobileStateCounter()
    }

    /**
     * Render properties by state
     * @argument state
     */
    filterByState(state) {

        const filteredProperties = state !== 'all'
        ? this.#properties.filter(property => property.propertyState == state)
        : this.#properties

        this.render(filteredProperties)
    }
    /**
     * Render properties by state
     * @argument state
     */
    filterByStateFromMap(stateFromMap) {

        const clearedStateFromMap = this.#clearStateName(stateFromMap);

        const filteredProperties = clearedStateFromMap !== 'all'
        ? this.#properties.filter(property => property.propertyState == clearedStateFromMap)
        : this.#properties

        document.getElementById('state-selector').value = clearedStateFromMap

        this.render(filteredProperties)

        this.renderTenantContainer(filteredProperties);

        /* window.scrollTo({
            top: '920',
            behavior: 'smooth'
          }); */
    }

    #clearStateName( state ) {
        return state.replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u')
    }
    renderTenantContainer( filteredProperties ) {

        const tenantsContainer = document.querySelector('.tenants_container > ul');
        tenantsContainer.innerHTML = ''

        const headerLi = document.createElement('li')
        const pHeader = document.createElement('p');
        pHeader.innerHTML = 'Centros Comerciales';
        pHeader.classList.add('tenant__name')
        headerLi.appendChild(pHeader);
        tenantsContainer.appendChild(headerLi);

        filteredProperties.forEach(property => {

            const li = document.createElement('li');
            li.classList.add('tenant__name__item')
            const div = document.createElement('div');
            div.classList.add('tenant__name__item__text')

            const pItem =document.createElement('p')
            pItem.innerText = property.propertyTitle
            const smallItem =document.createElement('small')
            smallItem.innerHTML = property.propertyLocation;

            div.appendChild(pItem)
            div.appendChild(smallItem)

            
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('tenant__name__item__img')
            imgDiv.style.backgroundImage = "url('" + property.propertyImageUrl + "')";

            li.appendChild(div)
            li.appendChild(imgDiv)

            
            li.addEventListener('click',() => {
                window.scrollBy({top: 1000, behavior: 'smooth'})
            })
            tenantsContainer.appendChild(li)
            
        });

        const footerLi = document.createElement('li');
        footerLi.classList.add('tenant__container__footer')
        footerLi.innerHTML ='Más Información';
        const img = document.createElement('img')
        img.src = 'https://planigrupo.blob.core.windows.net/planigrupo/assets/svgs/carousel-icon.svg'
        footerLi.appendChild(img)

        footerLi.addEventListener('click',() => {
            window.scrollBy({top: 900, behavior: 'smooth'})
        })

        tenantsContainer.appendChild(footerLi)

    }
    getKeyName( name ) {
        return name.toLowerCase().split(' ').join('-');
    }
    renderMobileStateCounter() {
        console.log(this.#properties.length);
        document.querySelector('.properties__counter__props__value').innerHTML = this.#properties.length;

        let states = this.#properties.map(prop => prop.propertyState)
        let filteredStates = [...new Set(states)]

        document.querySelector('.properties__counter__states__value').innerHTML = filteredStates.length;
    }
}

/* 
class PropertiesGridItem {

    #propertyTitle;
    #propertyLocation;
    #propertyimageUrl;
    #propertyState;
    #propertyTenants;

    constructor( propertyTitle, propertyLocation, propertImageUrl, propertyState, propertyTenants) {
        this.#propertyTitle = propertyTitle;
        this.#propertyLocation = propertyLocation;
        this.#propertyimageUrl = propertImageUrl;
        this.#propertyState = propertyState;
        this.#propertyTenants = propertyTenants;
    }

    get propertyimageUrl() {
        return this.#propertyimageUrl
    }
    get propertyTitle() {
        return this.#propertyTitle
    }
    get propertyLocation() {
        return this.#propertyLocation
    }
} */

export const propertiesGrid = new PropertiesGrid(jsonDatasource.properties)
propertiesGrid.init();

document.getElementById('state-selector').addEventListener('change',(ev) => propertiesGrid.filterByState(ev.target.value))
