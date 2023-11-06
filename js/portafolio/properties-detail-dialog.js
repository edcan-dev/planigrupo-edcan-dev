
        ej.base.enableRipple(true);

        // Initialize Dialog component
        var dialog = new ej.popups.Dialog({
            // Enables modal dialog
            isModal: true,
            // overlayClick event handler
            overlayClick: onOverlayClick,
            // Dialog content
            content: 'This is a modal dialog',
            // The Dialog shows within the target element
            target: document.getElementById("dialog_container"),
            // Dialog width
            width: '1200px',
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



        var ele = document.getElementById('dialog_container');
        if (ele) {
            ele.style.visibility = "visible";
        }



document.querySelectorAll('.featured_properties__grid__item')
    .forEach(item => {
        item.addEventListener('click',(ev) => {

            initializeDetailDialog(item.firstElementChild.lastElementChild.innerHTML)
            
        })
    })

document.querySelector('.tenants_container')
.addEventListener('click', (ev)=> {
    
    document.querySelectorAll('.featured_properties__grid__item')
    .forEach(item => {
        item.addEventListener('click',(ev) => {

            initializeDetailDialog(item.firstElementChild.lastElementChild.innerHTML)
            
        })
    })
    
})
document.querySelector('#state-selector')
.addEventListener('click', (ev)=> {
    
    document.querySelectorAll('.featured_properties__grid__item')
    .forEach(item => {
        item.addEventListener('click',(ev) => {

            initializeDetailDialog(item.firstElementChild.lastElementChild.innerHTML)
            
        })
    })
    
})

async function initializeDetailDialog(keyName) {
    console.log(keyName);  
    
    const res = await fetch(`./../../data/property_detail/${ keyName }.json`)

    const propertyDetailJSON = await res.json();

    console.log(propertyDetailJSON);
    dialog.show();

    document.querySelector('#dialog_dialog-content').innerHTML = ''

}