import { actividades as activities} from "./actividades-grid.js";
let dialogHeigth = '900px'
let dialogWidth = '1000px';
if(window.innerWidth <= 1300) {
    console.log(window.innerWidth);
    dialogWidth = '90%'
    dialogHeigth = "600px"
}

ej.base.enableRipple(true);

// Initialize Dialog component
var dialog = new ej.popups.Dialog({
    isModal:true,
    overlayClick: onOverlayClick,

    content: `<section class="detail__dialog">
    
    <!--
    <div class="control-container">
      <div id="carousel"></div>
    </div>
    -->
    <div class="detail__dialog__img">
    <img src="${ 'imgUrl' }">
    </div>

    <div class="detail__dialog__title">
      <h5> ${ 'title' }</h5>
    </div>

    <div class="detail__dialog__date__category">

      <div>
        <i class="fa-regular fa-calendar-days" style="color: #000000;"></i>
        <span>${ 'date' }</span>
      </div>

      <div>
        <i class="fa-solid fa-folder" style="color: #000000;"></i>
        <span>${ 'category' }</span>
      </div>

    </div>
    
    <div class="detail__dialog__desc">
      <p>${ 'description' }</p>
    </div>

    <div class="detail__dialog__close">
      <button>Cerrar</button>
    </div>
  </section>`,

    target: document.getElementById("container"),
    // Dialog width
    width: dialogWidth,
    height: dialogHeigth,
    visible: false
});
// Render initialized Dialog
dialog.appendTo('#dialog');



// Sample level code to hide the Dialog when click the Dialog overlay
function onOverlayClick() {
    dialog.hide();
}

export function renderDetailDialog( { imgUrl, title, date, description, category } ) {

    dialog.content = `
    <section class="detail__dialog">
    
        <!--
        <div class="control-container">
          <div id="carousel"></div>
        </div>
        -->
        <div class="detail__dialog__img">
        <img src="${ imgUrl }">
        </div>

        <div class="detail__dialog__title">
          <h5> ${ title }</h5>
        </div>

        <div class="detail__dialog__date__category">

          <div>
            <i class="fa-regular fa-calendar-days" style="color: #000000;"></i>
            <span>${ date }</span>
          </div>

          <div>
            <i class="fa-solid fa-folder" style="color: #000000;"></i>
            <span>${ category }</span>
          </div>

        </div>
        
        <div class="detail__dialog__desc">
          <p>${ description }</p>
        </div>

        <div class="detail__dialog__close">
          <button>Cerrar</button>
        </div>
      </section>
    `;

    dialog.show();

    setTimeout(()=> {
        document.querySelector('.detail__dialog__close > button').onclick = () => {
            dialog.hide();
        }
    }, 100)




}