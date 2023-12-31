ej.base.enableRipple(true);

let dialogHeigth = '1200px'
let dialogWidth = '1200px';
if(window.innerWidth <= 1200) {
/*     console.log(window.innerWidth);
 */ dialogWidth = '90%'
    dialogHeigth = "1200px"
}

// Initialize Dialog component
var dialog = new ej.popups.Dialog({
    isModal:true,
    overlayClick: onOverlayClick,
    content: '',
    target: document.getElementById("container"),
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


class ActivitiesASGModal {

    async renderASGModal (content, callback) {
        dialog.content = content;
        dialog.height = '1000px';
        await dialog.show();
        callback();
    }
    async renderASGActivityModal(content) {
        dialog.content = content;
        
        await dialog.show();

        setTimeout(() => {    
            
            
    var elem = document.querySelector('.main-carousel');
    var flkty = new Flickity( elem, {
      cellAlign: 'left',
      contain: true
    });

    var flkty = new Flickity( '.main-carousel', {

    });
            
        document.querySelector('.detail__dialog__close')
        .addEventListener('click', (ev) => {
            dialog.hide();
        })

        }, 100);
        
    }

}

export const activitiesASGModal = new ActivitiesASGModal();