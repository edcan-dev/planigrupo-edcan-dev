import jsonDatasource from '../../data/portfolio.properties.json' assert {type: 'json'};

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
                    <p class="inactive">${ keyName }</p>
                </div>
                `
            container.append(propertyElement);
        });    
    }

    init() {
        this.render(this.#properties)
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

        filteredProperties.forEach(property => {

            const li = document.createElement('li');

            const namePElement = document.createElement('p');
            namePElement.innerHTML = property.propertyTitle
            namePElement.classList.add('tenant__name')
            const locationPElement = document.createElement('p');
            locationPElement.innerHTML = property.propertyLocation
            li.appendChild(namePElement);
            li.appendChild(locationPElement);
            li.addEventListener('click',() => {
                window.scrollBy({top: 1000, behavior: 'smooth'})
            })
            
            tenantsContainer.appendChild(li)
            
        });
    }

    getKeyName( name ) {
        return name.toLowerCase().split(' ').join('-');
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
