import { GenericTabsComponent } from './generic-tab-component.js'

ej.base.enableRipple(true);

// Initialize Dialog component
var dialog = new ej.popups.Dialog({
  // Enables modal dialog
  isModal: true,
  // overlayClick event handler
  overlayClick: onOverlayClick,
  // Dialog content
  
  content: `
  <section class="detail">
    <img src="https://planigrupo.blob.core.windows.net/planigrupo/assets/images/portafolio/Cncnfoto.png" class="detail__hero__img">
    </img>
    <div class="detail__hero__info">
      <div class="detail__hero__info--blue">
        <img src="https://planigrupo.com.mx/wp-content/uploads/2018/08/Logo-Cancun-Nuevo.png">
      </div>
      <div class="detail__hero__info--light--gray">
        <div>
          <b>Ubicación</b>
          <p>Ubicación</p>
        </div>
      </div>
      <div class="detail__hero__info--gray">
        <div>
          <b>Teléfono</b>
          <p>asdasd</p>
        </div>
        <div>
          <b>Web</b>
          <p>werwer</p>
        </div>
        
      </div>
    </div>
    <div class="detail__about">
      <span>ACERCA DE PROPERTY</span>
      <p>Es considerado como un centro comercial temático dado que su arquitectura y diseño asemeja un pueblo pequeño. Cuenta con jardínes y zonas de descanso que nuestros visitantes pueden aprovechar como zonas de paseo, es una plaza llena de vida gracias a la presencia de un centro universitario y sus prestigiosas marcas tanto de ropa como de restaurantes.</p>
    </div>
    <div class="detail__tenant__icons">
      <div class="detail__tenant__icons_item">img</div>
      <div class="detail__tenant__icons_item">img</div>
      <div class="detail__tenant__icons_item">img</div>
      <div class="detail__tenant__icons_item">img</div>
      <div class="detail__tenant__icons_item">img</div>
      <div class="detail__tenant__icons_item">img</div>
    </div>

    <div class="detail__tab--selector">
      <ul>
        <li id="detail__tab--selector--1" class="detail__tab--selector">MAPA DE PROPIEDAD</li>
        <li>|</li>
        <li id="detail__tab--selector--2" class="detail__tab--selector selected">INDICADORES CLAVE</li>
        <!--
        <li>|</li>
        <li id="detail__tab--selector--3" class="detail__tab--selector">CONTACTO</li>
        -->

      </ul>
    </div>

    <div class="detail__tab--contents">
    
      <div id="detail__tab--content--1" class="detail__tab--content inactive">

      <div class="map__footer">
        <div class="map__footer__item">
          <span>0000</span>
          <p>INICIO DE OPERACIONES</p>
        </div>
        <div class="map__footer__item">
          <span>0000</span>
          <p>AREA RENTABLE COMERCIAL</p>
        </div>
        <div class="map__footer__item map__footer__item--last">
          <span>0000</span>
          <p>ESPACIOS DE ESTACIONAMIENTO</p>
        </div>
      </div>

      <img class="map" src="https://planigrupo.com.mx/wp-content/uploads/2018/08/Directorio.png"></img>
      
        
      </div>

      
      <div id="detail__tab--content--2" class="detail__tab--content">

        <div class="indicators__list">
          <div class="indicators__list__header">
            <span>DATOS</span>
          </div>

          <div class="indicators__list__item">
            <div>
              <p>REPORTE</p>
              <small>Superficie Total</small>
            </div>
            <div>
              <p>REPORTE</p>
              <small>Construcción</small>
            </div>
            <div>
              <p>REPORTE</p>
              <small>Comercial</small>
            </div>
          </div>


          <div class="indicators__list__item--second">
            <div>
              <p>REPORTE</p>
              <small>Entretenimiento</small>
            </div>
            <div>
              <p>REPORTE</p>
              <small>Area de Juegos para Niños</small>
            </div>
            <div>
              <p>REPORTE</p>
              <small>Tipo</small>
            </div>
          </div>


          <div class="indicators__list__item">
            <div>
              <p>REPORTE</p>
              <small>Pads</small>
            </div>
            <div>
              <p>REPORTE</p>
              <small>Tiendas</small>
            </div>
            <div>
              <p>REPORTE</p>
              <small>Espacios de Estacionamiento</small>
            </div>
          </div>


        </div>

        <div class="indicators__list indicators__list--second">
          <div class="indicators__list__header">
            <span>INQUILINOS</span>
          </div>

          <div class="indicators__list__item">
            <div>
              <p>ANCLAS</p>
              <small>Anclas</small>
            </div>
            <div>
              <p>REPORTE</p>
              <small>Arredamientos Importantes</small>
            </div>
          </div>


          <div class="indicators__list__item--second">
            <div>
              <p>REPORTE</p>
              <small>Sub Anclas</small>
            </div>
            <div>
              <p>REPORTE</p>
              <small>Complejo De Cine</small>
            </div>
          </div>

        </div>

      </div>

      <div id="detail__tab--content--3" class="detail__tab--content inactive">
        
      </div>
    </div>
  </section>
  `,
//  content: '',

  target: document.getElementById("dialog_container"),
  
  width: '1200px',
  height: '700px',
  
  visible: false
});
// Render initialized Dialog
dialog.appendTo('#dialog');


// Sample level code to handle the button click action
document.getElementById('targetButton').onclick = function () {
  // Call the show method to open the Dialog
  dialog.show();
}

// Sample level code to hide the Dialog when click the Dialog overlay
function onOverlayClick() {
  dialog.hide();
}


/* 
var ele = document.getElementById('dialog_container');
if (ele) {
  ele.style.visibility = "visible";
} */


async function initializeDetailDialog(keyName) {
  console.log(keyName);

  const res = await fetch(`https://edcan-dev.github.io/planigrupo-edcan-dev/data/property_detail/${keyName}.json`)
  const propertyDetail = await res.json();

  const propertyTenants = getTenantsElements(propertyDetail.tenants)
  
  document.querySelector('#dialog_dialog-content').innerHTML =
    `
    <section class="detail">
    <img src="${ propertyDetail.hero_img_url }" class="detail__hero__img">
    </img>

    <div class="detail__hero__info">
      <div class="detail__hero__info--blue">
        <img src="${ propertyDetail.logo_img_url }">
      </div>
      <div class="detail__hero__info--light--gray">
        <div>
          <b>Ubicación</b>
          <p>${ propertyDetail.location }</p>
        </div>
      </div>
      <div class="detail__hero__info--gray">
        <div>
          <b>Teléfono</b>
          <p>${ propertyDetail.phone_number }</p>
        </div>
        <div>
          <b>Web</b>
          <a href="${ propertyDetail.website_url }" >${ propertyDetail.website_url }</a>
        </div>
        
      </div>
    </div>

    <div class="detail__hero__close">
    X
    </div>

    <div class="detail__about">
      <span>ACERCA DE ${ propertyDetail.name }</span>
      <p>${ propertyDetail.about }</p>
    </div>
    <div class="detail__tenant__icons">
      ${ propertyTenants }
    </div>

    <div class="detail__tab--selector">
      <ul>
        <li id="detail__tab--selector--1" class="detail__tab--selector selected">MAPA DE PROPIEDAD</li>
        <li>|</li>
        <li id="detail__tab--selector--2" class="detail__tab--selector">INDICADORES CLAVE</li>
      </ul>

    </div>

    <div class="detail__tab--contents">
    
      <div id="detail__tab--content--1" class="detail__tab--content">

      <div class="map__footer">
        <div class="map__footer__item">
          <span>${ propertyDetail.start_date }</span>
          <p>INICIO DE OPERACIONES</p>
        </div>
        <div class="map__footer__item">
        <span>${ propertyDetail.usable_area }</span>
        <p>AREA RENTABLE COMERCIAL</p>
        </div>
        <div class="map__footer__item map__footer__item--last">
          <span>${ propertyDetail.parking_spaces }</span>
          <p>ESPACIOS DE ESTACIONAMIENTO</p>
        </div>
      </div>

      <img class="map" src="${ propertyDetail.map_url }"></img>
      
        
      </div>

      
      <div id="detail__tab--content--2" class="detail__tab--content inactive">

        <div class="indicators__list">
          <div class="indicators__list__header">
            <span>DATOS</span>
          </div>

          <div class="indicators__list__item">
            <div>
              <p> ${ propertyDetail.key_indicators.data.total_surface } </p>
              <small>Superficie Total</small>
            </div>
            <div>
              <p> ${ propertyDetail.key_indicators.data.building_area } </p>
              <small>Construcción</small>
            </div>
            <div>
              <p> ${ propertyDetail.key_indicators.data.comercial } </p>
              <small>Comercial</small>
            </div>
          </div>


          <div class="indicators__list__item--second">
            <div>
              <p> ${ propertyDetail.key_indicators.data.pads }</p>
              <small>Entretenimiento</small>
            </div>
            <div>
              <p> ${ propertyDetail.key_indicators.data.chlidren_playground }</p>
              <small>Area de Juegos para Niños</small>
            </div>
            <div>
              <p> ${ propertyDetail.key_indicators.data.type }</p>
              <small>Tipo</small>
            </div>
          </div>


          <div class="indicators__list__item">
            <div>
              <p>${ propertyDetail.key_indicators.data.pads }</p>
              <small>Pads</small>
            </div>
            <div>
              <p>${ propertyDetail.key_indicators.data.stores }</p>
              <small>Tiendas</small>
            </div>
            <div>
              <p>${ propertyDetail.parking_spaces }</p>
              <small>Espacios de Estacionamiento</small>
            </div>
          </div>


        </div>

        <div class="indicators__list indicators__list--second">
          <div class="indicators__list__header">
            <span>INQUILINOS</span>
          </div>

          <div class="indicators__list__item">
            <div>
            <p>${ propertyDetail.key_indicators.tenants.anchors }</p>
            <small>Anclas</small>
            </div>
            <div>
            <p>${ propertyDetail.key_indicators.tenants.featured_tenants }</p>
              <small>Arredamientos Importantes</small>
            </div>
          </div>


          <div class="indicators__list__item--second">
            <div>
            <p>${ propertyDetail.key_indicators.tenants.sub_anchors }</p>
              <small>Sub Anclas</small>
            </div>
            <div>
            <p>${ propertyDetail.key_indicators.tenants.cinema }</p>
              <small>Complejo De Cine</small>
            </div>
          </div>

        </div>

      </div>

      <div id="detail__tab--content--3" class="detail__tab--content inactive">
        
      </div>
    </div>
  </section>
    `;
    dialog.show();
    document.querySelector('.detail__hero__close').addEventListener('click', () => {
      dialog.hide()
    })
  new GenericTabsComponent(
    '.detail__tab--selector',
    '.detail__tab--content'
  ).initialize();
}



document.querySelector('.tenants_container')
  .addEventListener('click', (ev) => {

    document.querySelectorAll('.featured_properties__grid__item')
  .forEach(item => {
    item.addEventListener('click', async(ev) => {
      console.log("clicked");
      await initializeDetailDialog(ev.target.lastElementChild.lastElementChild.innerHTML)
    })
  })

  document.querySelectorAll('.featured_properties__grid__item__contact')
  .forEach(ele => {

    ele.addEventListener('click',(ev)=> {
      ev.stopPropagation()
      console.log('clicked contacrt');
    })

  })

  })

  document.querySelector('#state-selector')
  .addEventListener('click', (ev) => {

    document.querySelectorAll('.featured_properties__grid__item')
  .forEach(item => {
    item.addEventListener('click', async(ev) => {

      await initializeDetailDialog(ev.target.lastElementChild.lastElementChild.innerHTML)

    })
  })

  })

  document.querySelectorAll('path')
    .forEach(path => {
      path.addEventListener('click', ()=> {
        console.log('asdasdasd');
        document.querySelectorAll('.featured_properties__grid__item')
        .forEach(item => {
          item.addEventListener('click', async (ev) => {
            await initializeDetailDialog(ev.target.lastElementChild.lastElementChild.innerHTML)
          })
        })        
      })
    })



const getTenantsElements = (tenants) => {

  const imgElements = tenants.map((tenant) => {
    return `
    <img class="detail__tenant__icons_item" src="${tenant.tenant_img_url}">
    `
  })
  return imgElements.join('')
}