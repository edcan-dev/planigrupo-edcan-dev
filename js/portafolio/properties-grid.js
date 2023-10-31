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

            const propertyElement = document.createElement('a');
            propertyElement.href = 'https://google.com'
            propertyElement.classList.add(['featured_properties__grid__item']);

            propertyElement.style.backgroundImage = "url('" + property.propertyImageUrl + "')";
            
            propertyElement.innerHTML = `
                <div class="featured_properties__grid__item__text">
                    <span>${ property.propertyTitle }</span>
                    <p>${ property.propertyLocation }</p>
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

        window.scrollTo({
            top: '920',
            behavior: 'smooth'
          });
    }
    #clearStateName( state ) {
        return state.replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u')
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
