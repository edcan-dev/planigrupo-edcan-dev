import { GenericTabsComponent } from "./generic-tab-component.js";
import { getPropertyDetailByKey, PropertyDetail } from "./xlsx-reader.js";

const language = document.head.querySelector("[property~=language][content]").content;

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

/* document.getElementById("targetButton").onclick = function () {
 dialog.show();
}; */

// Sample level code to hide the Dialog when click the Dialog overlay
function onOverlayClick() {
  dialog.hide();
}

export async function renderIndexDetail(propertyDetail) {
        const propertyTenants = getTenantsElements(propertyDetail.tenants).join('');

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
          <b>
          ${
            language != 'english'
            ? 'Ubicación'
            : 'Location' 
          }
          </b>
          <p>${ propertyDetail.location }</p>
        </div>
      </div>

      ${
        ( !propertyDetail.phoneNumber.includes('NA') &&!propertyDetail.phoneNumber.includes('error') ) &&
        ( !propertyDetail.webSite.includes('NA') && !propertyDetail.webSite.includes('error') )
        ? 
        `<div class="detail__hero__info--gray">
        <div>
          <b>
          ${
            language != 'english'
            ? 'Teléfono'
            : 'Phone Number' 
          }
          </b>
          <p>${ propertyDetail.phoneNumber }</p>
        </div>
        <div>
          <b>
          ${
            language != 'english'
            ? 'Sitio Web'
            : 'Website' 
          }
          </b>
          <a target="_BLANK" href="${ propertyDetail.webSite }" >
          ${

            propertyDetail.webSite.toLowerCase()

          }</a>
        </div>
        
      </div>`
        : 
        ''
      }


    </div>

    <div class="detail__hero__close">
    X
    </div>

    <div class="map__footer">
        <div class="map__footer__item">
          <span>${propertyDetail.startDate}</span>
          <p>
          ${
            language != 'english'
            ? 'INICIO DE OPERACIONES'
            : 'Start of Operation' 
          }
          </p>
        </div>
        <div class="map__footer__item">
        <span>${ 
          getFormattedUsableArea(propertyDetail.rentableArea)}
        <small style="font-size: 16px;">m2</small></span>
        <p>
        ${
          language != 'english'
          ? 'Area Rentable' 
          : 'Commercial Space'
        }
        </p>
        </div>
        <div class="map__footer__item map__footer__item--last">
          <span>${
            (propertyDetail.usedRate * 100) ==  100 ? (propertyDetail.usedRate * 100) + '%' : (propertyDetail.usedRate * 100).toPrecision(4) + '%'     
          }</span>
          <p>
          ${
            language != 'english'
            ? 'PORCENTAJE DE OCUPACIÓN' 
            : 'OCUPATION RATE'
          }
          </p>
        </div>
      </div>

    <div class="detail__about">
      <span>
      ${
        language != 'english'
        ? `ACERCA DE ${ propertyDetail.name }` 
        : `ABOUT ${ propertyDetail.name }`
      }
      </span>
      
      <p>
      ${
        language != 'english'
        ? propertyDetail.description 
        :  propertyDetail.englishDescription
      }</p>
    </div>
    <div class="detail__tenant__icons">
      ${ propertyTenants }
    </div>

    <div class="detail__tab--selector">
      <ul>
        <li id="detail__tab--selector--1" class="detail__tab--selector selected">
        ${
          language != 'english'
          ? 'DIRECTORIO'
          :  'DIRECTORY'
        }
        </li>
        <li class="detail__tab--selector--splitter">|</li>
        <li id="detail__tab--selector--2" class="detail__tab--selector">
        ${
          language != 'english'
          ? 'INDICADORES CLAVE'
          :  'KEY METRICS'
        }
        </li>
        <li class="detail__tab--selector--splitter">|</li>
        <li id="detail__tab--selector--3" class="detail__tab--selector">
        ${
          language != 'english'
          ? 'MAPA'
          :  'MAP'
        }
        </li>
      </ul>

    </div>

    <div class="detail__tab--contents">
    
      <div id="detail__tab--content--1" class="detail__tab--content">

      

      <img class="map" src="${ propertyDetail.directoryImageUrl }"></img>

        
      </div>

      
      <div id="detail__tab--content--2" class="detail__tab--content inactive">

        <div class="indicators__list">
          <div class="indicators__list__header">
            <span>
            ${
              language != 'english'
              ? 'DATOS'
              :  'DATA'
            }
            </span>
          </div>

          <div class="indicators__list__item">
            <div>
              <small>
              ${
                language != 'english'
                ? 'Superficie Total'
                :  'Total Surface Area'
              }
              </small>
              <p>
              ${ getFormattedUsableArea(propertyDetail.totalSurface) }
              </p>
            </div>
            <div>
              <small>
              ${
                language != 'english'
                ? 'Comercial'
                :  'Commercial'
              }
              </small>
              <p> ${ getFormattedUsableArea(propertyDetail.totalSurface) } </p>
              </p>
            </div>
          </div>


          <div class="indicators__list__item" style="background-color: #f5f3f1">
            <div>
            <small>
            ${
              language != 'english'
              ? 'Area de Juegos para Niños'
              :  'Kids Playground'
            }
            </small>
              <p>
              ${ 
                propertyDetail.playground.includes("S")
                ? language == 'english'
                  ? 'Yes'
                  : 'Sí'
                : propertyDetail.playground
              }
              </p>
            </div>
            <div>
              <small>
              ${
                language != 'english'
                ? 'Tipo'
                :  'Type'
              }
              </small>
              <p>
              ${ 
               language == 'english'
               ? 'Community Center'
               : propertyDetail.type
              }
              </p>
            </div>
          </div>


          <div class="indicators__list__item">
            
            <div>
              <small>
              ${
                language != 'english'
                ?  'Tiendas'
                : 'Shops'
              }
              </small>
              <p>${ propertyDetail.storesNumber }</p>
            </div>
            <div>
              <small>
              ${
                language != 'english'
                ?  'Estacionamientos'
                : 'Parking'
              }
              </small>
              <p>
              ${ 
                propertyDetail.parking.includes("S")
                ? language == 'english'
                  ? 'Yes'
                  : 'Sí'
                : propertyDetail.parking
              }
              </p>
            </div>
          </div>


        </div>

        <div class="indicators__list indicators__list--second">
          <div class="indicators__list__header">
            <span>
            ${
              language != 'english'
              ?  'INQUILINOS'
              : 'TENANTS'
            }
            </span>
          </div>

          <div class="indicators__list__item">
            <div>
            <small>
            ${
              language != 'english'
              ?  'Anclas'
              : 'Anchor Stores'
            }
            </small>
            <p>${
                getFormattedTentants( propertyDetail.anchors)
              
            }</p>
            </div>
            <div>
            <small>
            ${
              language != 'english'
              ? 'Arrendamientos Importantes'
              : 'Important Retailers'
            }
            </small>
            <p>${ getFormattedTentants(propertyDetail.tenants).join(', ')}</p>
            </div>
          </div>


          <div class="indicators__list__item" style="background-color: #f5f3f1">
            <div>
            <small>
            ${
              language != 'english'
              ? 'Sub Anclas'
              : 'Sub Anchors'
            }
            </small>
            <p>${
              getFormattedTentants(
                propertyDetail.subAnchors
              )
            /*   pickRandomElements(
              getFormattedTentants(propertyDetail.tenants), 5).join(', ')
             */}</p>
            </div>
            <div>
            <small>
            ${
              language != 'english'
              ? 'Complejo De Cine'
              : 'Cinema Complex'
            }
            </small>
            <p>
            ${ 
              propertyDetail.cinema.includes("S")
              ? language == 'english'
                ? 'Yes'
                : 'Sí'
              : propertyDetail.cinema
            }
            </p>
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
  dialog.content = content
  dialog.show()
}

export async function initializeDetailDialog(keyName) {
  const propertyDetail = await getPropertyDetailByKey(keyName);

  console.log(propertyDetail);

  propertyDetail.forEach((propertyDetail) => {
/*     promise.then((propertyDetail) => {
 */      if (propertyDetail.id == keyName) {

        console.log(propertyDetail);
        const propertyTenants = getTenantsElements(propertyDetail.tenants).join('');
        console.log(propertyTenants)

        renderIndexDetail(propertyDetail)

    //     document.querySelector("#dialog_dialog-content").innerHTML = `
    //     <section class="detail">
    //     <img src="${ propertyDetail.heroImageUrl }" class="detail__hero__img">
    //     </img>
    
    //     <div class="detail__hero__info">
    //       <div class="detail__hero__info--blue">
    //         <img src="${ propertyDetail.logoImageUrl }">
    //       </div>
    //       <div class="detail__hero__info--light--gray">
    //         <div>
    //           <b>Ubicación</b>
    //           <p>${ propertyDetail.location }</p>
    //         </div>
    //       </div>
          
    //   ${
    //     ( !propertyDetail.phoneNumber.includes('NA') &&!propertyDetail.phoneNumber.includes('error') ) &&
    //     ( !propertyDetail.webSite.includes('NA') && !propertyDetail.webSite.includes('error') )
    //     ? 
    //     `<div class="detail__hero__info--gray">
    //     <div>
    //       <b>Teléfono</b>
    //       <p>${ propertyDetail.phoneNumber }</p>
    //     </div>
    //     <div>
    //       <b>Web</b>
    //       <a target="_BLANK" href="${ propertyDetail.webSite }">
    //       ${
    //         getWebsite(propertyDetail.webSite)
    //       }</a>
    //     </div>
        
    //   </div>`
        
    //     : 
    //     ''
    //   }

    //       <!--
    //       <div class="detail__hero__info--gray">
    //         <div>
    //           <b>Teléfono</b>
    //           <p>${ propertyDetail.phoneNumber }</p>
    //         </div>
    //         <div>
    //           <b>Web</b>
    //           <a target="_BLANK" href="${ propertyDetail.webSite }" >${ propertyDetail.webSite }</a>
    //         </div>
            
    //       </div>
    //       -->
    //     </div>
    
    //     <div class="detail__hero__close">
    //     X
    //     </div>
    
    //     <div class="map__footer">
    //         <div class="map__footer__item">
    //           <span>${propertyDetail.startDate}</span>
    //           <p>INICIO DE OPERACIONES</p>
    //         </div>
    //         <div class="map__footer__item">
    //         <span>${ 
    //           getFormattedUsableArea(propertyDetail.rentableArea)}
    //         <small style="font-size: 16px;">m2</small></span>
    //         <p>AREA RENTABLE COMERCIAL</p>
    //         </div>
    //         <div class="map__footer__item map__footer__item--last">
    //           <span>${
    //             (propertyDetail.usedRate * 100) ==  100 ? (propertyDetail.usedRate * 100) + '%' : (propertyDetail.usedRate * 100).toPrecision(4) + '%'     
    //           }</span>
    //           <p>PORCENTAJE DE OCUPACIÓN</p>
    //         </div>
    //       </div>
    
    //     <div class="detail__about">
    //       <span>ACERCA DE ${ propertyDetail.name }</span>
    //       <p>${ propertyDetail.description }</p>
    //     </div>
    //     <div class="detail__tenant__icons">
    //       ${ propertyTenants }
    //     </div>
    
    //     <div class="detail__tab--selector">
    //       <ul>
    //         <li id="detail__tab--selector--1" class="detail__tab--selector selected">DIRECTORIO</li>
    //         <li class="detail__tab--selector--splitter">|</li>
    //         <li id="detail__tab--selector--2" class="detail__tab--selector">INDICADORES CLAVE</li>
    //         <li class="detail__tab--selector--splitter">|</li>
    //         <li id="detail__tab--selector--3" class="detail__tab--selector">MAPA</li>
    //       </ul>
    
    //     </div>
    
    //     <div class="detail__tab--contents">
        
    //       <div id="detail__tab--content--1" class="detail__tab--content">
    
          
    
    //       <img class="map" src="${ propertyDetail.directoryImageUrl }"></img>
    
            
    //       </div>
    
          
    //       <div id="detail__tab--content--2" class="detail__tab--content inactive">
    
    //         <div class="indicators__list">
    //           <div class="indicators__list__header">
    //             <span>DATOS</span>
    //           </div>
    
    //           <div class="indicators__list__item">
    //             <div>
    //               <small>Superficie Total</small>
    //               <p>
    //               ${ getFormattedUsableArea(propertyDetail.totalSurface) }
    //               </p>
    //             </div>
    //             <!--
    //             <div>
    //             <p> ${ "AQUI VA CONS"} </p>
    //             <small>Construcción</small>
    //             </div>
    //             -->
    //             <div>
    //               <small>Comercial</small>
    //               <p> ${ getFormattedUsableArea(propertyDetail.totalSurface) } </p>
    //               </p>
    //             </div>
    //           </div>
    
    
    //           <div class="indicators__list__item" style="background-color: #f5f3f1">
    //             <div>
    //             <small>Area de Juegos para Niños</small>
    //               <p> ${ propertyDetail.playground }</p>
    //             </div>
    //             <div>
    //               <small>Tipo</small>
    //               <p> ${ propertyDetail.type }</p>
    //             </div>
    //           </div>
    
    
    //           <div class="indicators__list__item">
                
    //             <div>
    //               <small>Tiendas</small>
    //               <p>${ propertyDetail.storesNumber }</p>
    //             </div>
    //             <div>
    //               <small>Estacionamiento</small>
    //               <p>${propertyDetail.parking }</p>
    //             </div>
    //           </div>
    
    
    //         </div>
    
    //         <div class="indicators__list indicators__list--second">
    //           <div class="indicators__list__header">
    //             <span>INQUILINOS</span>
    //           </div>
    
    //           <div class="indicators__list__item">
    //             <div>
    //             <small>Anclas</small>
    //             <p>${ getFormattedTentants( propertyDetail.anchors) }</p>
    //             </div>
    //             <div>
    //             <small>Arredamientos Importantes</small>
    //             <p>${ getFormattedTentants(propertyDetail.tenants).join(', ')}</p>
    //             </div>
    //           </div>
    
    
    //           <div class="indicators__list__item" style="background-color: #f5f3f1">
    //             <div>
    //             <small>Sub Anclas</small>
    //             <p>${
    //               getFormattedTentants(
    //                 propertyDetail.subAnchors
    //               )
    //             /*   pickRandomElements(
    //               getFormattedTentants(propertyDetail.tenants), 5).join(', ')
    //              */}</p>
    //             </div>
    //             <div>
    //             <small>Complejo De Cine</small>
    //             <p>${ propertyDetail.cinema }</p>
    //             </div>
    //           </div>
    
    //         </div>
    
    //       </div>
    
    //       <div id="detail__tab--content--3" class="detail__tab--content inactive">
    //       <iframe src="${propertyDetail.iFrameSrc}" width="1100" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    //       </div>
    //     </div>
    //   </section>
    // `;
        // dialog.show();
        // document
        //   .querySelector(".detail__hero__close")
        //   .addEventListener("click", () => {
        //     dialog.hide();
        //   });
        // new GenericTabsComponent(
        //   ".detail__tab--selector",
        //   ".detail__tab--content"
        // ).initialize();
      }
/*     });
 */  });
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

  console.log(keyName);
  const propertyDetail = await getPropertyDetailByKey(keyName);

  propertyDetail.forEach(async(property) => {
    if(property.id == keyName) {
      defineContactInfo(property)
      dialog.width = 900;
      dialog.height = 600;
      dialog.show();
    }
  })

  /**
   * 
   * @param { PropertyDetail } propertyDetail 
   */
  function defineContactInfo(propertyDetail) {

    const contactContent = language != 'english'
    ? `
    <div class="contacto__form__card contacto__form__card--dialog">

    <div class="contacto__form__card__text">
        <!--        
        <span style="font-size: 30px !important;">${propertyDetail.email}
                </span>
                -->
        <span>Pregúntanos sobre oportunidades de arrendamiento
        </span>

        <p class="first">
          <b>Dirección</b>
          <br>

          Av. Eugenio Garza Sada #3431
          Urban Village Garza Sada, P1, local SA012,
          Col. Arroyo Seco CP. 64740
          Monterrey, Nuevo León.
          </br>
          O bien, escribe sobre el tema de tu interés aquí:
        </p>

        <p>
          <b>
            Contacto:</b>
          <br>
          (+52 81) 8335-1631
          <br>
          O bien, escribe sobre el tema de tu interés aquí:
        </p>

        <div class="cfcSocial">

          <a href="https://twitter.com/planigrupo" target="_blank">
            <i class="fa-brands fa-x-twitter fa-lg" style="color: #0096a9;"></i>
          </a>

          <a href="https://www.facebook.com/gmexico.oficial" target="_blank">
            <i class="fa-brands fa-facebook fa-lg" style="color: #0096a9;"></i>
          </a>

          <a href="https://www.linkedin.com/company/grupo-mexico/" target="_blank">
            <i class="fa-brands fa-linkedin fa-xl" style="color: #0096a9;"></i>
          </a>

          <!-- <div class="socialIconTwitter">
                      <a href="https://twitter.com/planigrupo"></a>
                    </div>
                    <div class="socialIconFacebook">
                      <a href=""></a>
                    </div>
                    <div class="socialIconLinkdin">
                      <a href="https://www.linkedin.com/company/planigrupo"></a>
                    </div>
                   -->
        </div>
      </div>

      <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST"
        class="portfolioContactForm">
        <input type="hidden" name="oid" value="00Di0000000cSTi">

        <input type="hidden" name="retURL" value="https://thankful-meadow-071303510.4.azurestaticapps.net/portafolio.html">

        <div class="contacto__form__card__form">
          <div class="contacto__form__card__form__container contacto__form__card__form__container--nombre">
            <label for="nombre">*nombre</label>
            <!-- <input type="text" name="nombre" id="nombre">
                       -->
            <input id="first_name" type="text" tabindex="0" name="first_name" required>
          </div>

          <div class="contacto__form__card__form__container contacto__form__card__form__container--compania">
            <label for="compania">*compañía</label>
            <input id="company" type="text" tabindex="1" name="company" required>
          </div>
        </div>

        <div class="contacto__form__card__form">
          <div class="contacto__form__card__form__container contacto__form__card__form__container--apellido">
            <label for="apellido">*apellido</label>
            <input id="last_name" type="text" tabindex="0" name="last_name" required>
          </div>

          <div class="contacto__form__card__form__container contacto__form__card__form__container--email">
            <label for="telefono">*telefono</label>
            <input id="phone" type="tel"
              pattern="^(\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|(\+\d{2}\s?)?(\d{2}\s?)?\d{4}\s?\d{4})$" tabindex="3"
              name="phone" title="Debe tener 10 dígitos y parentesis." placeholder="1234512345" required>
          </div>
        </div>

        <div class="contacto__form__card__form contacto__form__card__form--portfolio">

          <div class="contacto__form__card__form--portfolio--email">
            <label for="email">*email</label>
            <input id="email" type="email" tabindex="2" name="email" required>
          </div>
          <!-- 
                    <div 
                    id="responsive_comments"
                    class="contacto__form__card__form--portfolio--email">
                      <label for="email">*comentarios</label>
                      <input type="email" name="telefono" id="email">
                    </div> -->

          <div class="contacto__form__card__form--portfolio--personalidad">
            <label for="personalidad-juridica">*personalidad juridica</label>
            <select id="00N5A00000HQFp4" name="00N5A00000HQFp4" tabindex="4" required>
              <option disabled selected value="">Personalidad Jurídica</option>
              <option value="Persona Física">Persona Física</option>
              <option value="Persona Moral">Persona Moral</option>
            </select>
          </div>

          <div class="contacto__form__card__form--portfolio--comentarios">
            <label for="comentarios">*comentarios</label>
            <textarea id="00Ni000000Dwzjf" tabindex="6" name="00Ni000000Dwzjf" cols="21" placeholder=""></textarea>
          </div>

        </div>

        <div class="contacto__form__card__form contacto__form__card__form--portfolio--propiedad">

          <div class="contacto__form__card__form--portfolio--personalidad">
            <label for="personalidad-juridica">*propiedad</label>

            <select id="00Ni000000Ekl2M" name="00Ni000000Ekl2M" tabindex="5" required="">
            
            <option selected value="${ keyName }">${ propertyDetail.name }</option>
            </select>

          </div>

          <div class="contacto__form__card__form contacto__form__card__form--submit">
            <input type="hidden" id="external" name="external" value="1" />
            <label for="">
              <b style="font-size: 30px; line-height: 10px; ">* </b>Campos obligatorios</label>
            <input type="submit" name="submit" value="Enviar" id="submitButton">
          </div>
        </div>
      </form>
    `
    : `
    <div class="contacto__form__card contacto__form__card--dialog">

    <div class="contacto__form__card__text">
    <!--        
    <span style="font-size: 30px !important;">${propertyDetail.email}
            </span>
            -->
            <span>Ask Us About Leasing Opportunities</span>
  
            <p class="first">
              <b>Address:</b>
              <br>

              Av. Eugenio Garza Sada #3431
Urban Village Garza Sada, P1, local SA012,
Col. Arroyo Seco CP. 64740
Monterrey, Nuevo León.
              </br></p>
    
              <p>
                <b>
                Contact:</b>
                <br>      
                (+52 81) 8335-1631
                <br>
              </p>
  
              <div class="cfcSocial">
                
                <a href="https://twitter.com/planigrupo" target="_blank">
                  <i class="fa-brands fa-x-twitter fa-lg" style="color: #0096a9;"></i>
                </a>

                <a href="https://www.facebook.com/gmexico.oficial" target="_blank">
                  <i class="fa-brands fa-facebook fa-lg" style="color: #0096a9;"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/grupo-mexico/"
                  target="_blank">
                  <i class="fa-brands fa-linkedin fa-xl" style="color: #0096a9;"></i>
                </a>

                <!-- <div class="socialIconTwitter">
                  <a href="https://twitter.com/planigrupo"></a>
                </div>
                <div class="socialIconFacebook">
                  <a href=""></a>
                </div>
                <div class="socialIconLinkdin">
                  <a href="https://www.linkedin.com/company/planigrupo"></a>
                </div>
               -->
              </div>
            </div>
    
            <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST" class="portfolioContactForm">
              <input type="hidden" name="oid" value="00Di0000000cSTi">

              <input type="hidden" name="retURL" value="https://thankful-meadow-071303510.4.azurestaticapps.net/portafolio.html">
              
              <div class="contacto__form__card__form">
                <div class="contacto__form__card__form__container contacto__form__card__form__container--nombre">
                  <label for="nombre">*name</label>
                  <!-- <input type="text" name="nombre" id="nombre">
                   -->
                  <input id="first_name" type="text" tabindex="0" name="first_name" required>
                </div>
  
                <div class="contacto__form__card__form__container contacto__form__card__form__container--compania">
                  <label for="compania">*company</label>
                  <input id="company" type="text" tabindex="1" name="company" required>
                </div>
              </div>
              
              <div class="contacto__form__card__form">
                <div class="contacto__form__card__form__container contacto__form__card__form__container--apellido">
                  <label for="apellido">*lastname</label>
                  <input id="last_name" type="text" tabindex="0" name="last_name" required>
                </div>
  
                <div class="contacto__form__card__form__container contacto__form__card__form__container--email">
                  <label for="telefono">*phone number</label>
                  <input id="phone" type="tel" 
                  
            pattern="^(\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|(\+\d{2}\s?)?(\d{2}\s?)?\d{4}\s?\d{4})$"                        
                  
                  tabindex="3" name="phone" title="Debe tener 10 dígitos y parentesis." placeholder="1234512345" required>
                </div>
              </div>
  
              <div class="contacto__form__card__form contacto__form__card__form--portfolio">
                
                <div class="contacto__form__card__form--portfolio--email">
                  <label for="email">*email</label>
                  <input id="email" type="email" tabindex="2" name="email" required>
                </div>
<!-- 
                <div 
                id="responsive_comments"
                class="contacto__form__card__form--portfolio--email">
                  <label for="email">*comentarios</label>
                  <input type="email" name="telefono" id="email">
                </div> -->
  
                <div class="contacto__form__card__form--portfolio--personalidad">
                  <label for="personalidad-juridica">*legal entity</label>
                  <select id="00N5A00000HQFp4" name="00N5A00000HQFp4" tabindex="4" required>
                    <option disabled selected value="">Legal Entity</option>
                    <option value="Persona Física">Natural Entity</option>
                    <option value="Persona Moral">Legal entity</option>
                  </select>
                </div>
  
                <div class="contacto__form__card__form--portfolio--comentarios">
                  <label for="comentarios">*comments</label>
                  <textarea id="00Ni000000Dwzjf" tabindex="6" name="00Ni000000Dwzjf" cols="21" placeholder=""></textarea>
                </div>
  
              </div>
  
              <div class="contacto__form__card__form contacto__form__card__form--portfolio--propiedad">
                
                <div class="contacto__form__card__form--portfolio--personalidad">
                  <label for="personalidad-juridica">*property</label>

                  <select id="00Ni000000Ekl2M" name="00Ni000000Ekl2M" tabindex="5" required="">
                    <option selected value="${ keyName }">
                      ${ propertyDetail.name }
                    </option>
                  </select>
                    
                </div>
  
                <div class="contacto__form__card__form contacto__form__card__form--submit">
                  <input type="hidden"  id="external" name="external" value="1" />
                  <label for="">
                    <b style="font-size: 30px; line-height: 10px; ">* </b>Indicates Required Field
                  </label>
                  <input type="submit" name="submit" value="Send" id="submitButton">
                </div>
              </div>
  
          </form>
    </div>
    
    `;
    
    document.querySelector("#dialog_dialog-content").innerHTML = contactContent;
  
  }
};




// Utils

function getFormattedUsableArea( usableArea ) {
  const arr = usableArea.toString().split('');
  arr.splice(-3,0,',')
  return arr.join('');
}

function getFormattedTentants(tenants) {
  return tenants.map(str => {

    try {
      str = str.toLowerCase();
      str = str.charAt(0).toUpperCase() + str.slice(1);
      return str.replaceAll('-',' ')
    } catch(e) {
      console.log(e);
      return '';
    }

  })
}
function pickRandomElements(arr, count) {
  const shuffledArray = arr.sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffledArray.slice(0, count); // Take the first 'count' elements
}

function getWebsite(webSite) {
  console.log(webSite);
  
  return webSite.includes('ERROR') ?
  'N/A'
  :
  webSite.toLowerCase().substring(0,40)

}