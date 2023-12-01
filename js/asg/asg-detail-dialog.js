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
    
    content: ``,

    target: document.getElementById("container"),
    // Dialog width
    width: dialogWidth,
    height: dialogHeigth,
    visible: false
});
// Render initialized Dialog
dialog.appendTo('#dialog');

// Sample level code to handle the button click action
document.getElementById('targetButton').onclick = function() {
    // Call the show method to open the Dialog
    dialog.show();
}

// Sample level code to hide the Dialog when click the Dialog overlay
function onOverlayClick() {
    dialog.hide();
}

export async function renderDetailDialog( { imgUrl, title, date, description, category } ) {

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

    await dialog.show();

    setTimeout(()=> {
        document.querySelector('.detail__dialog__close > button').onclick = () => {
            dialog.hide();
        }
    }, 200)




}






/*
var carouselObj = new ej.navigations.Carousel({
                    interval: 2000,
                    items: [
                        { template: '<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/cardinal.png" alt="cardinal" style="height:100%;width:100%;" /><figcaption class="img-caption">Cardinal</figcaption></figure>' },
                        { template: '<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/hunei.png" alt="kingfisher" style="height:100%;width:100%;" /><figcaption class="img-caption">Kingfisher</figcaption></figure>' },
                        { template: '<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/costa-rica.png" alt="keel-billed-toucan" style="height:100%;width:100%;" /><figcaption class="img-caption">Keel-billed-toucan</figcaption></figure>' },
                        { template: '<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/kaohsiung.png" alt="yellow-warbler" style="height:100%;width:100%;" /><figcaption class="img-caption">Yellow-warbler</figcaption></figure>' },
                      { template: '<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/bee-eater.png" alt="bee-eater" style="height:100%;width:100%;" /><figcaption class="img-caption">Bee-eater</figcaption></figure>' }
                    ]
                  });
                  carouselObj.appendTo("#carousel");    



*/