var acc = document.getElementsByClassName("accordion");
var i;


for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function(ev) {

    const element = ev.target;
    console.log(ev.target);


    if(! element.classList.contains('active')) {

      document.querySelectorAll('.accordion')
      .forEach( acc =>{
        var panel = acc.nextElementSibling;
        try {
          acc.classList.remove('active')
          panel.style.maxHeight = null

          
        } catch(e) {
          
        }
      });
    
    } else {
      console.log('is selected');

    }


    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}



// RESPONSIVE SEC01 CONTENTS

document.querySelector('.inver_select_list__selector')
  .addEventListener('click', (ev) => {
    ev.target.classList.toggle('selected');
    ev.target.nextElementSibling.classList.toggle('active');
  })
document.querySelectorAll('.resp-carousel-selector')
  .forEach(selector => selector.addEventListener('click',() => {
    document.querySelector('.inver_select_list__content').classList.toggle('active')
    document.querySelector('.inver_select_list__selector').classList.toggle('selected')

  }))
