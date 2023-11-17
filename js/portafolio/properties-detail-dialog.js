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
  content: '',

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

export async function initializeDetailDialog(keyName) {

  console.log(keyName);

  //const res = await fetch(`https://edcan-dev.github.io/planigrupo-edcan-dev/data/property_detail/${keyName}.json`)
  const url =  `../../data/property_detail/${keyName}.json`
  const res = await fetch(url) 
  // fetch(`./../../data/property_detail/${keyName}.json`).then(data => res = data).catch()
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

    <div class="detail__about">
      <span>ACERCA DE ${ propertyDetail.name }</span>
      <p>${ propertyDetail.about }</p>
    </div>
    <div class="detail__tenant__icons">
      ${ propertyTenants }
    </div>

    <div class="detail__tab--selector">
      <ul>
        <li id="detail__tab--selector--1" class="detail__tab--selector selected">DIRECTORIO</li>
        <li>|</li>
        <li id="detail__tab--selector--2" class="detail__tab--selector">INDICADORES CLAVE</li>
        <li>|</li>
        <li id="detail__tab--selector--3" class="detail__tab--selector">MAPA</li>
      </ul>

    </div>

    <div class="detail__tab--contents">
    
      <div id="detail__tab--content--1" class="detail__tab--content">

      

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
      <iframe src="${ propertyDetail.i_frame_src }" width="1100" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
      console.log(ele.nextElementSibling);
      renderContact(ele.nextElementSibling.innerHTML)
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


const getTenantsElements = (tenants) => {

  const imgElements = tenants.map((tenant) => {
    return `
    <img class="detail__tenant__icons_item" src="${tenant.tenant_img_url}">
    `
  })
  return imgElements.join('')
}

export const renderContact = async (keyName) => {

  
  const res = await fetch(`https://edcan-dev.github.io/planigrupo-edcan-dev/data/property_detail/${keyName}.json`)
  const propertyDetail = await res.json();


  document.querySelector('#dialog_dialog-content').innerHTML = 
  `
  <div class="contacto__form__card">
  <div class="contacto__form__card__text">
  <!--        
  <span style="font-size: 30px !important;">${ propertyDetail.email }
          </span>
          -->
          <span>Pregúntenos sobre oportunidades de arrendamiento
          </span>

            <p>
            Direccion <br>
              <b>
              ${ propertyDetail.contact.address }
              </b>
              <br>
              O bien, escribe sobre el tema de tu interés aquí:</p>
            
            <p>
              Contacto:
              <br>      
              <b>
              ${ propertyDetail.contact.phone_numbers[0]}
              <br>
              ${ propertyDetail.contact.phone_numbers[1]}
              </b>
              <br>
              O bien, escribe sobre el tema de tu interés aquí:
            </p>

            <div class="cfcSocial">
              <div class="socialIconTwitter">
                <a href="https://twitter.com/planigrupo"></a>
              </div>
              <div class="socialIconFacebook">
                <a href=""></a>
              </div>
              <div class="socialIconLinkdin">
                <a href="https://www.linkedin.com/company/planigrupo"></a>
              </div>
            </div>
          </div>
  
          <form action="">
  
  
            <div class="contacto__form__card__form">
              <div class="contacto__form__card__form__container contacto__form__card__form__container--nombre">
                <label for="nombre">*nombre</label>
                <input type="text" name="nombre" id="nombre">
              </div>

              <div class="contacto__form__card__form__container contacto__form__card__form__container--compania">
                <label for="compania">*compañía</label>
                <input type="text" name="compania" id="compania">
              </div>
            </div>
            
            <div class="contacto__form__card__form">
              <div class="contacto__form__card__form__container contacto__form__card__form__container--apellido">
                <label for="apellido">*apellido</label>
                <input type="text" name="apellido" id="apellido">
              </div>

              <div class="contacto__form__card__form__container contacto__form__card__form__container--email">
                <label for="telefono">*telefono</label>
                <input type="text" name="telefono" id="telefono">
              </div>
            </div>

            <div class="contacto__form__card__form contacto__form__card__form--portfolio">
              
              <div class="contacto__form__card__form--portfolio--email">
                <label for="email">*email</label>
                <input type="email" name="telefono" id="email">
              </div>

              <div class="contacto__form__card__form--portfolio--personalidad">
                <label for="personalidad-juridica">*personalidad juridica</label>
<!--                 <input type="personalidad-juridica" name="telpersonalidad-juridica" id="personalidad-juridica">
 -->                <select name="persona" id="persona">
                  <option value="">Persona Fisica</option>
                  <option value="">Persona Moral</option>
                </select>
              </div>

              <div class="contacto__form__card__form--portfolio--comentarios">
                <label for="comentarios">*comentarios</label>
                <input type="comentarios" name="telcomentarios" id="comentarios">
              </div>

            </div>

            <div class="contacto__form__card__form contacto__form__card__form--portfolio--propiedad">
              
              <div class="contacto__form__card__form--portfolio--personalidad">
                <label for="personalidad-juridica">*propiedad</label>
                  <select name="persona" id="persona">
                      <option disabled="" selected="" value="">Propiedad</option>
                      <option value="P119">Cancun Gran Plaza</option>
                      <option value="P130">Centro Comercial Lopez Mateos</option>
                      <option value="P131">Ciudadela UV</option>
                      <option value="P101">El Paseo Santa Catarina</option>
                      <option value="P109">La Nogalera</option>
                      <option value="P134">Lago Real Centro Comercial</option>
                      <option value="P133">Macroplaza Del Valle</option>
                      <option value="2102">Macroplaza Estadio</option>
                      <option value="P121">Macroplaza Insurgentes</option>
                      <option value="P126">Macroplaza Oaxaca</option>
                      <option value="P129">Macroplaza San Luis</option>
                      <option value="P107">Mall Plaza Lincoln</option>
                      <option value="P118">Palmira Plaza Comercial</option>
                      <option value="P122">Paseo Alcalde</option>
                      <option value="P123">Paseo Hipodromo</option>
                      <option value="P103">Paseo Puebla</option>
                      <option value="P135">Paseo Reforma</option>
                      <option value="P138">Paseo San Juan</option>
                      <option value="P110">Paseo Solidaridad</option>
                      <option value="P106">Plaza Bella Anáhuac</option>
                      <option value="P102">Plaza Bella Frontera</option>
                      <option value="P105">Plaza Bella Huinala</option>
                      <option value="P115">Plaza Bella Mexiquense</option>
                      <option value="P111">Plaza Bella Ramos Arizpe</option>
                      <option value="P113">Plaza Monumental</option>
                      <option value="P112">Plaza Real Reynosa</option>
                      <option value="P108">Plaza Real Saltillo</option>
                      <option value="P117">Plaza Universidad</option>
                      <option value="P132">Puerta de Hierro</option>
                      <option value="P140">Punto Oriente</option>
                      <option value="P139">Punto San Isidro</option>
                      <option value="P136">Reynosa II</option>
                      <option value="P114">Super Plaza las Haciendas</option>
                      <option value="P125">Urban Village Garza Sada</option>
                      <option value="P127">Walmart Ensenada</option>
                      <option value="P128">Walmart San Jose del Cabo</option>					
                    </select>
              </div>

              <div class="contacto__form__card__form contacto__form__card__form--submit">
                <input type="submit" value="Enviar">
              </div>
            </div>

        </form></div>
  `
  dialog.width = 900;
  dialog.height = 600;
  dialog.show();

}