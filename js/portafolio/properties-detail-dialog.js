import { GenericTabsComponent } from "./generic-tab-component.js";
import { getPropertyDetailByKey } from "./xlsx-reader.js";

ej.base.enableRipple(true);

// Initialize Dialog component
var dialog = new ej.popups.Dialog({
  // Enables modal dialog
  isModal: true,
  // overlayClick event handler
  overlayClick: onOverlayClick,
  // Dialog content

  content: "",

  target: document.getElementById("dialog_container"),

  width: "1200px",
  height: "700px",

  visible: false,
});
// Render initialized Dialog
dialog.appendTo("#dialog");

// Sample level code to handle the button click action
document.getElementById("targetButton").onclick = function () {
  // Call the show method to open the Dialog
  dialog.show();
};

// Sample level code to hide the Dialog when click the Dialog overlay
function onOverlayClick() {
  dialog.hide();
}

export async function initializeDetailDialog(keyName) {
  const propertyDetail = await getPropertyDetailByKey(keyName);

  propertyDetail.forEach((promise) => {
    promise.then((propertyDetail) => {
      if (propertyDetail.id == keyName) {

        console.log(propertyDetail);
        const propertyTenants = getTenantsElements(propertyDetail.tenants).join('');
        console.log(propertyTenants)

        document.querySelector("#dialog_dialog-content").innerHTML = `
    <section class="detail">
    <img src="${ propertyDetail.heroImageUrl }" class="detail__hero__img">
    </img>

    <div class="detail__hero__info">
      <div class="detail__hero__info--blue">
        <img src="${ propertyDetail.logoImageUrl }">
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
          <p>${ propertyDetail.phoneNumber }</p>
        </div>
        <div>
          <b>Web</b>
          <a href="${ propertyDetail.webSite }" >${ propertyDetail.webSite }</a>
        </div>
        
      </div>
    </div>

    <div class="detail__hero__close">
    X
    </div>

    <div class="map__footer">
        <div class="map__footer__item">
          <span>${propertyDetail.startDate}</span>
          <p>INICIO DE OPERACIONES</p>
        </div>
        <div class="map__footer__item">
        <span>${ 
          getFormattedUsableArea(propertyDetail.rentableArea)}
        <small style="font-size: 16px;">m2</small></span>
        <p>AREA RENTABLE COMERCIAL</p>
        </div>
        <div class="map__footer__item map__footer__item--last">
          <span>${ propertyDetail.usedRate }</span>
          <p>PORCENTAJE DE USO</p>
        </div>
      </div>

    <div class="detail__about">
      <span>ACERCA DE ${ propertyDetail.name }</span>
      <p>${ propertyDetail.description }</p>
    </div>
    <div class="detail__tenant__icons">
      ${ propertyTenants }
    </div>

    <div class="detail__tab--selector">
      <ul>
        <li id="detail__tab--selector--1" class="detail__tab--selector selected">DIRECTORIO</li>
        <li class="detail__tab--selector--splitter">|</li>
        <li id="detail__tab--selector--2" class="detail__tab--selector">INDICADORES CLAVE</li>
        <li class="detail__tab--selector--splitter">|</li>
        <li id="detail__tab--selector--3" class="detail__tab--selector">MAPA</li>
      </ul>

    </div>

    <div class="detail__tab--contents">
    
      <div id="detail__tab--content--1" class="detail__tab--content">

      

      <img class="map" src="${ propertyDetail.directoryImageUrl }"></img>

        
      </div>

      
      <div id="detail__tab--content--2" class="detail__tab--content inactive">

        <div class="indicators__list">
          <div class="indicators__list__header">
            <span>DATOS</span>
          </div>

          <div class="indicators__list__item">
            <div>
              <p> ${ propertyDetail.totalSurface } </p>
              <small>Superficie Total</small>
            </div>
            <!--
            <div>
            <p> ${ "AQUI VA CONS"} </p>
            <small>Construcción</small>
            </div>
            -->
            <div>
              <p> ${ propertyDetail.rentableArea } </p>
              <small>Comercial</small>
            </div>
          </div>


          <div class="indicators__list__item--second">
            <div>
              <p> ${ propertyDetail.playground }</p>
              <small>Area de Juegos para Niños</small>
            </div>
            <div>
              <p> ${ propertyDetail.type }</p>
              <small>Tipo</small>
            </div>
          </div>


          <div class="indicators__list__item">
            
            <div>
              <p>${ propertyDetail.storesNumber }</p>
              <small>Tiendas</small>
            </div>
            <div>
              <p>${propertyDetail.parking }</p>
              <small>Estacionamiento</small>
            </div>
          </div>


        </div>

        <div class="indicators__list indicators__list--second">
          <div class="indicators__list__header">
            <span>INQUILINOS</span>
          </div>

          <div class="indicators__list__item">
            <div>
            <p>${'--ANCLAS--'}</p>
            <small>Anclas</small>
            </div>
            <div>
            <p>${'--ARRENDAMIENTOS--'}</p>
              <small>Arredamientos Importantes</small>
            </div>
          </div>


          <div class="indicators__list__item--second">
            <div>
            <p>${'--SUB ANCLAS--'}</p>
              <small>Sub Anclas</small>
            </div>
            <div>
            <p>${'--CINE--'}</p>
              <small>Complejo De Cine</small>
            </div>
          </div>

        </div>

      </div>

      <div id="detail__tab--content--3" class="detail__tab--content inactive">
      <iframe src="${propertyDetail.iFrameSrc}" width="1100" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>
    `;
        dialog.show();
        document
          .querySelector(".detail__hero__close")
          .addEventListener("click", () => {
            dialog.hide();
          });
        new GenericTabsComponent(
          ".detail__tab--selector",
          ".detail__tab--content"
        ).initialize();
      }
    });
  });
}

/* document.querySelector('.tenants_container')
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
      console.log(ev.target);
      await initializeDetailDialog(ev.target.lastElementChild.lastElementChild.innerHTML)

    })
  })

  })
 */

const getTenantsElements = (tenants) => {
  return tenants.map((tenant) => {

    const url = `https://planigrupo.blob.core.windows.net/planigrupo/assets/images/comer/oportunidades/logos/${tenant}.png`;
    return `<img class="detail__tenant__icons_item" src="${url}">`;
  });
};

export const renderContact = async (keyName) => {
  // const res = await fetch(`https://edcan-dev.github.io/planigrupo-edcan-dev/data/property_detail/${keyName}.json`);
  //const propertyDetail = await res.json();

  console.log(keyName);
  const propertyDetail = await getPropertyDetailByKey(keyName);

  const props = 
  propertyDetail.map(async (promise) => {

    let result;
    await promise 
      .then(async (property) => {
        result = property
      })

      return result;
  })
  props.forEach(async(propPromise) => {
    await propPromise.then(
      property => {
        if(property.id == keyName) {
          defineContactInfo(property)
          dialog.width = 900;
          dialog.height = 600;
          dialog.show();
        }
      }
    )
  })

  function defineContactInfo(propertyDetail) {

    document.querySelector("#dialog_dialog-content").innerHTML = `
  <div class="contacto__form__card">
  <div class="contacto__form__card__text">
  <!--        
  <span style="font-size: 30px !important;">${propertyDetail.email}
          </span>
          -->
          <span>Pregúntenos sobre oportunidades de arrendamiento
          </span>

          <p>
            <b>Dirección</b>
            <br>
              ${propertyDetail.address}
            </br>
            O bien, escribe sobre el tema de tu interés aquí:</p>
  
            <p>
              <b>
              Contacto:</b>
              <br>      
                ${propertyDetail.phoneNumber}
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
                  <select name="propiedad" id="propiedad">
                    <option selected value="${ keyName }">${ propertyDetail.name }</option>
                  </select>
              </div>

              <div class="contacto__form__card__form contacto__form__card__form--submit">
                <input type="submit" value="Enviar">
              </div>
            </div>

        </form></div>
  `;

  }
};




// Utils

function getFormattedUsableArea( usableArea ) {
  const arr = usableArea.toString().split('');
  arr.splice(2,0 , ',')
  return arr.join('');
}