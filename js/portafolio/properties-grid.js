import { initializeDetailDialog, renderContact } from './properties-detail-dialog.js'
const response = await fetch('https://edcan-dev.github.io/planigrupo-edcan-dev/data/portfolio.properties.json')
//const response = await fetch('./../../data/portfolio.properties.json')
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

            //const keyName = this.#clearStateName(this.getKeyName(property.propertyTitle))
            const keyName = property.propertyKeyName

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
            
                propertyElement.addEventListener('click',() => {
                    initializeDetailDialog(keyName)
                })

            container.append(propertyElement);
        });    
    }

    init() {
        if(window.innerWidth <= 1000 ) {
            console.dir('[MOBILE DETECTED]');
            this.renderMobileStateCounter()
            this.filterByState('all');
        }
        /* 
    this.render(this.#properties)
    */
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

        // this.render(filteredProperties)

        this.renderTenantContainer(filteredProperties);
        
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
            pItem.innerText = property.propertyTitle
            const keyNameText =document.createElement('small')
            keyNameText.innerHTML = property.propertyKeyName;
            keyNameText.style.display = 'none';

            div.appendChild(pItem)
            div.appendChild(smallItem)
            div.appendChild(keyNameText)

            
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('tenant__name__item__img')
            imgDiv.style.backgroundImage = "url('" + property.propertyImageUrl + "')";

            const contactDiv = document.createElement('div')
            contactDiv.classList.add('contact__div') 

            contactDiv.style.width = '40px';
            contactDiv.style.paddingTop = '10px'
            contactDiv.style.paddingLeft = '7px'
            contactDiv.style.backgroundColor = '#0096A9';
            contactDiv.style.borderRadius = '5px'
            contactDiv.style.marginLeft = '5px'
            
            const mail = document.createElement('li')
            mail.classList.add(['fa-solid'])
            mail.classList.add(['fa-envelope'])
            mail.style.color = '#fff'
            mail.style.fontSize = '20px'
            mail.style.margin = '0 auto'

            mail.addEventListener('click',(ev) => {
                ev.stopPropagation()
                renderContact(property.propertyKeyName)

            })


            contactDiv.appendChild(mail)


            li.appendChild(div)
            li.appendChild(imgDiv)
            li.appendChild(contactDiv)
            
            li.addEventListener('click',(ev) => {
                initializeDetailDialog(property.propertyKeyName)
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
            document.querySelector('.featured_properties').classList.remove('inactive')
        })

        tenantsContainer.appendChild(footerLi)

    }
    getKeyName( name ) {
        return name.toLowerCase().split(' ').join('-');
    }
    renderMobileStateCounter() {
        document.querySelector('.properties__counter__props__value').innerHTML = this.#properties.length;

        let states = this.#properties.map(prop => prop.propertyState)
        let filteredStates = [...new Set(states)]

        document.querySelector('.properties__counter__states__value').innerHTML = filteredStates.length;
    }

    filterByTenant(readProperties, tenant) {

        if(tenant == 'all') {
            this.render(this.#properties)
            return;
        }
        
        const propertiesIds = readProperties.map( p => p.id);

        console.log(propertiesIds);

        const propsByTenant = this.#properties.filter(
            prop => propertiesIds.includes(prop.propertyKeyName)
        )
        
        console.log(propsByTenant);

        this.render(propsByTenant)

    }
}


export const propertiesGrid = new PropertiesGrid(jsonDatasource.properties)
propertiesGrid.init();
try{
    document.getElementById('state-selector').addEventListener('change',(ev) => propertiesGrid.filterByState(ev.target.value))
} catch(e) { }

